import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash-es';

type Column = {
  id: string;
  name: string;
};

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    columns: [] as Column[],
  },
  reducers: {
    addNewColumn(state) {
      const id = uniqueId();
      state.columns.push({ id, name: `Column (${id})` });
    },
  },
});

export const { addNewColumn } = boardSlice.actions;

export default boardSlice.reducer;
