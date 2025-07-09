import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';
import { UploadRequest } from '../types';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'users' | 'flagged'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const mockPendingRequests: UploadRequest[] = [
    {
      id: '1',
      userId: 'user1',
      userType: 'user',
      content: 'Check out this amazing sunset I captured during my vacation! 🌅',
      mediaUrl: '/api/placeholder/400/300',
      mediaType: 'image',
      status: 'pending',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      userId: 'user2',
      userType: 'user',
      content: 'Excited to share my latest project with everyone. This has been months in the making!',
      status: 'pending',
      submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: '3',
      userId: 'user3',
      userType: 'user',
      content: 'Here\'s a quick tutorial video on React hooks that I made for beginners.',
      mediaUrl: '/api/placeholder/400/225',
      mediaType: 'video',
      status: 'pending',
      submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ];

  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);

  const handleApprove = (requestId: string) => {
    setPendingRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved', reviewedAt: new Date(), reviewedBy: 'admin' }
          : req
      )
    );
  };

  const handleReject = (requestId: string, reason?: string) => {
    setPendingRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              status: 'rejected', 
              reviewedAt: new Date(), 
              reviewedBy: 'admin',
              rejectionReason: reason || 'Content does not meet community guidelines'
            }
          : req
      )
    );
  };

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600' },
    { title: 'Pending Posts', value: pendingRequests.filter(r => r.status === 'pending').length.toString(), icon: Clock, color: 'text-yellow-600' },
    { title: 'Approved Today', value: '23', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Flagged Content', value: '5', icon: AlertTriangle, color: 'text-red-600' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pending', label: 'Pending Approval' },
    { id: 'users', label: 'User Management' },
    { id: 'flagged', label: 'Flagged Content' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, moderate content, and oversee platform activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="social-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="social-card p-0 mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="social-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Post approved', user: 'john_doe', time: '2 minutes ago' },
                { action: 'User registered', user: 'sarah_smith', time: '15 minutes ago' },
                { action: 'Content flagged', user: 'mike_chen', time: '1 hour ago' },
                { action: 'Post rejected', user: 'alex_jones', time: '2 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-900">{activity.action}</span>
                  <span className="text-blue-600">@{activity.user}</span>
                  <span className="text-gray-500 ml-auto">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="social-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                <div className="font-medium text-blue-900">Review Pending Posts</div>
                <div className="text-sm text-blue-700">{pendingRequests.filter(r => r.status === 'pending').length} posts awaiting approval</div>
              </button>
              <button className="w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors duration-200">
                <div className="font-medium text-yellow-900">Check Flagged Content</div>
                <div className="text-sm text-yellow-700">5 items need review</div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                <div className="font-medium text-green-900">User Reports</div>
                <div className="text-sm text-green-700">3 new reports to investigate</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pending' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Pending Approval ({pendingRequests.filter(r => r.status === 'pending').length})
            </h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {pendingRequests.filter(req => req.status === 'pending').map((request) => (
              <div key={request.id} className="social-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">U</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium text-gray-900">User #{request.userId}</span>
                        <span className="text-gray-500 ml-2">
                          {new Date(request.submittedAt).toLocaleDateString()} at{' '}
                          {new Date(request.submittedAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-yellow-600" />
                        <span className="text-xs text-yellow-600">Pending</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-800 mb-3">{request.content}</p>
                    
                    {request.mediaUrl && (
                      <div className="mb-4">
                        {request.mediaType === 'image' ? (
                          <img
                            src={request.mediaUrl}
                            alt="User upload"
                            className="max-w-md rounded-lg object-cover"
                          />
                        ) : (
                          <div className="max-w-md bg-gray-100 rounded-lg p-4 flex items-center space-x-3">
                            <FileText className="w-8 h-8 text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">Video Content</p>
                              <p className="text-sm text-gray-500">Click to preview</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                      
                      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {pendingRequests.filter(r => r.status === 'pending').length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-500">No pending posts to review at the moment.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="social-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
          <p className="text-gray-500">User management features will be implemented here.</p>
        </div>
      )}

      {activeTab === 'flagged' && (
        <div className="social-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Flagged Content</h3>
          <p className="text-gray-500">Flagged content review will be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
