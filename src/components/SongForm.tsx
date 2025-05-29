import React, { useState, useEffect } from 'react';
import { Song, Sunday } from '../types';
import { Save, X } from 'lucide-react';
import { formatSunday } from '../utils/format';

interface SongFormProps {
  song?: Song;
  sunday?: Sunday;
  onSave: (songData: Omit<Song, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  onCancel: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ song, sunday, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    key: '',
    youtubeLink: '',
    sequence: '',
    sunday: sunday || 'first' as Sunday
  });

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        key: song.key || '',
        youtubeLink: song.youtubeLink,
        sequence: song.sequence,
        sunday: song.sunday
      });
    }
  }, [song]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const sundayOptions: Sunday[] = ['first', 'second', 'third', 'fourth', 'fifth'];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/50 via-blue-900/30 to-blue-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start sm:items-center justify-center p-2 sm:p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto my-4 sm:my-8 border border-gray-200 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"></div>
        
        <div className="p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-3 shadow-lg">
              <Save className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {song ? 'Edit Song' : 'Add New Song'}
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Song Title *
              </label>
              <input
                type="text"
                id="title"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 bg-gray-50 hover:bg-white"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Amazing Grace"
              />
            </div>

            <div>
              <label htmlFor="key" className="block text-sm font-semibold text-gray-700 mb-2">
                Key (Optional)
              </label>
              <input
                type="text"
                id="key"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 bg-gray-50 hover:bg-white"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="C, G, Bb, etc."
              />
            </div>

            <div>
              <label htmlFor="youtubeLink" className="block text-sm font-semibold text-gray-700 mb-2">
                YouTube Link *
              </label>
              <input
                type="url"
                id="youtubeLink"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 bg-gray-50 hover:bg-white"
                value={formData.youtubeLink}
                onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>

            <div>
              <label htmlFor="sequence" className="block text-sm font-semibold text-gray-700 mb-2">
                Song Sequence *
              </label>
              <textarea
                id="sequence"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none transition-all duration-200 bg-gray-50 hover:bg-white"
                value={formData.sequence}
                onChange={(e) => setFormData({ ...formData, sequence: e.target.value })}
                placeholder="Verse 1, Chorus, Verse 2, Bridge, Chorus"
              />
            </div>

            <div>
              <label htmlFor="sunday" className="block text-sm font-semibold text-gray-700 mb-2">
                Sunday *
              </label>
              <select
                id="sunday"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 bg-gray-50 hover:bg-white"
                value={formData.sunday}
                onChange={(e) => setFormData({ ...formData, sunday: e.target.value as Sunday })}
              >
                {sundayOptions.map((day) => (
                  <option key={day} value={day}>
                    {formatSunday(day)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Song
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-center text-sm sm:text-base font-semibold border border-gray-300 transition-all duration-200 transform hover:scale-105"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SongForm; 