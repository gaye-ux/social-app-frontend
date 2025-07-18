import React, { useState, useRef, useEffect } from 'react';
import { Mic, Play, Pause, Send, Trash2 } from 'lucide-react';

interface AudioComment {
  id: string;
  author: string;
  audioUrl: string;
  duration: number;
  timestamp: Date;
  expiresAt: Date;
}

interface AudioCommentsProps {
  postId: string;
}

const AudioComments: React.FC<AudioCommentsProps> = ({ postId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [comments, setComments] = useState<AudioComment[]>([]);
  const [textComment, setTextComment] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const userName = localStorage.getItem('userName') || 'Anonymous';

  useEffect(() => {
    setComments([
      {
        id: '1',
        author: 'Sarah J.',
        audioUrl: '',
        duration: 15,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        expiresAt: new Date(Date.now() + 47.5 * 60 * 60 * 1000)
      }
    ]);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
  };

  const discardRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const submitAudioComment = () => {
    if (!audioBlob) return;

    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        author: userName,
        audioUrl: audioUrl!,
        duration: recordingTime,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000)
      }
    ]);
    discardRecording();
  };

  const submitTextComment = () => {
    if (!textComment.trim()) return;
    console.log('Text comment submitted:', textComment);
    setTextComment('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeUntilExpiry = (expiresAt: Date) => {
    const hours = Math.floor((expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60));
    return `${hours}h remaining`;
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Comments</h4>

      {/* Text Comment Input */}
      <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0">
          {userName.charAt(0)}
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
          <input
            type="text"
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={submitTextComment}
            disabled={!textComment.trim()}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voice Recording */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 text-sm text-gray-700 gap-1">
          <span className="font-medium">Voice Comment</span>
          <span className="text-xs text-gray-500">Auto-deletes in 48 hours</span>
        </div>

        {!isRecording && !audioUrl && (
          <button
            onClick={startRecording}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <Mic className="w-4 h-4" />
            <span>Start Recording</span>
          </button>
        )}

        {isRecording && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600">Recording... {formatTime(recordingTime)}</span>
            </div>
            <button
              onClick={stopRecording}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            >
              Stop
            </button>
          </div>
        )}

        {audioUrl && (
          <div className="space-y-3 mt-3">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-2 sm:space-y-0">
              <audio ref={audioRef} src={audioUrl} className="w-full" controls />
              <span className="text-sm text-gray-600">{formatTime(recordingTime)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={submitAudioComment}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                <Send className="w-3 h-3" />
                <span>Send</span>
              </button>
              <button
                onClick={discardRecording}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                <Trash2 className="w-3 h-3" />
                <span>Discard</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Existing Audio Comments */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0">
              {comment.author.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                  <span className="text-xs text-red-500">{getTimeUntilExpiry(comment.expiresAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-blue-600 cursor-pointer" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-600 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <span className="text-xs text-gray-600">{formatTime(comment.duration)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioComments;
