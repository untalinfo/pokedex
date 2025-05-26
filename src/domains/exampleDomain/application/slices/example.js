import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	todos: ['Todo 1', 'Todo 2'],
};

const ExampleSlice = createSlice({
	name: 'example',
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todos.push(action.payload);
		},
	},
});

export const { addTodo } = ExampleSlice.actions;

export default ExampleSlice.reducer;
