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
};

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    columns: [] as Column[],
    tasks: [] as Task[],
  },
  reducers: {
    addNewColumn(state) {
      const id = uniqueId();
      state.columns.push({ id, name: `Column (${id})` });
    },
    removeColumn(state, action: PayloadAction<{ columnId: Column['id'] }>) {
      state.columns = state.columns.filter(column => column.id !== action.payload.columnId);
      //TODO: what to do with tasks assigned to this column ???
    },
    editColumnName(state, action: PayloadAction<{ columnId: Column['id']; columnName: Column['name'] }>) {
      const { columnId, columnName } = action.payload;
      const column = state.columns.find(c => c.id === columnId);

      if (!column) {
        return;
      }

      column.name = columnName;
    },
    addNewTask(state, action: PayloadAction<{ columnId: Column['id'] }>) {
      const id = uniqueId();
      const { columnId } = action.payload;
      state.tasks.push({ id, title: `Task (${id})`, columnId });
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
    },
  },
});

export const { addNewColumn, removeColumn, editColumnName, addNewTask, editTask } = boardSlice.actions;

export default boardSlice.reducer;
