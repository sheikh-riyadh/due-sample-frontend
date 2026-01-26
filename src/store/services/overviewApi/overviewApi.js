import { baseApi } from "../../api/baseApi";

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOverview: build.query({
      query: () => ({
        url: `get-overview`,
      }),
      providesTags: ["overview"],
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
