import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      
      if (userData.username === "Nidhi" && userData.password === "Nidhi@678") {
        const fakeData = {
          username: userData.username,
          accessToken: "dummy-jwt-token-123456",
        };
        localStorage.setItem("token", fakeData.accessToken);
        return fakeData;
      } else {
        return rejectWithValue("Invalid username or password");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
