import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-playlist';
import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
    src: string | string[];
    title: string;
    intro_start_time: string;
    intro_end_time: string;
}

const timeToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}


export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, intro_start_time, intro_end_time }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);  // Changed from videojs.Player
    const skipButtonRef = useRef<HTMLButtonElement | null>(null);
    const intro_start_time_seconds = timeToSeconds(intro_start_time);
    const intro_end_time_seconds = timeToSeconds(intro_end_time);

    useEffect(() => {
        if (videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                fluid: true,
            });

            // Convert single source to array if needed
            const sources = Array.isArray(src) ? src : [src];

            // Create playlist items
            const playlist = sources.map(source => ({
                name: title,
                sources: [{
                    src: source,
                    type: 'application/x-mpegURL',
                }],
                poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
            }));

            // Initialize playlist
            playerRef.current.playlist(playlist);

            playerRef.current.on('timeupdate', function () {
                if (playerRef.current.currentTime() >= intro_start_time_seconds && playerRef.current.currentTime() <= intro_end_time_seconds) {
                    if (!skipButtonRef.current) {
                        const skipButton = document.createElement('button');
                        skipButton.textContent = 'Skip Intro';
                        skipButton.className = 'vjs-skip-intro';
                        skipButton.addEventListener('click', () => {
                            playerRef.current.currentTime(intro_end_time_seconds);
                        });
                        setTimeout(() => {
                            skipButton.style.display = 'none';
                        }, 10000);
                        // Append to player's element
                        playerRef.current.el().appendChild(skipButton);
                        skipButtonRef.current = skipButton;
                    }
                }
                if (playerRef.current.currentTime() >= intro_end_time_seconds) {
                    playerRef.current.el().removeChild(skipButtonRef.current);
                }
            });

            playerRef.current.on('useractive', function () {
                if (skipButtonRef?.current &&
                    intro_start_time_seconds <= playerRef.current.currentTime() &&
                    intro_end_time_seconds >= playerRef.current.currentTime() &&
                    skipButtonRef.current.style.display === 'none'
                ) {
                    skipButtonRef.current.style.display = 'block';
                }
            });

            playerRef.current.on('userinactive', function () {
                if (skipButtonRef?.current &&
                    intro_start_time_seconds <= playerRef.current.currentTime() &&
                    intro_end_time_seconds >= playerRef.current.currentTime() &&
                    skipButtonRef.current.style.display === 'block'
                ) {
                    skipButtonRef.current.style.display = 'none';
                }
            });
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