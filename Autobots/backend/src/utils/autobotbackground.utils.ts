import { AutobotService } from '../service/Autobot.service';

export function startBackgroundProcess(): void {
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
      clearInterval(intervalId);
    }
  };

  const intervalId = setInterval(generateBatch, interval);

  // Start the first batch immediately, this only runs once the app is started 
  generateBatch();
}