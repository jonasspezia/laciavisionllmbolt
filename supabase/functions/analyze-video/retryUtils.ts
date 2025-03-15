export const MAX_RETRIES = 3;
export const INITIAL_RETRY_DELAY = 1000;
export const MAX_RETRY_DELAY = 8000;

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries === 0 || error.message.includes('PERMISSION_DENIED')) {
      throw error;
    }

    console.log(`[analyze-video] Retry attempt ${MAX_RETRIES - retries + 1} after ${delay}ms delay`);
    await sleep(delay);

    return retryWithExponentialBackoff(
      operation,
      retries - 1,
      Math.min(delay * 2, MAX_RETRY_DELAY)
    );
  }
}
