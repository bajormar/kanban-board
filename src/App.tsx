import React from 'react';

const App = () => {
  return (
      <div className="flex flex-col w-3/4 mx-auto my-12 items-center">
          <h1>Super cool page</h1>
          <button onClick={() => console.log("I was clicked")}>
              I am a button
          </button>
      </div>
  );
};

export default App;
