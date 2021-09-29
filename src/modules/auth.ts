export const fetch: WindowOrWorkerGlobalScope['fetch'] = (...args) => {
  return window.fetch(...args)
}

export const fetchToken = (): Promise<string> =>
  fetch('https://5f5ff7f790cf8d00165573ed.mockapi.io/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((x) => x.json())
    .then(({ token }) => token)
