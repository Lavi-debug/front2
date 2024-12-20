import { useEffect } from "react";
import video from './video.mp4'

const Keepscreenon = () => {
    useEffect(() => {
        // Create a video element
        const video = document.createElement("video");
    
        // Use a blank, silent video as the source
        video.src =
          {video};
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
    
        // Play the video
        video.play().catch((error) => {
          console.error("Failed to start video:", error);
        });
    
        // Append the video to the body but keep it hidden
        video.style.position = "absolute";
        video.style.top = "-9999px";
        video.style.left = "-9999px";
        document.body.appendChild(video);
    
        // Clean up on component unmount
        return () => {
          video.pause();
          document.body.removeChild(video);
        };
      }, []);
    
      return null; // This component doesn't render anything
    };

export default Keepscreenon
