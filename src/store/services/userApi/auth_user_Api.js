import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    user: build.mutation({
      query: (data) => ({
        url: `login`,
        method: "POST",
        body: data,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useUserMutation } = userApi;
