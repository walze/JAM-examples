const fetch = require('isomorphic-unfetch')

const _pipe = (a, b) => (arg) => b(a(arg));
const pipe = (...ops) => ops.reduce(_pipe)

// next.config.js
const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')

/**
 * @type { ( config: import('next').NextConfig) => any }
 */
const withPlugins = pipe(
  withSass,
  withTypescript
)

module.exports = withPlugins({
  async exportPathMap() {
    // fetch all todos
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')

    const todosList = await response.json()

    // tranform the list of posts into a map of pages with the pathname `/post/:id`
    const todos = todosList.reduce(
      (pages, todo) => {
        const newPage = {
          [`/todo/${todo.id}`]: {
            page: '/todo',
            query: {
              id: todo.id
            }
          }
        }

        return { ...pages, ...newPage }
      },
      {}
    )

    // combine the map of post pages with the home
    return {
      ...todos,
      '/': { page: '/' }
    }
  }
})