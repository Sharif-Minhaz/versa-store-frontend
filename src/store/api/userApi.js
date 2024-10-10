import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({ url: "/auth/profile", method: "GET" }),
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: "/auth/profile",
        method: "PUT",
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
