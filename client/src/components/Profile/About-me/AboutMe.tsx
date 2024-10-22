import React, { useState } from 'react';

const AboutMe = () => {
  const [isEditing, setIsEditing] = useState(false);  
  const [aboutMe, setAboutMe] = useState('');         

  const handleSave = () => {
    setIsEditing(!isEditing); 
  };

  return (
    <div className='mb-20'>
      <h2 className="text-3xl font-bold text-white font-sans text-center">About Me</h2>
      <div className="flex flex-col items-center justify-center gap-4 w-full mt-5">
      
        {isEditing ? (
          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="flex w-[75%] h-40 text-center rounded-lg border-2 border-[#63707F] bg-spotify-dark-gray px-4 py-2 text-sm text-white"
          />
        ) : (
          <p className="flex w-[75%] h-40 text-center rounded-lg border-2 border-[#63707F] bg-spotify-dark-gray px-4 py-2 text-sm text-white">
            {aboutMe || 'Cuenta un poco sobre ti...'}
          </p>
        )}
       
        <button onClick={handleSave} className="bg-spotify-green text-white px-4 py-2 rounded-lg">
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default AboutMe;
