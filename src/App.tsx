import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import UploadRequest from "./pages/UploadRequest";
import Notifications from "./pages/Notifications";

// Query client initializer 
const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = Cookies.get('isAuthenticated') === 'true';

  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = Cookies.get('isAuthenticated') === 'true';
  const userRole = Cookies.get('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/feeds" replace />} />

            {/* Public Routes */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="feeds" element={<Feed />} />

            {/* Protected Routes */}
            {/* <Route
              index
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="upload-request"
              element={
                <ProtectedRoute>
                  <UploadRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

            {/* Placeholder routes */}
            <Route
              path="comments"
              element={
                <ProtectedRoute>
                  <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Comments</h1>
                    <p className="text-gray-600">Audio comments management will be implemented here.</p>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="trending"
              element={
                <ProtectedRoute>
                  <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Trending</h1>
                    <p className="text-gray-600">Trending content will be displayed here.</p>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
                    <p className="text-gray-600">User settings and preferences will be available here.</p>
                  </div>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;