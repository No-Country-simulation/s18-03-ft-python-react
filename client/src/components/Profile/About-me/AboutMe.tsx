import { updateAbout } from "@/supabase/registerAbout";
import { Userinfo } from "@/types";
import React, { useState, useEffect } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

type Props = {
  isOwnProfile: boolean;
  user: Userinfo | null;
};

const AboutMe = ({ isOwnProfile, user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState(user?.about || "");

  useEffect(() => {
    if (!isEditing) {
      setAboutMe(user?.about || "");
    }
  }, [isEditing, user?.about]);

  const handleSave = async () => {
    try {
      if (isEditing && user) {
        console.log("Guardando about", aboutMe);
        const result = await updateAbout(user?.spotify_id, aboutMe);
  
        if (result && result.length > 0) {
          setAboutMe(result[0].about); 
          window.location.reload();
        } else {
          console.log("Error al guardar about");
        }
      }
    } catch (error) {
      return error;
    } finally {
      setIsEditing(!isEditing);
    }
  };
  
  

  

  const createdAt = user?.created_at ? new Date(user.created_at) : null;
  const country = user?.country;

  const UserAbout = aboutMe || "Este usuario no tiene contenido en el about";

  return (
    <div className="h-screen">
      <h2 className="text-3xl font-bold text-white font-sans text-center">
        About {user?.display_name}
      </h2>

      <div className="flex flex-col gap-4 px-8 py-4 mt-5">
        <div className="flex gap-3 text-center items-center">
          <FaCalendarCheck className="text-white font-bold" />
          {createdAt ? (
            <p className="font-sans text-white font-bold">
              Cuenta creada el:{" "}
              {`${createdAt.getDate()}/${
                createdAt.getMonth() + 1
              }/${createdAt.getFullYear()}`}
            </p>
          ) : (
            <p>Fecha de creación no disponible</p>
          )}
        </div>

        <div className="flex gap-3 text-center items-center">
          <FiMapPin className="text-white font-bold" />
          <p className="font-sans text-white font-bold">País: {country}</p>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start gap-4 w-full mt-5 px-8 py-4">
        <h2 className="text-3xl flex font-bold text-white font-sans text-start">
          Self Introduction
        </h2>

        {isEditing ? (
          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="flex w-[75%] h-40 text-center rounded-lg border-2 border-[#63707F] bg-spotify-dark-gray px-4 py-2 text-sm text-white"
          />
        ) : (
          <p className="flex w-[75%] h-40 text-center rounded-lg bg-spotify-dark-gray px-4 py-2 text-sm text-white">
            {UserAbout}
          </p>
        )}

        {isOwnProfile && (
          <button
            onClick={handleSave}
            className="bg-spotify-green text-white px-4 py-2 flex rounded-lg shadow-md shadow-spotify-green/50"
          >
            {isEditing ? "Save" : "Edit about"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AboutMe;
