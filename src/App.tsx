import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BoardPage from './BoardPage';
import TaskDetailsPage from './TaskDetailsPage';

const App: React.FC = () => {
  return (
    <div className="w-3/4 mx-auto my-12">
      <Router>
        <Switch>
          <Route exact path="/">
            <BoardPage />
          </Route>
          <Route path="/task/:id">
            <TaskDetailsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
