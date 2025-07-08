
import React, { useState } from 'react';
import { Image, Video, Smile, Send } from 'lucide-react';
import { Post } from '../types';

interface PostCreatorProps {
  onPostCreated: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || '';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedImage) return;

    setIsPosting(true);

    // Simulate API call
    setTimeout(() => {
      const newPost = {
        author: {
          id: 'current-user',
          name: userName,
          avatar: '',
          username: userEmail.split('@')[0]
        },
        content: content.trim(),
        image: selectedImage || undefined,
        status: 'pending' as const
      };

      onPostCreated(newPost);
      setContent('');
      setSelectedImage(null);
      setIsPosting(false);
    }, 1000);
  };

  return (
    <div className="social-card p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {userName.charAt(0)}
            </span>
          </div>
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              rows={3}
            />

            {selectedImage && (
              <div className="mt-4 relative">
                <img
                  src={selectedImage}
                  alt="Selected upload"
                  className="max-h-64 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200">
                  <Image className="w-5 h-5" />
                  <span className="text-sm font-medium">Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-medium">Video</span>
                </button>

                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Smile className="w-5 h-5" />
                  <span className="text-sm font-medium">Feeling</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={(!content.trim() && !selectedImage) || isPosting}
                className="flex items-center space-x-2 social-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPosting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isPosting ? 'Posting...' : 'Post'}</span>
              </button>
            </div>

            <div className="mt-2 text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
              ℹ️ Your post will be submitted for admin approval before being published.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;
