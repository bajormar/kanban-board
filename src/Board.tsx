import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import Button from './Button';
import { AppDispatch } from './store';
import { addNewColumn } from './boardSlice';

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();

  const board = useSelector((state: RootState) => state.board);

  return (
    <div>
      <Button
        onClick={() => {
          dispatch(addNewColumn());
        }}
      >
        Add new column
      </Button>
    </div>
  );
};

export default Board;
