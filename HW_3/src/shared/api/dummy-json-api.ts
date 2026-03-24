import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, setUser } from '@/features/auth/model/auth-slice'
import type { User } from '@/entities/user/model/types'
import type { Product, ProductsResponse } from '@/entities/product/model/types'
import type { AuthSliceForApi } from '@/shared/api/types'

const BASE_URL = 'https://dummyjson.com'

export interface LoginRequest {
  username: string
  password: string
  expiresInMins?: number
}

interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

function loginResponseToUser(data: LoginResponse): User {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    image: data.image,
  }
}

export interface ProductsQueryArgs {
  limit: number
  skip: number
  q?: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AuthSliceForApi).auth.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const dummyJsonApi = createApi({
  reducerPath: 'dummyJsonApi',
  baseQuery,
  tagTypes: ['Product', 'Products'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              user: loginResponseToUser(data),
            }),
          )
        } catch {
          /* RTK Query surfaces error to the hook */
        }
      },
    }),
    getMe: builder.query<User, void>({
      query: () => ({ url: '/auth/me' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch {
          /* optional: session invalid */
        }
      },
    }),
    getProducts: builder.query<ProductsResponse, ProductsQueryArgs>({
      query: ({ limit, skip, q }) =>
        q
          ? {
              url: '/products/search',
              params: { q, limit, skip },
            }
          : {
              url: '/products',
              params: { limit, skip },
            },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map((p) => ({
                type: 'Product' as const,
                id: p.id,
              })),
              { type: 'Products' as const, id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetMeQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = dummyJsonApi
