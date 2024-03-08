import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  token: null,
  error: "",
  success: false,
};

// Generate pending, fulfilled and rejected action types
export const auth = createAsyncThunk(
  "authentication/auth",
  async ({ isSignUp, signUpData, logInData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://family-tree-backend-nine.vercel.app/api/users/${
          isSignUp ? "signup" : "login"
        }`,
        isSignUp ? signUpData : logInData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "authentication/forgotPassword",
  async ({ email, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://family-tree-backend-nine.vercel.app/api/users/forgotPassword`,
        { email }
      );

      toast.success("Email Sent!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "authentication/resetPassword",
  async ({ resetToken, resetPasswordData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `https://family-tree-backend-nine.vercel.app/api/users/resetPassword/${resetToken}`,
        resetPasswordData
      );

      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetError(state) {
      state.error = "";
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(auth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = "";
    });
    builder.addCase(auth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions generated by createSlice
export const { resetError, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
