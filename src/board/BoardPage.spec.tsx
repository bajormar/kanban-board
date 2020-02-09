import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import BoardPage from './BoardPage';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../rootReducer';

describe('BoardPage', () => {
  it('should show empty board state', () => {
    const history = createMemoryHistory();

    const store = configureStore({ reducer: rootReducer });

    render(
      <Provider store={store}>
        <Router history={history}>
          <BoardPage />
        </Router>
      </Provider>
    );
    expect(screen.queryByText('No columns')).toBeInTheDocument();
  });

  it('should add new columns and tasks to board', () => {
    const history = createMemoryHistory();

    const store = configureStore({ reducer: rootReducer });

    render(
      <Provider store={store}>
        <Router history={history}>
          <BoardPage />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Add new column'));
    expect(screen.getAllByTestId('board-column')).toHaveLength(1);

    fireEvent.click(screen.getByText('Add new task'));
    expect(screen.getAllByTestId('board-task')).toHaveLength(1);

    fireEvent.click(screen.getByText('Add new task'));
    expect(screen.getAllByTestId('board-task')).toHaveLength(2);
  });

  it('should allow to edit column name', () => {
    const history = createMemoryHistory();

    const store = configureStore({ reducer: rootReducer });

    render(
      <Provider store={store}>
        <Router history={history}>
          <BoardPage />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Add new column'));
    expect(screen.getAllByTestId('board-column')).toHaveLength(1);

    expect(screen.queryByText('Edit')).toBeInTheDocument();
    expect(screen.queryByText('Save changes')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove column')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Save changes')).toBeInTheDocument();
    expect(screen.queryByText('Cancel edit')).toBeInTheDocument();
    expect(screen.queryByText('Remove column')).toBeInTheDocument();

    const input = screen.getByLabelText('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Column ABC' } });
    fireEvent.click(screen.getByText('Save changes'));

    expect(screen.queryByText('Edit')).toBeInTheDocument();
    expect(screen.queryByText('Save changes')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove column')).not.toBeInTheDocument();

    expect(screen.queryByText('Column ABC')).toBeInTheDocument();
  });
});
