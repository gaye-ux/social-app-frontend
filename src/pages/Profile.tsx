import React, { useRef, useState, useEffect } from 'react';
import {
  Camera, Edit3, MapPin, Calendar, Link as LinkIcon, MoreHorizontal, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PostCard from '../components/PostCard';
import { useGetUserPostsQuery} from '@/generated/graphql';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');
  const navigate = useNavigate();

  const userName = Cookies.get('username') || 'User';
  const userPhoneNo = Cookies.get('userPhoneNo') || '';
  const userId = Cookies.get('userId') || '';

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Fetch user posts
  const { data, loading, error } = useGetUserPostsQuery({
    variables: { userId },
    skip: !userId, // Skip query if userId is not available
  });

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('username');
    Cookies.remove('userPhoneNo');
    Cookies.remove('userRole');
    Cookies.remove('isAuthenticated');
    navigate('/feeds');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  // Map GraphQL posts to PostCard-compatible format
 const userPosts = React.useMemo(
  () =>
    data?.getUserPosts?.map(post => ({
      ...post,
      timestamp: new Date(post.createdAt),
      likes: 0,
      comments: post.comments || [],
      shares: 0,
      status: post.status === null ? "approved" : post.status
    })) || [],
  [data?.getUserPosts]
);

  const tabs = [
    { id: 'posts', label: 'Posts', count: userPosts.length },
    { id: 'media', label: 'Media', count: 5 }, // Static for now
    { id: 'likes', label: 'Liked', count: 20 }, // Static for now
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Profile Header */}
      <div className="social-card p-4 sm:p-8 mb-6">
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-40 sm:h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 relative overflow-hidden">
            {coverImage && (
              <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
            )}
            <button
              onClick={() => coverInputRef.current?.click()}
              className="absolute top-4 right-4 p-2 bg-blue-300 rounded-full hover:bg-blue-100 transition"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={handleCoverChange}
              className="hidden"
            />
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-12 left-4 sm:left-8">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white font-bold text-2xl sm:text-3xl">
                    {userName.charAt(0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => profileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={profileInputRef}
                onChange={handleProfileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-16 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{userName}</h1>
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            {userPhoneNo ? (
              <p className="text-gray-600 mb-3 text-sm">@{userPhoneNo}</p>
            ) : (
              <p className="text-gray-600 mb-3 text-sm">@{userName.toLowerCase().replace(/\s+/g, '')}</p>
            )}
            <p className="text-blue-800 mb-4 text-lg">
              A Passionate Nailoul Houda Member
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600 mb-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined March 2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon className="w-4 h-4" />
                <a href="#" className="text-blue-600 hover:text-blue-500">portfolio.com</a>
              </div>
            </div>

            <div className="flex space-x-6 text-sm">
              <div>
                <span className="font-bold text-gray-900">128</span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">1.2K</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
            >
              <LogOut className="w-4 h-4 inline mr-1" />
              Logout
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="social-card mb-6 overflow-x-auto">
        <div className="flex border-b border-gray-200 min-w-[400px] sm:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'posts' && (
          <>
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading posts...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">Error loading posts: {error.message}</p>
              </div>
            )}
            {!loading && !error && userPosts.length > 0 && (
              userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
            {!loading && !error && userPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No posts yet</p>
                <p className="text-gray-400">Share your first post to get started!</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'media' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg hover:opacity-80 transition">
                <img
                  src={`/api/placeholder/300/300`}
                  alt={`Media ${i}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Liked posts will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;