import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import Button from './Button';
import { AppDispatch } from './store';
import { addNewColumn, addNewTask, removeColumn, editColumnName, Column, editTask } from './boardSlice';
import Input from './Input';
import TaskEditModal from './TaskEditModal';

const Board: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { columns, tasks } = useSelector((state: RootState) => state.board);

  const [editableColumn, setEditableColumn] = useState<Column['id'] | undefined>(undefined);
  const [editableColumnName, setEditableColumnName] = useState<Column['name']>('');

  const [modalOpen, setModalOpen] = useState(false);

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
      <div className="">
        {!columns.length && <div className="flex my-2 border p-4">No columns</div>}
        {columns.length > 0 && (
          <div className="flex my-2">
            {columns.map(column => {
              return (
                <div key={column.id} className="flex-1 border">
                  <div className="flex items-center border-b p-4">
                    {editableColumn === column.id ? (
                      <Input
                        value={editableColumnName}
                        placeholder="Enter column name"
                        onChange={setEditableColumnName}
                      />
                    ) : (
                      <div>{column.name}</div>
                    )}
                    <div className="ml-auto">
                      {editableColumn !== column.id && (
                        <Button
                          className="ml-2"
                          color="info"
                          onClick={() => {
                            setEditableColumn(column.id);
                            setEditableColumnName(column.name);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                      {editableColumn === column.id && (
                        <>
                          <Button
                            className="ml-2"
                            color="success"
                            onClick={() => {
                              dispatch(editColumnName({ columnId: column.id, columnName: editableColumnName }));
                              setEditableColumn(undefined);
                              setEditableColumnName('');
                            }}
                          >
                            Save changes
                          </Button>
                          <Button
                            className="ml-2"
                            color="warning"
                            onClick={() => {
                              setEditableColumn(undefined);
                              setEditableColumnName('');
                            }}
                          >
                            Cancel edit
                          </Button>
                          <Button
                            className="ml-2"
                            color="danger"
                            onClick={() => {
                              dispatch(removeColumn({ columnId: column.id }));
                              setEditableColumn(undefined);
                              setEditableColumnName('');
                            }}
                          >
                            Remove column
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    {tasks
                      .filter(task => task.columnId === column.id)
                      .map(task => {
                        return (
                          <div key={task.id} className="flex items-center border p-4 mb-2">
                            <div>
                              <div className="text-md font-bold">{task.title}</div>
                              <div className="text-sm text-gray-600">{task.description}</div>
                            </div>
                            <Button
                              className="ml-auto"
                              color="info"
                              onClick={() => {
                                setModalOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <TaskEditModal
                              isOpen={modalOpen}
                              onClose={() => {
                                setModalOpen(false);
                              }}
                              onSubmit={formData => {
                                dispatch(
                                  editTask({
                                    taskId: task.id,
                                    title: formData.title,
                                    description: formData.description,
                                  })
                                );
                                setModalOpen(false);
                              }}
                              initialValues={{
                                title: task.title,
                                description: task.description || '',
                              }}
                            />
                          </div>
                        );
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
