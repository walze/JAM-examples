import React from 'react'

export interface ITodo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export const Todo = (props: { data: ITodo }) => {
  const {
    data: {
      completed,
      id,
      title,
      userId
    }
  } = props

  return (
    <div className="todo">
      <a href={`/todo/${id}`}>
        <div> id - {id} </div>
        <div> title - {title} </div>
        <div> userId - {userId} </div>
        <div> completed - {JSON.stringify(completed)} </div>
      </a>

      <br />
      <br />
    </div>
  );
}