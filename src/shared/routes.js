// @flow

// Hello Routes
export const HOME_PAGE_ROUTE = '/'
export const HELLO_PAGE_ROUTE = '/hello'
export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'

// Notes Routes
export const NOTES_ROUTE = '/notes'

// eslint-disable-next-line import/prefer-default-export
export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`

// eslint-disable-next-line import/prefer-default-export
export const notesEndpointRoute = () => '/ajax/notes'
