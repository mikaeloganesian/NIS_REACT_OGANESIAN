/* eslint-disable react-refresh/only-export-components -- route table exports `router` plus lazy page modules */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PublicOnly } from '@/app/routes/PublicOnly'
import { RequireAuth } from '@/app/routes/RequireAuth'
import { AuthBootstrap } from '@/app/providers/AuthBootstrap'
import { MainLayout } from '@/widgets/layout/MainLayout/MainLayout'

const LoginPage = lazy(() => import('@/pages/login/ui/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/register/ui/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/ui/DashboardPage'))
const ProductsPage = lazy(() => import('@/pages/products/ui/ProductsPage'))
const ProductDetailPage = lazy(
  () => import('@/pages/product-detail/ui/ProductDetailPage'),
)
const ProfilePage = lazy(() => import('@/pages/profile/ui/ProfilePage'))
const SettingsPage = lazy(() => import('@/pages/settings/ui/SettingsPage'))
const LogoutPage = lazy(() => import('@/pages/logout/ui/LogoutPage'))
const NotFoundPage = lazy(() => import('@/pages/not-found/ui/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicOnly>
        <LoginPage />
      </PublicOnly>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnly>
        <RegisterPage />
      </PublicOnly>
    ),
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: (
          <AuthBootstrap>
            <MainLayout />
          </AuthBootstrap>
        ),
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'products/:id', element: <ProductDetailPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'logout', element: <LogoutPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
