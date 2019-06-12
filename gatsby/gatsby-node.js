const axios = require('axios');
const crypto = require('crypto');
const path = require(`path`)

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  const todos = await axios.get('https://jsonplaceholder.typicode.com/todos').then(({ data }) => data)
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


exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;

  // fetch raw data from the randomuser api
  const fetchRandomUser = () => axios.get(`https://jsonplaceholder.typicode.com/todos`);
  // await for results
  const res = await fetchRandomUser();

  // map into these results and create nodes
  res.data.map((todo, i) => {
    // Create your node object
    const userNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `todos`, // name of the graphQL query --> allRandomUser {}
        // contentDigest will be added just after
        // but it is required
      },
      todo,
      children: [],
    }

    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(userNode + i))
      .digest(`hex`);
    // add it to userNode

    userNode.internal.contentDigest = contentDigest;

    createNode(userNode);
  });

  return;
}