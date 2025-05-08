import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-playlist';
import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
    id: string;
    src: string | any[];
    title: string;
    intro_start_time: string;
    intro_end_time: string;
    next_episode_offset?: string;
}

const timeToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}


export const VideoPlayer: React.FC<VideoPlayerProps> = ({ id = "0", src, title, intro_start_time, intro_end_time, next_episode_offset = import.meta.env.VITE_DEFAULT_NEXT_EPISODE_OFFSET }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);  // Changed from videojs.Player
    const customButtonRef = useRef<HTMLButtonElement | null>(null);
    const introStartTimeSeconds = timeToSeconds(intro_start_time);
    const introEndTimeSeconds = timeToSeconds(intro_end_time);

    useEffect(() => {
        if (videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                fluid: true,
            });
            // Convert single source to array if needed
            const sources = Array.isArray(src) ? src : [{
                id: 0,
                src: src
            }];
            console.log(src)
            // Create playlist items
            const playlist = sources.map(source => ({
                id: source.id,
                name: title,
                sources: [{
                    src: source.src,
                    type: 'application/x-mpegURL',
                }],
                poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
            }));

            // Initialize playlist
            playerRef.current.playlist(playlist);
            playerRef.current.playlist.currentItem(sources.findIndex(x => x.id === parseInt(id)));

            const createButton = (text: string, onClick: () => void) => {
                const button = document.createElement('button');
                button.textContent = text;
                button.className = 'vjs-skip-intro';
                button.addEventListener('click', onClick);
                return button;
            };

            playerRef.current.on('timeupdate', function () {
                const duration = playerRef.current.duration();
                const currentTime = playerRef.current.currentTime();
                const nextEpisodeDelay = Math.floor(playerRef.current.duration()) - parseInt(next_episode_offset);
                // Handle Skip Intro button
                if (currentTime >= introStartTimeSeconds && currentTime <= introEndTimeSeconds) {
                    if (!customButtonRef.current) {
                        const skipButton = createButton('Skip Intro', () => {
                            playerRef.current.currentTime(introEndTimeSeconds);
                        });
                        setTimeout(() => {
                            skipButton.style.display = 'none';
                        }, 10000);
                        playerRef.current.el().appendChild(skipButton);
                        customButtonRef.current = skipButton;
                    }
                }

                // Handle Next Episode button
                if (Math.floor(currentTime) === nextEpisodeDelay) {
                    if (!customButtonRef.current) {
                        const nextButton = createButton('Next Episode', () => {
                            playerRef.current.el().removeChild(customButtonRef.current);
                            playerRef.current.playlist.next();
                        });
                        setTimeout(() => {
                            nextButton.style.display = 'none';
                        }, 10000);
                        playerRef.current.el().appendChild(nextButton);
                        customButtonRef.current = nextButton;
                    }
                }

                // Remove button when intro is skipped or video ends
                if (currentTime >= introEndTimeSeconds || currentTime >= duration) {
                    if (customButtonRef.current) {
                        playerRef.current.el().removeChild(customButtonRef.current);
                        customButtonRef.current = null;
                    }
                }
            });

            playerRef.current.on('useractive', function () {
                if (customButtonRef?.current &&
                    introStartTimeSeconds <= playerRef.current.currentTime() &&
                    introEndTimeSeconds >= playerRef.current.currentTime() &&
                    customButtonRef.current.style.display === 'none'
                ) {
                    customButtonRef.current.style.display = 'block';
                }
            });

            playerRef.current.on('userinactive', function () {
                if (customButtonRef?.current &&
                    introStartTimeSeconds <= playerRef.current.currentTime() &&
                    introEndTimeSeconds >= playerRef.current.currentTime() &&
                    customButtonRef.current.style.display === 'block'
                ) {
                    customButtonRef.current.style.display = 'none';
                }
            });

            playerRef.current.on('ended', function () {
                if (playlist.length > 0) {
                    playerRef.current.playlist.next()
                }
            })
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