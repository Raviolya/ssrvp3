import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  endpoints: (builder) => ({

    fetchUsers: builder.query({
      query: () => '/admin/users',
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/delete/${userId}`,
        method: 'DELETE',
      }),
    }),

    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/block`,
        method: 'PUT',
      }),
    }),

    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/unblock`,
        method: 'PUT',
      }),
    }),

    fetchProfile: builder.query({
      query: () => '/profile', 
    }),

    updateProfile: builder.mutation({
      query: ({ id, profileData }) => ({
        url: `/profile/${id}`,
        method: 'PUT',
        body: profileData,
      }),
    }),

    createAccount: builder.mutation({
      query: (account) => ({
        url: '/signup',
        method: 'POST',
        body: account,
      }),
    }),

    signinAccount: builder.mutation({
      query: (account) => ({
        url: '/signin',
        method: 'POST',
        body: account,
      }),
    }),

    checkSession: builder.query({
      query: () => '/session',
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useFetchProfileQuery,
  useUpdateProfileMutation,
  useCreateAccountMutation,
  useSigninAccountMutation,
  useCheckSessionQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useLogoutMutation,
  useFetchUsersQuery,
} = userApi;


export const checkSessionAsync = createAsyncThunk(
  'auth/checkSession',
  async () => {
      const response = await axios.get(`/api/session`, {withCredentials: true});
      return response.data;
  }
);


export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    fetchFeedback: builder.query({
      query: () => 'feedback',
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/${id}`,
        method: 'DELETE',
      }),
    }),
    createFeedback: builder.mutation({
      query: (feedback) => ({
        url: 'feedback',
        method: 'POST',
        body: feedback,
      }),
    }),
    blockFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/block/${id}`,
        method: 'PUT',
      }),
    }),
    unblockFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/unblock/${id}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useFetchFeedbackQuery,
  useDeleteFeedbackMutation,
  useCreateFeedbackMutation,
  useBlockFeedbackMutation,
  useUnblockFeedbackMutation,
} = feedbackApi;

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    isAuthenticated: null,
    loading: false,
    error: null,
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkSessionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSessionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.authenticated;
      })
      .addCase(checkSessionAsync.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = 'Ошибка входа';
      })
      .addMatcher(
        feedbackApi.endpoints.fetchFeedback.matchFulfilled,
        (state, action) => {
          state.feedbacks = action.payload;
        }
      )
      .addMatcher(
        feedbackApi.endpoints.deleteFeedback.matchFulfilled,
        (state, action) => {
          state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
        }
      )
      .addMatcher(
        feedbackApi.endpoints.createFeedback.matchFulfilled,
        (state, action) => {
          state.feedbacks.push(action.payload);
        }
      );
  },
});

export default requestSlice.reducer;