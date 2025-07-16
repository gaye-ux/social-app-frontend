import React from 'react';
import PostCreator from '../components/PostCreator';
import PostCard from '../components/PostCard';
import { useGetAllPostsQuery } from '@/generated/graphql';
import { Post } from '@/types/graphql'; // optional if you're using types from Codegen

const Feed = () => {
  const { data, loading, error } = useGetAllPostsQuery();

const posts = (data?.getAllPosts ?? []).slice().sort((a, b) => {
  // Assuming createdAt is a string (e.g., ISO date) or number (Unix timestamp)
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
});

  const handleNewPost = (
    newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>
  ) => {
    // This logic should eventually mutate the backend
    // but for now we just simulate local addition
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
    };
    // You may need local state if you want to show new posts immediately
    // OR trigger a refetch
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        {/* Loading Skeleton */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="social-card p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-red-500">
        Error loading posts: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <PostCreator onPostCreated={handleNewPost} />

      <div className="space-y-6 mt-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post as Post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts yet. Be the first to share something!</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
