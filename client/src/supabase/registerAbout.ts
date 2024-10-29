import { Userinfo } from "@/types";
import { supabase } from "./supabaseClient";

export const updateAbout = async (userId: string, newAbout: string): Promise<Userinfo[] | null> => {
  
  const { data, error } = await supabase
    .from("user")
    .update({ about: newAbout })
    .eq("spotify_id", userId)
    .select(); 

  if (error) {
    return null;
  } else {
    return data as Userinfo[]; 
  }
};
