// Utility functions for table component

export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, prop: string) => {
    if (current && typeof current === 'object' && prop in current) {
      return (current as Record<string, unknown>)[prop];
    }
    return undefined;
  }, obj);
}

export function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  const lastKey = keys.pop();
  if (!lastKey) return;
  const target = keys.reduce((current, key) => {
    return (current as Record<string, unknown>)[key] as Record<string, unknown>;
  }, obj);
  target[lastKey] = value;
}

export function truncateText(text: string, length: number): string {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}
