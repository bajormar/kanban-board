import React from 'react';
import Board from './Board';

const App = () => {
  return (
    <div className="flex flex-col w-3/4 mx-auto my-12 items-center">
      <h1>Kanban board</h1>
      <Board></Board>
    </div>
  );
};

export default App;
