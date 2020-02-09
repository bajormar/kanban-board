import React from 'react';
import Board from './Board';

const App: React.FC = () => {
  return (
    <div className="flex flex-col w-3/4 mx-auto my-12">
      <h1 className="text-lg mb-2">Kanban board</h1>
      <Board></Board>
    </div>
  );
};

export default App;
