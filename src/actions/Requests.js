import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFeedback = createAsyncThunk(
  'feedback/fetchFeedback',
  async () => {
    const response = await axios.get(`/api/feedback`);
    return response.data;
  }
);

export const deleteFeedbackAsync = createAsyncThunk(
    'feedback/deleteFeedback',
    async (id) => {
      await axios.delete(`/api/feedback/${id}`);
      console.log(id);
      return id;
    }
  );

export const createFeedbackAsync = createAsyncThunk(
    'feedback/createFeedback',
    async (feedback) => {
      const response = await axios.post(`/api/feedback`, feedback);
      return response.data;
    }
  );

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
      const response = await axios.get(`/api/profile`);
      console.log(response.data);
      return response.data;
  }
);

export const updateProfileAsync = createAsyncThunk(
    'profile/updateProfile',
    async ({ id, profileData }) => {
        const response = await axios.put(`/api/profile/${id}`, profileData);
        return response.data;
    }
);

export const createAccountAsync = createAsyncThunk(
    'signup/createAccount',
    async (account) => {
      const response = await axios.post(`/api/signup`, account);
      return response.data;
    }
);

export const signinAccountAsync = createAsyncThunk(
  'signin/signinAccount',
  async (account, {dispatch}) => {
    const response = await axios.post(`/api/signin`, account);
    dispatch(checkSessionAsync());
    return response.data;
  }
);

export const checkSessionAsync = createAsyncThunk(
  'auth/checkSession',
  async () => {
      const response = await axios.get(`/api/session`, {withCredentials: true});
      return response.data;
  }
);

export const Logout = createAsyncThunk(
  'session/Logout',
  async () => {
      const response = await axios.post(`/api/logout`, {withCredentials: true});
      return response.data;
  }
);

export const blockFeedbackAsync = createAsyncThunk(
  'feedback/block',
  async (id) => {
    await axios.put(`/api/feedback/block/${id}`);
    return id;
  }
);

export const unblockFeedbackAsync = createAsyncThunk(
  'feedback/unblock',
  async (id) => {
    await axios.put(`/api/feedback/unblock/${id}`);
    return id;
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    isAuthenticated: null,
    username: null,
    user: null,
    feedbacks: [],
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFeedbackAsync.pending, (state) => {
          state.loading = true;
      })
      .addCase(deleteFeedbackAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
      })
      .addCase(deleteFeedbackAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(createFeedbackAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFeedbackAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.feedbacks = [...state.feedbacks, action.payload];
      })
      .addCase(createFeedbackAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(createAccountAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createAccountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signinAccountAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinAccountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signinAccountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        localStorage.removeItem('token');
      })
      .addCase(checkSessionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSessionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.authenticated;
        state.username = action.payload.username || null;
        state.profile = action.payload.profile || null;
      })
      .addCase(checkSessionAsync.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.profile = null;
        state.error = 'Ошибка входа';
      })
      .addCase(Logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export default feedbackSlice.reducer;