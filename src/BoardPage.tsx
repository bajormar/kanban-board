import React from 'react';
import Board from './Board';

const BoardPage: React.FC = () => {
  return (
    <>
      <h1 className="text-lg mb-2">Kanban board</h1>
      <Board />
    </>
  );
};

export default BoardPage;
