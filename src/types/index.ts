
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  video?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content?: string;
  audioUrl?: string;
  timestamp: Date;
  expiresAt?: Date;
  likes: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'post_approved' | 'post_rejected' | 'comment' | 'like' | 'follow';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface UploadRequest {
  id: string;
  userId: string;
  userType: 'user' | 'admin';
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}
