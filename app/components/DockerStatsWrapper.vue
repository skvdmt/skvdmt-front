<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const config = useRuntimeConfig();
const [stat, home] = await Promise.all([
  useFetch(() => `${config.public.apiBase}/text/stat`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/home`, {
    timeout: config.public.timeout,
  }),
]);
if (stat.error.value || home.error.value) {
  throw new Error("Error loading data from the server.");
}

const statText = stat.data.value?.text;
const homeText = home.data.value?.text;

let es = null;
const streamError = ref(null);
const isLoaded = ref(false);
const stats = ref(new Map([]));

onMounted(() => {
  es = new EventSource("https://skvdmt.ru/api/docker/v1/stats");

  es.onopen = () => {
    streamError.value = null;
    stats.value.clear();
    isLoaded.value = true;
  };

  es.onmessage = (e) => {
    let d;
    try {
      d = JSON.parse(e.data);
    } catch (err) {
      console.error("docker stats error json parsing from sse:", err, e.data);
      return;
    }

    if (!d || typeof d !== "object") return;

    // Удаление контейнера из списка.
    if (Object.hasOwn(d, "remove")) {
      stats.value.delete(d.remove);
      return;
    }

    const ex = stats.value.get(d.name);
    if (ex) {
      // Изменение отдельных свойств контейнера.
      Object.assign(ex, d);
    } else {
      // Добавление контейнера в список.
      stats.value.set(d.name, {
        container_id: d.container_id,
        name: d.name,
        cpu_percent: d.cpu_percent,
        mem_usage: d.mem_usage,
        mem_limit: d.mem_limit,
        mem_percent: d.mem_percent,
        net_rx: d.net_rx,
        net_tx: d.net_tx,
        block_read: d.block_read,
        block_write: d.block_write,
        pids: d.pids,
      });
    }
  };

  es.onerror = () => {
    if (es.readyState === EventSource.CONNECTING) {
      streamError.value = "Connection lost, reconnecting...";
    } else if (es.readyState == EventSource.CLOSED) {
      streamError.value = "Connection server closed.";
    }
  };
});

onUnmounted(() => {
  if (es) {
    es.close();
    es = null;
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <h2>{{ statText }}</h2>
      <div class="terminal">
        <div class="title">{{ homeText }}</div>
        <div class="body">
          <div v-if="streamError != null">{{ streamError }}</div>
          <div v-else-if="!isLoaded">
            Loading containers list from server...
          </div>
          <div class="stats" v-if="streamError == null && isLoaded">
            <div class="row titles">
              <div class="col container-id">CONTAINER ID</div>
              <div class="col container-name">NAME</div>
              <div class="col cpu-percent">CPU %</div>
              <div class="col mem-usage">MEM USAGE / LIMIT</div>
              <div class="col mem-percent">MEM %</div>
              <div class="col net">NET I/O</div>
              <div class="col block">BLOCK I/O</div>
              <div class="col pids">PIDS</div>
            </div>
            <div class="row" v-for="[name, stat] in stats" :key="name">
              <div class="col container-id">{{ stat.container_id }}</div>
              <div class="col container-name" :title="stat.name">
                {{ stat.name }}
              </div>
              <div class="col cpu-percent">{{ stat.cpu_percent }}</div>
              <div class="col mem-usage">
                {{ stat.mem_usage }} / {{ stat.mem_limit }}
              </div>
              <div class="col mem-percent">{{ stat.mem_percent }}</div>
              <div class="col net">{{ stat.net_rx }} / {{ stat.net_tx }}</div>
              <div class="col block">
                {{ stat.block_read }} / {{ stat.block_write }}
              </div>
              <div class="col pids">{{ stat.pids }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 5rem 0 3rem;
  @media (max-width: 600px) {
    padding: 0 0 3rem;
  }
  h2 {
    text-align: center;
    min-height: 4.8rem;
    margin: 0 0 3rem;
  }
  .terminal {
    font-family: "Ubuntu Mono";
    font-size: 1.6rem;
    color: white;
    .title {
      border-radius: 1rem 1rem 0 0;
      background: #2c2c2c;
      padding: 1.5rem;
    }
    .body {
      border-radius: 0 0 1rem 1rem;
      background-color: #300a24;
      height: 400px;
      padding: 1.5rem;
      overflow: auto;
      scrollbar-width: thin;
      scrollbar-color: #6b4d61 #300a24;
      .stats {
        display: table;
        .row {
          font-size: 0;
          display: table-row;
          .col {
            white-space: nowrap;
            font-variant-numeric: tabular-nums;
            font-size: 1.8rem;
            display: table-cell;
            padding: 0 1.4rem;
          }
          .col:first-child {
            padding-left: 0;
          }
          .col:last-child {
            padding-right: 0;
          }
          .container-id {
            min-width: calc(12ch + 1.4rem);
          }
          .container-name {
            width: 20rem;
            max-width: 20rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .cpu-percent {
            min-width: calc(8ch + 2.8rem);
          }
          .mem-usage {
            min-width: calc(17ch + 2.8rem);
          }
          .mem-percent {
            min-width: calc(6ch + 2.8rem);
          }
          .net {
            min-width: calc(15ch + 2.8rem);
          }
          .block {
            min-width: calc(15ch + 2.8rem);
          }
          .pids {
            min-width: calc(5ch + 1.4rem);
          }
        }
      }
    }
  }
}
</style>
