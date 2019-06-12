const fetch = require('isomorphic-unfetch');
const path = require(`path`)

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  const todos = await fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
  const todoTemplate = path.resolve(`./src/templates/todoTemplate.tsx`)


  return todos.map((_, i) => {
    const id = i + 1

    createPage({
      path: `/todo/${id}`,
      component: todoTemplate,
      context: { id },
    })
  })
}


exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  // fetch raw data from the api
  const todos = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then(res => res.json());

  // map into these results and create nodes
  todos
    .map((todo, i) => (
      {
        id: `${i}`,
        parent: `__SOURCE__`,
        internal: {
          type: `todos`,
          contentDigest: `${i}`
        },
        todo,
      }
    ))
    .map(node => createNode(node))

  return;
}