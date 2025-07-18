'use client';

import { useEffect, useRef, useState } from 'react';

export default function BoomerangVideo() {
  const forwardRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);
  const [playingForward, setPlayingForward] = useState(true);

  useEffect(() => {
    const forward = forwardRef.current;
    const reverse = reverseRef.current;

    if (!forward || !reverse) return;

    const handleForwardEnded = () => {
      setPlayingForward(false);
      reverse.currentTime = 0;
      reverse.play();
    };

    const handleReverseEnded = () => {
      setPlayingForward(true);
      forward.currentTime = 0;
      forward.play();
    };

    // Attach event listeners
    forward.addEventListener('ended', handleForwardEnded);
    reverse.addEventListener('ended', handleReverseEnded);

    // Start playing forward video
    forward.play();

    return () => {
      forward.removeEventListener('ended', handleForwardEnded);
      reverse.removeEventListener('ended', handleReverseEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={forwardRef}
        src="/party.mp4"
        className={`w-full h-full object-cover absolute transition-opacity duration-200 ${playingForward ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
      />
      <video
        ref={reverseRef}
        src="/party-reverse.mp4"
        className={`w-full h-full object-cover absolute transition-opacity duration-200 ${!playingForward ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
      />
    </div>
  );
}
