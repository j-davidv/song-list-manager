import React, { useState, useEffect } from 'react';
import { Sunday, Song, SundayLeader } from '../types';
import { formatSunday } from '../utils/format';
import { ChevronDown, ChevronUp, Plus, Calendar, User, Edit2, Check, X } from 'lucide-react';
import SongCard from './SongCard';
import { Music } from 'lucide-react';

interface SundaySectionProps {
  sunday: Sunday;
  songs: Song[];
  sundayLeader: SundayLeader | null;
  isAdmin: boolean;
  onAddSong: () => void;
  onEditSong: (song: Song) => void;
  onDeleteSong: (songId: string) => void;
  onUpdateLeader: (leaderName: string) => void;
}

const SundaySection: React.FC<SundaySectionProps> = ({ 
  sunday, 
  songs, 
  sundayLeader,
  isAdmin, 
  onAddSong, 
  onEditSong, 
  onDeleteSong,
  onUpdateLeader
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingLeader, setIsEditingLeader] = useState(false);
  const [leaderName, setLeaderName] = useState(sundayLeader?.leaderName || '');

  // Update local state when sundayLeader prop changes
  useEffect(() => {
    setLeaderName(sundayLeader?.leaderName || '');
  }, [sundayLeader?.leaderName]);

  const handleSaveLeader = () => {
    if (leaderName.trim()) {
      onUpdateLeader(leaderName.trim());
      setIsEditingLeader(false);
    }
  };

  const handleCancelEdit = () => {
    setLeaderName(sundayLeader?.leaderName || '');
    setIsEditingLeader(false);
  };

  const handleEditLeader = () => {
    setLeaderName(sundayLeader?.leaderName || '');
    setIsEditingLeader(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 border border-gray-100 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-t-xl"
      >
        <div className="flex items-center min-w-0 flex-1">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-3 shadow-sm">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
            {formatSunday(sunday)}
          </h2>
          <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
            {songs.length} {songs.length === 1 ? 'song' : 'songs'}
          </span>
        </div>
        <div className="p-1 rounded-full hover:bg-white/50 transition-colors">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 ml-2" />
          ) : (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 ml-2" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 sm:p-6 pt-2 bg-gradient-to-b from-white to-gray-50/50">
          {/* Song Leader Section */}
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
              <div className="flex items-center flex-1">
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-2 shadow-sm">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                </div>
                <span className="text-sm font-semibold text-gray-800 mr-2">Song Leader:</span>
                
                {/* Display current leader name inline */}
                {sundayLeader?.leaderName ? (
                  <span className="text-sm text-gray-900 font-semibold bg-white px-3 py-1.5 rounded-lg shadow-sm border border-blue-100">
                    {sundayLeader.leaderName}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500 italic">
                    {isAdmin ? 'Click edit to set song leader' : 'No song leader assigned'}
                  </span>
                )}
              </div>
              
              {isAdmin && !isEditingLeader && (
                <button
                  onClick={handleEditLeader}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white/50 rounded-lg transition-all duration-200 self-start xs:self-auto"
                  title="Edit song leader"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {isEditingLeader && (
              <div className="mt-3 flex flex-col xs:flex-row xs:items-center gap-2">
                <input
                  type="text"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  placeholder="Enter song leader name"
                  className="flex-1 px-4 py-2.5 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveLeader();
                    } else if (e.key === 'Escape') {
                      handleCancelEdit();
                    }
                  }}
                />
                <div className="flex gap-2 xs:gap-1">
                  <button
                    onClick={handleSaveLeader}
                    className="flex-1 xs:flex-none p-2.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 shadow-sm"
                    title="Save"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 xs:flex-none p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 shadow-sm"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Songs Section */}
          {songs.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-200">
              <div className="p-3 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Music className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-6 text-sm sm:text-base font-medium">No songs added for this Sunday yet.</p>
              {isAdmin && (
                <button
                  onClick={onAddSong}
                  className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Add First Song
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {songs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isAdmin={isAdmin}
                    onEdit={() => onEditSong(song)}
                    onDelete={() => song.id && onDeleteSong(song.id)}
                  />
                ))}
              </div>
              {isAdmin && (
                <div className="mt-6 sm:mt-8 text-center">
                  <button
                    onClick={onAddSong}
                    className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Add Another Song
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SundaySection; 