import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash-es';

export type Column = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  columnId: Column['id'];
  title: string;
  description?: string;
  createdOn: number;
  editedOn: number;
};

type BoardState = {
  columns: Column[];
  tasks: Task[];
};

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    columns: [],
    tasks: [],
  } as BoardState,
  reducers: {
    addNewColumn(state) {
      const id = uniqueId();
      state.columns.push({ id, name: `Column (${id})` });
    },
    removeColumn(state, action: PayloadAction<{ columnId: Column['id'] }>) {
      //TODO: what to do with tasks assigned to this column ???
      state.columns = state.columns.filter(column => column.id !== action.payload.columnId);
    },
    editColumnName(state, action: PayloadAction<{ columnId: Column['id']; columnName: Column['name'] }>) {
      const { columnId, columnName } = action.payload;
      const column = state.columns.find(c => c.id === columnId);

      if (!column) {
        return;
      }

      column.name = columnName;
    },
    replaceBoardState(state, action: PayloadAction<BoardState>) {
      state.columns = action.payload.columns;
      state.tasks = action.payload.tasks;
    },
    addNewTask(state, action: PayloadAction<{ columnId: Column['id'] }>) {
      const id = uniqueId();
      const { columnId } = action.payload;
      state.tasks.push({ id, title: `Task (${id})`, columnId, createdOn: Date.now(), editedOn: Date.now() });
    },
    editTask(
      state,
      action: PayloadAction<{ taskId: Task['id']; title: Task['title']; description: Task['description'] }>
    ) {
      const { taskId, title, description } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);

      if (!task) {
        return;
      }

      task.title = title;
      task.description = description;
      task.editedOn = Date.now();
    },
    removeTask(state, action: PayloadAction<{ taskId: Task['id'] }>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.taskId);
    },
  },
});

export const {
  addNewColumn,
  removeColumn,
  editColumnName,
  replaceBoardState,
  addNewTask,
  editTask,
  removeTask,
} = boardSlice.actions;

export default boardSlice.reducer;
