'use client'

import useGetUserCompatibilityNumber from "@/hooks/useGetUserCompatibilityNumber";
import { Artist, Song } from '@/types';


interface Props {
  favSongs?: Song[];
  favArtists?: Artist[];
  favGenres?: string[];
}

export default function CompatibilityBar({ favGenres = [], favArtists = [], favSongs = [] }: Props) {
  const {compatibilityNumber} = useGetUserCompatibilityNumber(favGenres, favArtists, favSongs)

  console.log(favArtists)
  
  const percentage = (compatibilityNumber / 10) * 100;
  
  // Function to generate gradient colors based on number
  const getGradient = (num: number) => {
    const baseColor = '#1DB954'; // spotify-green
    const brighterColor = '#23fa6d'; // brighter green
    
    if (num <= 3) {
      return `linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 100%)`;
    } else if (num <= 6) {
      return `linear-gradient(90deg, ${baseColor} 0%, ${brighterColor} 120%)`;
    } else {
      return `linear-gradient(90deg, ${baseColor} 0%, ${brighterColor} 70%, #90ff90 120%)`;
    }
  };

  // Function to get text emphasis based on number
  const getCompatibilityText = (num: number) => {
    const style = {
      fontSize: '14px',
      fontWeight: 500,
      margin: 0,
      transition: 'all 300ms ease-in-out'
    };

    if (num >= 8) {
      return {
        ...style,
        fontSize: '16px',
        fontWeight: 700,
        textShadow: '0 0 10px rgba(29, 185, 84, 0.3)'
      };
    } else if (num >= 5) {
      return {
        ...style,
        fontWeight: 600
      };
    }
    return style;
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      textAlign: 'center',
      gap: '12px'
    }}>
      <p style={getCompatibilityText(compatibilityNumber)}>
        compatibility {compatibilityNumber >= 8 ? '✨' : ''}
      </p>
      
      <div style={{
        position: 'relative',
        height: '24px',
        backgroundColor: '#282828',
        borderRadius: '12px',
        overflow: 'hidden',
        maxWidth: '350px',
        margin: '0 auto',
        width: '100%',
        boxShadow: compatibilityNumber >= 8 ? '0 0 10px rgba(29, 185, 84, 0.3)' : 'none',
        transition: 'box-shadow 300ms ease-in-out'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          background: getGradient(compatibilityNumber),
          width: `${percentage}%`,
          transition: 'all 300ms ease-in-out',
          animation: compatibilityNumber >= 8 ? 'pulse 2s infinite' : 'none'
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
                borderLeft: i === 0 ? 'none' : `1px solid ${compatibilityNumber >= 8 ? '#1a1a1a' : '#282828'}`,
                transition: 'border-color 300ms ease-in-out'
              }}
            />
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.8; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}