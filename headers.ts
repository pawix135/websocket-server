export function parseHeaders(splitedHeaders: string[]) {
  const preparedHeaders: Record<string, string> = {};

  for (const line of splitedHeaders) {
    const [key, value] = line.split(": ");
    preparedHeaders[key] = value
  }

  return new Headers(preparedHeaders);
}