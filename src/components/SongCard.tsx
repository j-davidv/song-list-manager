import React from 'react';
import { Song } from '../types';
import { Music, Key, Youtube, Edit2, Trash2, List } from 'lucide-react';
import { extractYouTubeID } from '../utils/format';

interface SongCardProps {
  song: Song;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, isAdmin, onEdit, onDelete }) => {
  const youtubeId = extractYouTubeID(song.youtubeLink);
  const thumbnailUrl = youtubeId 
    ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
    : null;

  const handleYouTubeClick = () => {
    window.open(song.youtubeLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
      {thumbnailUrl && (
        <div 
          className="w-full h-36 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300 cursor-pointer relative group overflow-hidden"
          onClick={handleYouTubeClick}
        >
          <img 
            src={thumbnailUrl} 
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-red-600 p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Youtube className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 sm:p-5">
        <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between mb-3 gap-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center min-w-0 group">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-3 shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
            </div>
            <span className="truncate">{song.title}</span>
          </h3>
          {song.key && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 flex-shrink-0 shadow-sm">
              <Key className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
              {song.key}
            </span>
          )}
        </div>
        
        <div className="mt-3 sm:mt-4">
          <div className="flex items-start">
            <div className="p-1 bg-gray-100 rounded-lg mr-3 mt-0.5">
              <List className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-wrap break-words leading-relaxed">{song.sequence}</p>
          </div>
        </div>

        {!thumbnailUrl && (
          <button
            onClick={handleYouTubeClick}
            className="mt-4 w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Youtube className="w-4 h-4 mr-2" />
            <span className="hidden xs:inline">Watch on YouTube</span>
            <span className="xs:hidden">YouTube</span>
          </button>
        )}

        {isAdmin && (
          <div className="mt-4 sm:mt-5 flex flex-col xs:flex-row gap-2 sm:gap-3">
            <button
              onClick={onEdit}
              className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 text-xs sm:text-sm flex-1 font-medium border border-blue-200 shadow-sm hover:shadow-md"
            >
              <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 rounded-lg hover:from-red-100 hover:to-pink-100 transition-all duration-200 text-xs sm:text-sm flex-1 font-medium border border-red-200 shadow-sm hover:shadow-md"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongCard; 