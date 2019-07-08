export const dashCaseToCamelCase = (s: string) => s.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
export const capitalize = (s: string) => s.slice(0, 1).toUpperCase() + s.slice(1);
