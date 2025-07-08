
import React, { useState } from 'react';
import { Bell, CheckCircle, XCircle, MessageSquare, Heart, UserPlus, Settings } from 'lucide-react';
import { Notification } from '../types';

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: 'current-user',
      type: 'post_approved',
      title: 'Post Approved!',
      message: 'Your post "Working on some exciting new features..." has been approved and is now live.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionUrl: '/feed'
    },
    {
      id: '2',
      userId: 'current-user',
      type: 'comment',
      title: 'New Comment',
      message: 'Sarah commented on your post with an audio message.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      userId: 'current-user',
      type: 'like',
      title: 'Post Liked',
      message: 'Mike and 5 others liked your post.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '4',
      userId: 'current-user',
      type: 'post_rejected',
      title: 'Post Needs Review',
      message: 'Your recent post requires some modifications before approval.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/upload-request'
    },
    {
      id: '5',
      userId: 'current-user',
      type: 'follow',
      title: 'New Follower',
      message: 'Alex started following you.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'post_approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'post_rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up!'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              Mark all as read
            </button>
          )}
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`social-card p-6 cursor-pointer transition-all duration-200 ${
              !notification.read 
                ? 'border-l-4 border-blue-500 bg-blue-50/30' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => !notification.read && markAsRead(notification.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(notification.timestamp)}
                    </span>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <p className={`text-sm ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                  {notification.message}
                </p>
                
                {notification.actionUrl && (
                  <div className="mt-3">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Details →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-500">When you get notifications, they'll show up here.</p>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="mt-8 social-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            { label: 'Post Approvals', description: 'Get notified when your posts are approved or rejected' },
            { label: 'Comments', description: 'Get notified when someone comments on your posts' },
            { label: 'Likes & Reactions', description: 'Get notified when someone likes your content' },
            { label: 'New Followers', description: 'Get notified when someone follows you' },
            { label: 'Audio Comments', description: 'Get notified about audio comments (expire in 48h)' }
          ].map((setting) => (
            <div key={setting.label} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{setting.label}</h4>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
