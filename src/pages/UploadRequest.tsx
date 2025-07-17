import React, { useState } from 'react';
import { Upload, Image, Video, FileText, Send, CheckCircle, Clock } from 'lucide-react';
import { useCreatePostMutation, UploadRequest } from '@/generated/graphql';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/constants/Constants';

const UploadRequestPage = () => {
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState<UploadRequest[]>([]);
  const [createPost] = useCreatePostMutation();

  const userId = Cookies.get("userId");
  const userName = Cookies.get("username");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    let mediaUrls: string[] = [];

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        if (selectedFile.size > 10 * 1024 * 1024) {    //TO BE IMPLEMENTED LATER TO TAKE FIRST 10MB
          alert("File is too big. Please upload a file smaller");
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData
        });

        if (!res.ok) throw new Error('Upload failed');

        const data = await res.json();
        if (data?.url) {
          mediaUrls.push(data.url);
        }
      }

      const result = await createPost({
        variables: {
          userId: userId!, 
          caption: content.trim(),
          mediaUrls
        }
      });

      if (result.data?.createPost) {
        const newRequest: UploadRequest = {
          __typename: 'UploadRequest',
          id: result.data.createPost.id,
          requestedAt: new Date().toISOString(),
          status: result.data.createPost.status || 'pending',
          user: {
            id: userId!,
            username: userName!
          } as any
        };

        setRequests([newRequest, ...requests]);
        setContent('');
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center space-x-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            <span>Pending Review</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-sm">
            <FileText className="w-4 h-4" />
            <span>Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Upload</h1>
        <p className="text-gray-600">Submit your content for admin approval before it is approve</p>
      </div>

      <div className="social-card p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What would you like to share?"
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Media (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />

              {!previewUrl ? (
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-1">Images and videos up to 10MB</p>
                </label>
              ) : (
                <div className="space-y-4">
                  {selectedFile?.type.startsWith('image/') ? (
                    <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  ) : (
                    <video src={previewUrl} className="max-h-64 mx-auto rounded-lg" controls />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove file
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Content Review Process</p>
                <p>Your post will be reviewed by our admin team before going live. This typically takes 2-24 hours. You'll receive a notification once it's approved or if any changes are needed.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="flex items-center space-x-2 social-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isSubmitting ? 'Submitting...' : 'Submit for Review'}</span>
          </button>
        </form>
      </div>

      <div className="social-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Submissions</h2>

        {requests.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No submissions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-gray-900 mb-2">Post ID: {request.id}</p>
                    <p className="text-sm text-gray-500">
                      Requested at {new Date(request.requestedAt).toLocaleString()}
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadRequestPage;
