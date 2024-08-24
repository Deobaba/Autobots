import { AutobotService } from '../service/Autobot.service';

let intervalId: NodeJS.Timeout | null = null;

export function startBackgroundProcess(): NodeJS.Timeout {
  const totalAutobots = 500;
  const totalMinutes = 60;
  const batchSize = 10;
  const interval = (totalMinutes * 60 * 1000) / (totalAutobots / batchSize);
  let generatedAutobots = 0;

  const generateBatch = async () => {
    if (generatedAutobots < totalAutobots) {
      try {
        await AutobotService.getInstance().generateAutobotBatch(batchSize);
        generatedAutobots += batchSize;
        console.log(`Total autobots generated: ${generatedAutobots}`);
      } catch (error) {
        console.error('Error generating autobot batch:', error);
      }
    } else {
      console.log('Finished generating 500 autobots.');
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  };

  intervalId = setInterval(generateBatch, interval);

  // Start the first batch immediately, this only runs once the app is started
  generateBatch();

  return intervalId;
}

export function stopBackgroundProcess(): void {
  if (intervalId) {
    clearInterval(intervalId);
    console.log('Autobot generation stopped.');
    intervalId = null;
  } else {
    console.log('No active autobot generation to stop.');
  }
}
