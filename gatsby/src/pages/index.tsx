import React, { FunctionComponent } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Layout } from "../components/Layout"
import { Todo, ITodo } from "../components/Todo";

const IndexPage: FunctionComponent = () => {

  const { allTodos: allTodosQuery } = useStaticQuery(graphql`
    query allTodosQuery {
      allTodos {
        edges {
          node {
            todo {
              completed
              id
              title
              userId
            }
          }
        }
      }
    }
  `)


  const todos: ITodo[] = allTodosQuery.edges.map(({ node }: any) => node.todo)
  const todoNodes = todos.map((todo, i) => <Todo key={i} data={todo} />)

  return (
    <Layout>
      <h2>
        Todos
      </h2>

      <div className="todos">
        {todoNodes}
      </div>
    </Layout>
  )
}

export default IndexPage
