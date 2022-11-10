import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const completeTodo = createAsyncThunk(
  "todo/complete",
  async (id, { thunkAPI, getState }) => {
    const todo = getState().todos.find((todo) => todo.id === id);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !todo.completed }),
        }
      );
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addTodo = createAsyncThunk("todo/add", async (input, thunkAPI) => {
  try {
    const todo = {
      title: input,
      userId: 1,
      completed: false,
    };
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    const data = await res.json();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => {
          return todo.id !== action.payload;
        });
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
      });
  },
});

export default todosSlice.reducer;
