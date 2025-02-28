const DEBUG = process.env.NODE_ENV === 'development';

export function debug(message: string, ...args: any[]) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, ...args);
  }
}

export function debugError(message: string, error: unknown) {
  if (DEBUG) {
    console.error(`[ERROR] ${message}`, error);
  }
}

export function debugTime(label: string) {
  if (DEBUG) {
    console.time(`[TIMER] ${label}`);
    return () => console.timeEnd(`[TIMER] ${label}`);
  }
  return () => {};
} 