import React, { useState } from 'react';
import { Column, editColumnName, removeColumn } from '../boardSlice';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

type Props = {
  column: Column;
};

const BoardColumnHeader: React.FC<Props> = ({ column }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [editModeEnabled, setIsEditModeEnabled] = useState(false);
  const [editableColumnName, setEditableColumnName] = useState<Column['name']>('');

  return (
    <div key={column.id} className="flex items-center border-b p-4" data-testid="board-column-header">
      {editModeEnabled ? (
        <Input value={editableColumnName} placeholder="Enter column name" onChange={setEditableColumnName} />
      ) : (
        <div>{column.name}</div>
      )}
      <div className="flex ml-auto">
        {editModeEnabled ? (
          <>
            <Button
              className="ml-2"
              color="success"
              onClick={() => {
                dispatch(editColumnName({ columnId: column.id, columnName: editableColumnName }));
                setIsEditModeEnabled(false);
                setEditableColumnName('');
              }}
            >
              Save changes
            </Button>
            <Button
              className="ml-2"
              color="warning"
              onClick={() => {
                setIsEditModeEnabled(false);
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
                setIsEditModeEnabled(false);
                setEditableColumnName('');
              }}
            >
              Remove column
            </Button>
          </>
        ) : (
          <Button
            className="ml-2"
            color="info"
            onClick={() => {
              setIsEditModeEnabled(true);
              setEditableColumnName(column.name);
            }}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardColumnHeader;
