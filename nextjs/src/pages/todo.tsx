import React from 'react'
import Axios from 'axios';
import { NextFunctionComponent } from 'next';
import { withRouter, WithRouterProps } from 'next/router';

import { Layout } from '../components/Layout';
import { ITodo } from '../components/Todo';

const Todo: NextFunctionComponent<{ todo: ITodo }> & WithRouterProps = (props) => {
  const { todo } = props

  return (
    <Layout>
      <h3>id - {todo.id}</h3>
      <p>{todo.title}</p>
    </Layout>
  )
}

Todo.getInitialProps = async (props) => {

  const todo = await Axios
    .get(`https://jsonplaceholder.typicode.com/todos/${props.query.id}`)
    .then(r => r.data)

  return { todo }
}

export default withRouter(Todo)