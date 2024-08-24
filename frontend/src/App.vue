<template>
  <div>
    <img src="./assets/bot.png" class="logo vue" alt="bot" />
    <p>10 autobot is added after every 1 minute</p>
    <h1>Total Autobot: {{ autobotCount }}</h1>
    <div class="button-container">
      <button class="btn btn-green" @click="startCreation">Start Creation</button>
      <button class="btn btn-red" @click="resetDb">Reset Database</button>
      <button class="btn btn-yellow" @click="stopCreation">Stop Creation</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {useToast} from 'vue-toastification'
const toast = useToast()
const autobotUrl = import.meta.env.VITE_BASE_URL;
const autobotCount = ref(0);

const fetchAutobotCount = async () => {
  try {
    const response = await fetch(`${autobotUrl}/api/autobot-count`);
    if (!response.ok) {
      if (response.status === 429) {
        toast.info('Too many requests, please try again after 1 minute');
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    autobotCount.value = data.count;
  } catch (error) {
    console.error('Error fetching autobot count:', error);
    toast.error('Error fetching autobot count');
  }
};

const startCreation = async () => {
  try {
    const response = await fetch(`${autobotUrl}/api/start-autobot-generation`);
    if (!response.ok) {
      if (response.status === 429) {
        toast.info('Too many requests, please try again after 1 minute');
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    toast.success('Autobot creation started!');
  } catch (error) {
    console.error('Error starting autobot creation:', error);
    toast.error('Failed to start autobot creation');
  }
};

const stopCreation = async () => {
  try {
    const response = await fetch(`${autobotUrl}/api/stop-autobot-generation`);
    if (!response.ok) {
      if (response.status === 429) {
        toast.info('Too many requests, please try again after 1 minute');
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    clearInterval(intervalId); 
    toast.info('Autobot creation stopped');
  } catch (error) {
    console.error('Error stopping autobot creation:', error);
    toast.error('Failed to stop autobot creation');
  }
};

const resetDb = async () => {
  try {
    const response = await fetch(`${autobotUrl}/api/reset-database`);
    if (!response.ok) {
      if (response.status === 429) {
        toast.info('Too many requests, please try again after 1 minute');
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    fetchAutobotCount();
    toast.success('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
    toast.error('Failed to reset database');
  }
};

let intervalId: NodeJS.Timeout;

onMounted(() => {
  fetchAutobotCount(); // Initial fetch
  intervalId = setInterval(fetchAutobotCount, 60000); // Fetch every 1 minute (60000 ms)
});

onUnmounted(() => {
  clearInterval(intervalId); // Clear the interval when the component is destroyed
});
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

.button-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-green {
  background-color: #38a169; /* Green */
}

.btn-green:hover {
  background-color: #2f855a; /* Darker green on hover */
}

.btn-red {
  background-color: #e53e3e; /* Red */
}

.btn-red:hover {
  background-color: #c53030; /* Darker red on hover */
}

.btn-yellow {
  background-color: #d69e2e; /* Yellow */
}

.btn-yellow:hover {
  background-color: #b7791f; /* Darker yellow on hover */
}
</style>
