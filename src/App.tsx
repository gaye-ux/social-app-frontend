import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import UploadRequest from "./pages/UploadRequest";
import Notifications from "./pages/Notifications";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    toast.warn('Please Login or Sign Up First', {
      position: 'top-right',
      autoClose: 4000,
    });
    return <Navigate to="/feeds" replace />;
  }

  return <>{children}</>;
};


// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/feeds" replace />;
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
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route path="/feeds" element={<Feed />} />
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
