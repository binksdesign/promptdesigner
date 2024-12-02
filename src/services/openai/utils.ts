const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // 1 second

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = MAX_RETRIES,
  initialDelay: number = INITIAL_DELAY
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      if (error.status !== 429) {
        throw error;
      }
      
      if (i === maxRetries - 1) {
        break;
      }
      
      const delayTime = initialDelay * Math.pow(2, i);
      console.log(`Retrying after ${delayTime}ms...`);
      await delay(delayTime);
    }
  }
  
  throw lastError!;
}