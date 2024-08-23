
<template>
  <div>
      <img src="./assets/bot.png" class="logo vue" alt="bot " />
   
    <p>10 autobot is added after every 1 minute</p>
    <h1>Total Autobot : {{ autobotCount }}</h1>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const  autobotUrl = import.meta.env.VITE_BASE_URL
const autobotCount = ref(0)

const fetchAutobotCount = async () => {
  try {
    
    const response = await fetch(autobotUrl);
    // Check if the response is okay (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    autobotCount.value = data.count;
  } catch (error) {
    console.error('Error fetching autobot count:', error);
  }
};

let intervalId: NodeJS.Timeout

onMounted(() => {
  
  fetchAutobotCount() // Initial fetch
  
  intervalId = setInterval(fetchAutobotCount, 60000) // Fetch every 1 minute (60000 ms)
  
})

onUnmounted(() => {
  clearInterval(intervalId) // Clear the interval when the component is destroyed
})

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
