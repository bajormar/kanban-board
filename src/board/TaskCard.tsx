import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import TaskEditModal from './TaskEditModal';
import { editTask, Task } from '../boardSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

type Props = {
  task: Task;
};

const TaskCard: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex items-center border p-4 mb-2">
      <div>
        <div className="text-md font-bold">{task.title}</div>
        <div className="text-sm text-gray-600">{task.description}</div>
        <Link className="text-blue-500 hover:text-blue-700" to={`/task/${task.id}`}>
          Details
        </Link>
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
      {modalOpen && (
        <TaskEditModal
          isOpen
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
      )}
    </div>
  );
};

export default TaskCard;
