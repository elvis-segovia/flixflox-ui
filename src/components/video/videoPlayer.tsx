import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
    src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);  // Changed from videojs.Player
    const skipButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleSkipIntro = () => {
        if (playerRef.current) {
            playerRef.current.currentTime(30); // Skip to 30 seconds
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                fluid: true,
                sources: [{
                    src: src,
                    type: 'application/x-mpegURL'
                }]
            });

            // Create a plain HTML button
            const skipButton = document.createElement('button');
            skipButton.textContent = 'Skip Intro';
            skipButton.className = 'vjs-skip-intro';
            
            // Add click handler
            skipButton.addEventListener('click', handleSkipIntro);
            
            // Append to player's element
            playerRef.current.el().appendChild(skipButton);
            skipButtonRef.current = skipButton;

        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, [src]);

    return (
        <div style={{ position: 'relative' }}>
            <video
                ref={videoRef}
                className="video-js vjs-default-skin"
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    )
}