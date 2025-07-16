import React, { useState } from 'react';
import { Post } from '@/generated/graphql';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: string } | null>(null);

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
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-900 leading-relaxed">{post.caption}</p>
      </div>

      {/* Media */}
      {post.media?.length > 0 && (
        <div className={`mb-6 grid gap-4 ${post.media.length === 1 ? 'grid-cols-1' : post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {post.media.map((item) => {
            if (!item?.url) return null;

            const mediaType = item.type?.toLowerCase();
            const isCompressed = item.compressed;
            const imageUrl = isCompressed ? `${item.url}?w=400` : item.url;
            const modalUrl = isCompressed ? `${item.url}?w=1200` : item.url;

            return (
              <div
                key={item.id}
                className="relative group rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
                role="group"
                aria-label={`Media ${item.id}`}
              >
                {mediaType === 'image' && (
                  <button
                    onClick={() => setSelectedMedia({ url: modalUrl, type: mediaType })}
                    className="w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Enlarge image ${item.id}`}
                  >
                    <img
                      src={imageUrl}
                      srcSet={
                        isCompressed
                          ? `${item.url}?w=400 400w, ${item.url}?w=800 800w`
                          : item.url
                      }
                      sizes={
                        post.media.length === 1
                          ? '(max-width: 640px) 100vw, 800px'
                          : '(max-width: 640px) 50vw, 400px'
                      }
                      alt={`Post image ${item.id}`}
                      className={`w-full ${post.media.length === 1 ? 'h-[450px]' : 'h-64'
                        } object-cover rounded-xl transition-transform duration-300 group-hover:scale-105`}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = '/fallback-image.png')}
                    />
                  </button>
                )}

                {mediaType === 'video' && (
                  <button
                    onClick={() => setSelectedMedia({ url: item.url, type: mediaType })}
                    className="w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                    aria-label={`Play video ${item.id}`}
                  >
                    <video
                      src={item.url}
                      className={`w-full ${post.media.length === 1 ? 'h-96' : 'h-48'
                        } object-cover rounded-xl`}
                      preload="metadata"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300 bg-black bg-opacity-30">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M5 3l14 9-14 9V3z" />
                      </svg>
                    </div>
                  </button>
                )}

                {mediaType === 'audio' && (
  <button
    onClick={() =>
      setSelectedMedia({
        url: item.url,
        type: 'audio',
      })
    }
    className="w-full h-24 focus:outline-none group bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative"
    aria-label={`Play audio ${item.id}`}
  >
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 bg-black bg-opacity-30 transition-opacity duration-300 z-10">
      <svg
        className="w-10 h-10 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    </div>
    <div className="w-full h-full flex items-center px-4 z-0">
      <audio controls className="w-full">
        <source src={item.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  </button>
)}

              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 text-red-500 text-3xl font-bold"
            aria-label="Close modal"
          >
            ✕
          </button>
          {selectedMedia.type === 'image' ? (
            <img src={selectedMedia.url} alt="Enlarged media" className="max-w-full max-h-full" />
          ) : (
            <video src={selectedMedia.url} controls autoPlay className="max-w-full max-h-full" />
          )}
        </div>
      )}

      {/* Comments */}
      {post.comments?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {post.comments.map((comment) => (
            <div key={comment.id} className="mb-2">
              <p className="text-gray-900">{comment.content}</p>
              <p className="text-sm text-gray-500">
                {safeDate(comment.createdAt)
                  ? formatDistanceToNow(safeDate(comment.createdAt)!, { addSuffix: true })
                  : 'unknown time'}
                {comment.expiresAt &&
                  ` • Expires ${safeDate(comment.expiresAt)
                    ? formatDistanceToNow(safeDate(comment.expiresAt)!, { addSuffix: true })
                    : 'unknown time'}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder for future implementation of non-Post type features */}
      {/*
        TODO: Implement the following features:
        - Like button functionality
        - Comment button to toggle AudioComments
        - Share button
        - Status badge (pending/approved/rejected)
        - More options button
      */}
    </article>
  );
};

export default React.memo(PostCard);
