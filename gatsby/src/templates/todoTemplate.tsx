import React from "react"
import { graphql } from "gatsby"

import { Layout } from "../components/Layout"
import { ITodo } from "../components/Todo";

export default function Template(props: any) {
  const todo: ITodo = props.data.todos.todo

  return (
    <Layout>
      <h3>id - {todo.id}</h3>
      <p>{todo.title}</p>
    </Layout>
  )
}

export const pageQuery = graphql`
    query($id: Int!) {
    todos(todo: {id: {eq: $id}}) {
      todo {
        completed
        id
        title
        userId
      }
    }
  }
`