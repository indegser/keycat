export const dashCaseToCamelCase = (s: string) => s.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
