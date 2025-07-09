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
    <div className="social-card p-4 sm:p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">{userName.charAt(0)}</span>
          </div>

          {/* Post Input Area */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
              rows={3}
            />

            {/* Image Preview */}
            {selectedImage && (
              <div className="mt-4 relative">
                <img
                  src={selectedImage}
                  alt="Selected upload"
                  className="max-h-64 rounded-lg object-cover w-full"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  ×
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
              <div className="flex items-center flex-wrap gap-2">
                {/* Photo Upload */}
                <label className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition text-sm">
                  <Image className="w-5 h-5" />
                  <span className="hidden xs:inline">Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Video (non-functional placeholder) */}
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition"
                >
                  <Video className="w-5 h-5" />
                  <span className="hidden xs:inline">Video</span>
                </button>

                {/* Feeling */}
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition"
                >
                  <Smile className="w-5 h-5" />
                  <span className="hidden xs:inline">Feeling</span>
                </button>
              </div>

              {/* Post Button */}
              <button
                type="submit"
                disabled={(!content.trim() && !selectedImage) || isPosting}
                className="flex items-center justify-center gap-2 self-end sm:self-auto px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPosting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isPosting ? 'Posting...' : 'Post'}</span>
              </button>
            </div>

            {/* Info Note */}
            <div className="mt-3 text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
              ℹ️ Your post will be submitted for admin approval before being published.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;
