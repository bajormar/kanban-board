import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { columns, tasks } = useSelector((state: RootState) => state.board);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return <div className="container">Task not found</div>;
  }

  const column = columns.find(c => c.id === task.columnId);

  return (
    <>
      <h1 className="text-lg mb-2">TaskDetails</h1>

      <Link className="text-blue-500 hover:text-blue-700" to="/">
        Go back
      </Link>

      <div className="flex">
        <div className="font-bold">Title</div>
        <div className="ml-2">{task.title}</div>
      </div>

      <div className="flex">
        <div className="font-bold">Description</div>
        <div className="ml-2">{task.description}</div>
      </div>

      <div className="flex">
        <div className="font-bold">Column name</div>
        <div className="ml-2">{column && column.name}</div>
      </div>

      <div className="flex">
        <div className="font-bold">Created</div>
        <div className="ml-2">{task.createdOn}</div>
      </div>

      <div className="flex">
        <div className="font-bold">Edited</div>
        <div className="ml-2">{task.editedOn}</div>
      </div>
    </>
  );
};

export default TaskDetailsPage;
