export const RATE_LIMIT_WINDOW = 60000;
export const MAX_REQUESTS_PER_WINDOW = 30;

const requestCounts = new Map<string, { count: number; timestamp: number }>();

export function rateLimitCheck(userId: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(userId);

  if (!userRequests || (now - userRequests.timestamp) > RATE_LIMIT_WINDOW) {
    requestCounts.set(userId, { count: 1, timestamp: now });
    return true;
  }

  if (userRequests.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  userRequests.count++;
  return true;
}
