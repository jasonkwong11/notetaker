// @flow

export const homePage = () => null

export const helloPage = () => ({
  hello: { message: 'Server-side preloaded message' },
})

export const helloAsyncPage = () => ({
  hello: { messageAsync: 'Server-side preloaded message for async page' },
})

export const helloEndpoint = (num: number) => ({
  serverMessage: `Hello from the server! (received ${num})`,
})

export const NotesPage = () => ({
  // make db call
  notesPages: { title: 'Shopping list' },
})

// This would typically make business logic and database calls
// right now, we're just hard-coding some results.
// The results are passed back to the routing module to be used
// to initialize our server-side Redux store
