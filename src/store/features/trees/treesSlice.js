import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  trees: [],
  //   newAgent: {},
  loading: false,
  error: "",
};

// Generate pending, fulfilled and rejected action types
export const fetchTrees = createAsyncThunk(
  "trees/fetchTrees",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "https://family-tree-backend-nine.vercel.app/api/familyTrees",
        config
      );

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createTrees = createAsyncThunk(
  "trees/createTrees",
  async ({ treeData, dispatch, fetchTrees }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "https://family-tree-backend-nine.vercel.app/api/familyTrees",
        treeData,
        config
      );

      dispatch(fetchTrees());
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTrees = createAsyncThunk(
  "trees/deleteTrees",
  async ({ id, dispatch, fetchTrees }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(id);
      await axios.delete(
        `https://family-tree-backend-nine.vercel.app/api/familyTrees/${id}`,
        config
      );

      dispatch(fetchTrees());

      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error.errors.task.message);
    }
  }
);

export const updateAgents = createAsyncThunk(
  "agents/updateAgents",
  async (
    { data, id, dispatch, fetchAgents, makingSearchedAgents, setIsOpen },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `https://family-tree-backend-nine.vercel.app/api/agents/${id}`,
        data,
        config
      );
      dispatch(fetchAgents());
      dispatch(makingSearchedAgents([]));
      setIsOpen(false);
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const treesSlice = createSlice({
  name: "trees",
  initialState,
  reducers: {
    makingNewAgent(state, action) {
      state.newAgent = { ...action.payload };
    },
    resetError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrees.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchTrees.fulfilled, (state, action) => {
      state.loading = false;
      state.trees = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTrees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createTrees.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createTrees.fulfilled, (state, action) => {
      state.loading = false;
      state.trees = [...state.trees, action.payload];
      state.error = "";
    });
    builder.addCase(createTrees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTrees.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteTrees.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteTrees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateAgents.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateAgents.fulfilled, (state, action) => {
      state.loading = false;
      // state.todos = updatedTodos;
      state.error = "";
    });
    builder.addCase(updateAgents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions generated by createSlice
export const { resetError } = treesSlice.actions;

export default treesSlice.reducer;
