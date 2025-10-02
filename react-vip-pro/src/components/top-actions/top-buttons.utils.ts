export const buttonHandlers = new Map<string, () => Promise<void> | void>();

export const registerButtonHandler = (
  id: string,
  handler: () => Promise<void> | void
) => buttonHandlers.set(id, handler);
export const unregisterButtonHandler = (id: string) =>
  buttonHandlers.delete(id);

export function resolve<T>(value: T | (() => T)): T {
  return typeof value === "function" ? (value as () => T)() : value;
}
