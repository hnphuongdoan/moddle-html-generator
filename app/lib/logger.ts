export function logEvent(event: string, details?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${event}`, details || "");
}
