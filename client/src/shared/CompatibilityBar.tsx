'use client'

import { useState } from "react";

interface Props {
  favSongs: string[];
  favArtists: string[];
  favGenres: string[];
}

export default function CompatibilityBar({ favGenres, favArtists, favSongs }: Props) {
  const [num, setNum] = useState<number>(9);
  
  const percentage = (num / 10) * 100;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      textAlign: 'center',
      gap: '12px'
    }}>
      <p style={{
        fontSize: '14px',
        fontWeight: 500,
        margin: 0
      }}>
        compatibility
      </p>
      
      <div style={{
        position: 'relative',
        height: '24px',
        backgroundColor: '#282828', // spotify-dark-gray
        borderRadius: '12px',
        overflow: 'hidden',
        maxWidth: '200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: '#1DB954', // spotify-green
          width: `${percentage}%`,
          transition: 'width 300ms ease-in-out'
        }} />
        
        {/* Grid marks */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex'
        }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              style={{
                flex: 1,
                borderLeft: i === 0 ? 'none' : '1px solid #282828'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}