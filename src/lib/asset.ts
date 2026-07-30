// Resolves public/ asset paths for both root hosting and GitHub Pages subpath hosting.
export const A = (p: string): string =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + p.replace(/^\//, '')
