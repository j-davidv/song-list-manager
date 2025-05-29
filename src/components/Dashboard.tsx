import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  orderBy,
  where,
  getDocs,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Song, Sunday, SundayLeader } from '../types';
import { LogOut } from 'lucide-react';
import SundaySection from './SundaySection';
import SongForm from './SongForm';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [sundayLeaders, setSundayLeaders] = useState<Record<Sunday, SundayLeader | null>>({
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | undefined>();
  const [selectedSunday, setSelectedSunday] = useState<Sunday | undefined>();

  useEffect(() => {
    // Set up real-time listener for songs
    const songsQuery = query(collection(db, 'songs'), orderBy('createdAt', 'desc'));
    const unsubscribeSongs = onSnapshot(songsQuery, (snapshot) => {
      const songsData: Song[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        songsData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Song);
      });
      setSongs(songsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching songs:', error);
      toast.error('Error loading songs');
      setLoading(false);
    });

    // Set up real-time listener for Sunday leaders
    const leadersQuery = query(collection(db, 'sundayLeaders'));
    const unsubscribeLeaders = onSnapshot(leadersQuery, (snapshot) => {
      const leadersData: Record<Sunday, SundayLeader | null> = {
        first: null,
        second: null,
        third: null,
        fourth: null,
        fifth: null
      };
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const leader: SundayLeader = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as SundayLeader;
        leadersData[leader.sunday] = leader;
      });
      
      setSundayLeaders(leadersData);
    }, (error) => {
      console.error('Error fetching Sunday leaders:', error);
      toast.error('Error loading Sunday leaders');
    });

    return () => {
      unsubscribeSongs();
      unsubscribeLeaders();
    };
  }, []);

  const handleAddSong = (sunday?: Sunday) => {
    setSelectedSunday(sunday);
    setEditingSong(undefined);
    setShowForm(true);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setSelectedSunday(undefined);
    setShowForm(true);
  };

  const handleSaveSong = async (songData: Omit<Song, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    try {
      if (editingSong?.id) {
        // Update existing song
        await updateDoc(doc(db, 'songs', editingSong.id), {
          ...songData,
          updatedAt: serverTimestamp()
        });
        toast.success('Song updated successfully!');
      } else {
        // Add new song
        await addDoc(collection(db, 'songs'), {
          ...songData,
          createdBy: currentUser?.uid || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        toast.success('Song added successfully!');
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error saving song:', error);
      toast.error('Error saving song');
    }
  };

  const handleUpdateSundayLeader = async (sunday: Sunday, leaderName: string) => {
    try {
      const existingLeader = sundayLeaders[sunday];
      
      if (existingLeader?.id) {
        // Update existing leader
        await updateDoc(doc(db, 'sundayLeaders', existingLeader.id), {
          leaderName,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new leader document
        await addDoc(collection(db, 'sundayLeaders'), {
          sunday,
          leaderName,
          createdBy: currentUser?.uid || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      toast.success('Song leader updated successfully!');
    } catch (error) {
      console.error('Error updating Sunday leader:', error);
      toast.error('Error updating song leader');
    }
  };

  const handleDeleteSong = async (songId: string) => {
    if (!window.confirm('Are you sure you want to delete this song?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'songs', songId));
      toast.success('Song deleted successfully!');
    } catch (error) {
      console.error('Error deleting song:', error);
      toast.error('Error deleting song');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  // Group songs by Sunday
  const songsBySunday = songs.reduce((acc, song) => {
    if (!acc[song.sunday]) {
      acc[song.sunday] = [];
    }
    acc[song.sunday].push(song);
    return acc;
  }, {} as Record<Sunday, Song[]>);

  // Get all Sundays in order
  const sundays: Sunday[] = ['first', 'second', 'third', 'fourth', 'fifth'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading songs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg sticky top-0 z-40 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-3 sm:gap-4">
            <div className="flex items-center">
              <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm mr-2 sm:mr-3">
                <img 
                  src="/church-logo.png" 
                  alt="Beloved Community Church Logo" 
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-sm">Song Lineup Manager</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {currentUser && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm text-blue-100 truncate max-w-[200px]">
                      {currentUser.email}
                    </span>
                    {currentUser.isAdmin && (
                      <span className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full whitespace-nowrap font-medium shadow-sm">
                        Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-xs sm:text-sm text-blue-100 hover:text-white whitespace-nowrap transition-colors duration-200 bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm"
                  >
                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Logout</span>
                    <span className="sm:hidden">Exit</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sundays.map((sunday) => (
          <SundaySection
            key={sunday}
            sunday={sunday}
            songs={songsBySunday[sunday] || []}
            sundayLeader={sundayLeaders[sunday]}
            isAdmin={currentUser?.isAdmin || false}
            onAddSong={() => handleAddSong(sunday)}
            onEditSong={handleEditSong}
            onDeleteSong={handleDeleteSong}
            onUpdateLeader={(leaderName: string) => handleUpdateSundayLeader(sunday, leaderName)}
          />
        ))}
      </main>

      {/* Song Form Modal */}
      {showForm && (
        <SongForm
          song={editingSong}
          sunday={selectedSunday}
          onSave={handleSaveSong}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard; 