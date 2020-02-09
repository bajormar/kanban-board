import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import Button from './Button';
import { AppDispatch } from './store';
import { addNewColumn, addNewTask } from './boardSlice';
import TaskCard from './TaskCard';
import BoardColumnHeader from './BoardColumnHeader';

const Board: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { columns, tasks } = useSelector((state: RootState) => state.board);

  return (
    <div className="container">
      <Button
        color="primary"
        onClick={() => {
          dispatch(addNewColumn());
        }}
      >
        Add new column
      </Button>
      <div>
        {!columns.length && <div className="flex my-2 border p-4">No columns</div>}
        {columns.length > 0 && (
          <div className="flex my-2">
            {columns.map(column => {
              return (
                <div key={column.id} className="flex-1 border">
                  <BoardColumnHeader column={column} />
                  <div className="p-4">
                    {tasks
                      .filter(task => task.columnId === column.id)
                      .map(task => {
                        return <TaskCard key={task.id} task={task} />;
                      })}
                    <Button
                      color="primary"
                      onClick={() => {
                        dispatch(addNewTask({ columnId: column.id }));
                      }}
                    >
                      Add new task
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
