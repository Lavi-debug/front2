import { useEffect } from 'react';

const useScreenWakeLock = () => {
    useEffect(() => {
        let intervalId = null;
    
        // Function to simulate a touch event on the screen
        const simulateTouchEvent = () => {
          // Create a synthetic touch event
          const touchEvent = new Event('touchstart', { bubbles: true });
    
          // Dispatch the touch event to the document body
          document.body.dispatchEvent(touchEvent);
        };
    
        // Set interval to simulate a touch event every 5 seconds
        intervalId = setInterval(simulateTouchEvent, 5000); // 5 seconds
    
        // Cleanup the interval when the component is unmounted
        return () => {
          clearInterval(intervalId);
        };
      }, []);

};

export default useScreenWakeLock;
