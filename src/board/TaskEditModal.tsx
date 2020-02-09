import React from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

type FormModel = {
  title: string;
  description: string;
};

type Props = {
  isOpen: boolean;
  initialValues: FormModel;
  onClose: () => void;
  onSubmit: (data: FormModel) => void;
};

const TaskEditModal: React.FC<Props> = ({ isOpen, initialValues, onClose, onSubmit }) => {
  const { register, handleSubmit } = useForm<FormModel>({ defaultValues: initialValues });

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <Input id="title" name="title" type="text" placeholder="Title" forwardedRef={register} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <Input id="description" name="description" type="text" placeholder="Description" forwardedRef={register} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="ml-2" color="success">
            Save
          </Button>

          <Button className="ml-2" color="warning" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </ReactModal>
  );
};

export default TaskEditModal;
