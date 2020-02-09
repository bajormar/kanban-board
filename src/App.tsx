import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BoardPage from './board/BoardPage';
import TaskDetailsPage from './task-details/TaskDetailsPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { replaceBoardState } from './boardSlice';
import { RootState } from './rootReducer';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const boardState = useSelector((state: RootState) => state.board);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      return;
    }
    localStorage.setItem('board', JSON.stringify(boardState));
  }, [boardState, dispatch, isFirstLoad]);

  useEffect(() => {
    setIsFirstLoad(false);
    const board = localStorage.getItem('board');
    if (board) {
      dispatch(replaceBoardState(JSON.parse(board)));
    }
  }, [dispatch]);

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
