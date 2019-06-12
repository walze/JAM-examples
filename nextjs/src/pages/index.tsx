import React, { FunctionComponent } from 'react'
import { NextFunctionComponent } from 'next';
import { withAmp, useAmp } from 'next/amp';
import { default as Axios } from 'axios'

import './index.scss';
import { Todo, ITodo } from '../components/Todo';
import { Layout } from '../components/Layout';

interface IIndexProps {
  todos: ITodo[],
}

const Index: NextFunctionComponent<IIndexProps> = (props) => {
  const { todos } = props
  const todoNodes = todos.map((todo, i) => <Todo key={i} data={todo} />)

  return (
    <Layout>
      <h2>
        Todos, isAMP: {JSON.stringify(useAmp())}
      </h2>

      <div className="todos">
        {todoNodes}
      </div>
    </Layout>
  )
}

const API = `https://jsonplaceholder.typicode.com/todos/`

Index.getInitialProps = async () => {
  const todos = await Axios.get<ITodo[]>(API).then(r => r.data)

  return {
    todos: todos.slice(0, 7)
  }
}


export default withAmp(Index as unknown as FunctionComponent, { hybrid: true })