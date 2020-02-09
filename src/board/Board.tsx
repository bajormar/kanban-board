import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { RootState } from '../rootReducer';
import Button from '../shared/Button';
import { AppDispatch } from '../store';
import { addNewColumn, addNewTask, changeTaskColumn } from '../boardSlice';
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
            <DragDropContext
              onDragEnd={({ source, destination, draggableId }) => {
                if (!destination) {
                  return;
                }

                if (source.droppableId === destination.droppableId) {
                  return;
                }

                dispatch(changeTaskColumn({ taskId: draggableId, columnId: destination.droppableId }));
              }}
            >
              {columns.map(column => {
                return (
                  <div key={column.id} className="flex-1 border">
                    <Droppable droppableId={column.id}>
                      {provided => {
                        return (
                          <div ref={provided.innerRef}>
                            <BoardColumnHeader column={column} />
                            <div className="p-4">
                              {tasks
                                .filter(task => task.columnId === column.id)
                                .map((task, index) => {
                                  return (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                      {provided => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <TaskCard task={task} />
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                              {provided.placeholder}
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
                      }}
                    </Droppable>
                  </div>
                );
              })}
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
