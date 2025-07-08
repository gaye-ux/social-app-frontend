
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Post } from '../types';
import { formatDistanceToNow } from 'date-fns';
import AudioComments from './AudioComments';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const getStatusBadge = () => {
    switch (post.status) {
      case 'pending':
        return (
          <div className="flex items-center space-x-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            <span>Pending Approval</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
            <CheckCircle className="w-3 h-3" />
            <span>Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
            <XCircle className="w-3 h-3" />
            <span>Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <article className="social-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-500">
              @{post.author.username} • {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge()}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isLiked
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{post.comments}</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200">
            <Share className="w-5 h-5" />
            <span className="font-medium">{post.shares}</span>
          </button>
        </div>
      </div>

      {/* Audio Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <AudioComments postId={post.id} />
        </div>
      )}
    </article>
  );
};

export default PostCard;
