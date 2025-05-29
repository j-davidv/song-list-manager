import { Sunday } from '../types';

export const formatSunday = (sunday: Sunday): string => {
  const sundayMap: Record<Sunday, string> = {
    first: 'First Sunday',
    second: 'Second Sunday',
    third: 'Third Sunday',
    fourth: 'Fourth Sunday',
    fifth: 'Fifth Sunday'
  };
  return sundayMap[sunday];
};

export const getSundayOrder = (sunday: Sunday): number => {
  const orderMap: Record<Sunday, number> = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5
  };
  return orderMap[sunday];
};

export const extractYouTubeID = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}; 