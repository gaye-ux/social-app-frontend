
import React, { useState, useEffect } from 'react';
import PostCreator from '../components/PostCreator';
import PostCard from '../components/PostCard';
import { Post } from '../types';

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      const mockPosts: Post[] = [
        {
          id: '1',
          author: {
            id: '1',
            name: 'John Doe',
            avatar: '',
            username: 'john_doe'
          },
          content: 'Just finished working on an amazing new project! Can\'t wait to share more details soon. #coding #webdev',
          image: '/api/placeholder/600/400',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          likes: 24,
          comments: 8,
          shares: 3,
          status: 'approved'
        },
        {
          id: '2',
          author: {
            id: '2',
            name: 'Sarah Johnson',
            avatar: '',
            username: 'sarah_j'
          },
          content: 'Beautiful sunset from my evening walk today 🌅',
          image: '/api/placeholder/600/300',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          likes: 42,
          comments: 12,
          shares: 6,
          status: 'approved'
        },
        {
          id: '3',
          author: {
            id: '3',
            name: 'Mike Chen',
            avatar: '',
            username: 'mike_c'
          },
          content: 'Excited to announce that I\'ll be speaking at the upcoming tech conference! Looking forward to sharing insights about modern web development.',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          likes: 15,
          comments: 4,
          shares: 8,
          status: 'approved'
        }
      ];
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleNewPost = (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      status: 'pending'
    };
    setPosts([post, ...posts]);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="space-y-6">
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
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <PostCreator onPostCreated={handleNewPost} />
      
      <div className="space-y-6 mt-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
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
