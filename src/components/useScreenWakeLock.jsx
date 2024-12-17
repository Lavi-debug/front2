import { useEffect } from 'react';

const useScreenWakeLock = () => {
  useEffect(() => {
    let wakeLock = null;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
          wakeLock.addEventListener('release', () => {
            console.log('Wake lock released');
          });
        }
      } catch (err) {
        console.error('Failed to request wake lock:', err);
      }
    };

    // Request wake lock when the user interacts with the page
    const handleUserInteraction = () => {
      if (!wakeLock) {
        requestWakeLock();
      }
    };

    // Add event listeners for user interaction
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, []);
};

export default useScreenWakeLock;
