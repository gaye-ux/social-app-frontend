import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Post } from '@/generated/graphql';
import { formatDistanceToNow } from 'date-fns';
import AudioComments from './AudioComments';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const getStatusBadge = () => {
    const status = (post as any).status as string;

    switch (status) {
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

  const safeDate = (value: string | undefined) => {
    const date = new Date(value || '');
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <article className="social-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.user?.username?.charAt(0).toUpperCase() || '?'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.user?.username || 'Unknown'}</h3>
            <p className="text-sm text-gray-500">
              @{post.user?.username || 'unknown'} •{' '}
              {safeDate(post.createdAt)
                ? formatDistanceToNow(safeDate(post.createdAt)!, { addSuffix: true })
                : 'unknown time'}
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
        <p className="text-gray-900 leading-relaxed">{post.caption}</p>
      </div>

      {/* Media */}
      {post.media?.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden grid gap-2">
          {post.media.map(
            (item, index) =>
              item?.url && (
                <img
                  key={index}
                  src={item.url}
                  alt={`Post media ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              )
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isLiked ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-gray-500 hover:bg-gray-100'
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
            <span className="font-medium">{comments}</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200">
            <Share className="w-5 h-5" />
            <span className="font-medium">{shares}</span>
          </button>
        </div>
      </div>

      {/* Audio Comments */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <AudioComments postId={post.id} />
        </div>
      )}
    </article>
  );
};

export default PostCard;
