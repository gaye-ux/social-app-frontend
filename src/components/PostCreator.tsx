import React, { useState } from 'react';
import { Image, Video, Smile, Send } from 'lucide-react';
import { Post } from '@/generated/graphql';

interface PostCreatorProps {
  onPostCreated: (post: Omit<Post, 'id' | 'createdAt'>) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  // Get user values from localStorage (or mock them)
  const userId = localStorage.getItem('userId') || 'current-user';
  const username = localStorage.getItem('username') || 'guest';
  const role = localStorage.getItem('userRole') || 'user';
  const phoneNo = Number(localStorage.getItem('phoneNo')) || 0;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim() && !selectedImage) return;

    setIsPosting(true);

    setTimeout(() => {
      const newPost: Omit<Post, 'id' | 'createdAt'> = {
        caption: caption.trim(),
        user: {
          id: userId,
          username,
          role,
          phoneNo,
          canUpload: true,
        },
        media: selectedImage
          ? [
              {
                id: `media-${Date.now()}`,
                url: selectedImage,
                type: 'image',
                compressed: false,
              },
            ]
          : [],
      };

      onPostCreated(newPost);
      setCaption('');
      setSelectedImage(null);
      setIsPosting(false);
    }, 1000);
  };

  return (
    <div className="social-card p-4 sm:p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">{username.charAt(0)}</span>
          </div>

          <div className="flex-1">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
              rows={3}
            />

            {selectedImage && (
              <div className="mt-4 relative">
                <img
                  src={selectedImage}
                  alt="Selected"
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
              <div className="flex items-center flex-wrap gap-2">
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

                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition"
                >
                  <Video className="w-5 h-5" />
                  <span className="hidden xs:inline">Video</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition"
                >
                  <Smile className="w-5 h-5" />
                  <span className="hidden xs:inline">Feeling</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={(!caption.trim() && !selectedImage) || isPosting}
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
