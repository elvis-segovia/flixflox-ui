import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-playlist';
import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
    id: string;
    src: string | any[];
    title: string;
}

const timeToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}


export const VideoPlayer: React.FC<VideoPlayerProps> = ({ id = "0", src, title }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);  // Changed from videojs.Player
    const skipButtonRef = useRef<HTMLButtonElement | null>(null);
    const nextButtonRef = useRef<HTMLButtonElement | null>(null);


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
            // Create playlist items
            const playlist = sources.map(source => ({
                id: source.id,
                name: title,
                sources: [{
                    src: source.src,
                    type: 'application/x-mpegURL',
                }],
                intro_start_time: source.intro_start_time,
                intro_end_time: source.intro_end_time,
                next_episode_time: source.next_episode_time,
                poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
            }));
            //current video
            const currentVideo = sources.findIndex(x => x.id === parseInt(id));
            const introStartTimeSeconds = timeToSeconds(sources[currentVideo]?.intro_start_time);
            const introEndTimeSeconds = timeToSeconds(sources[currentVideo]?.intro_end_time);
            const nextEpisodeOffset = timeToSeconds(sources[currentVideo]?.intro_end_time);
            // Initialize playlist
            playerRef.current.playlist(playlist);
            playerRef.current.playlist.currentItem(currentVideo);

            const createButton = (text: string, onClick: () => void) => {
                const button = document.createElement('button');
                button.textContent = text;
                button.className = 'vjs-skip-intro';
                button.addEventListener('click', onClick);
                return button;
            };

            playerRef.current.on('timeupdate', function () {
                const currentTime = playerRef.current.currentTime();
                const nextEpisodeDelay = Math.floor(playerRef.current.duration()) - nextEpisodeOffset;

                // Handle Skip Intro button
                if (currentTime >= introStartTimeSeconds && currentTime <= introEndTimeSeconds) {
                    if (!skipButtonRef.current) {
                        const skipButton = createButton('Skip Intro', () => {
                            playerRef.current.currentTime(introEndTimeSeconds);
                        });
                        setTimeout(() => {
                            skipButton.style.display = 'none';
                        }, 10000);
                        playerRef.current.el().appendChild(skipButton);
                        skipButtonRef.current = skipButton;
                    }
                }

                // Handle Next Episode button
                if (Math.floor(currentTime) === nextEpisodeDelay) {
                    if (!nextButtonRef.current) {
                        const nextButton = createButton('Next Episode', () => {
                            playerRef.current.playlist.next();
                        });
                        setTimeout(() => {
                            nextButton.style.display = 'none';
                        }, 10000);
                        playerRef.current.el().appendChild(nextButton);
                        nextButtonRef.current = nextButton;
                    }
                }

                // Remove button when intro is skipped or video ends
                if (skipButtonRef.current && (currentTime >= introEndTimeSeconds || currentTime >= playerRef.current.duration())) {
                    playerRef.current.el().removeChild(skipButtonRef.current);
                    skipButtonRef.current = null;
                }

                if (nextButtonRef.current && (currentTime <= nextEpisodeDelay || currentTime >= playerRef.current.duration())) {
                    playerRef.current.el().removeChild(nextButtonRef.current);
                    nextButtonRef.current = null;
                }
            });

            playerRef.current.on('useractive', function () {
                if (nextButtonRef?.current &&
                    introStartTimeSeconds <= playerRef.current.currentTime() &&
                    introEndTimeSeconds >= playerRef.current.currentTime() &&
                    nextButtonRef.current.style.display === 'none'
                ) {
                    nextButtonRef.current.style.display = 'block';
                }
            });

            playerRef.current.on('userinactive', function () {
                if (nextButtonRef?.current &&
                    introStartTimeSeconds <= playerRef.current.currentTime() &&
                    introEndTimeSeconds >= playerRef.current.currentTime() &&
                    nextButtonRef.current.style.display === 'block'
                ) {
                    nextButtonRef.current.style.display = 'none';
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