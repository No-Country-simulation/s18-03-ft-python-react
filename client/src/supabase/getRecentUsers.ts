import { supabase } from "./supabaseClient";

export const getRecentUsers = async (numberToGet: number, userId: string) => {
  try {
    if (userId) {
      const { data, error } = await supabase
        .from("user")
        .select("*, user_top_artist(*), user_top_songs(*)")
        .not("id", "eq", userId)
        .order("created_at", { ascending: false })
        .limit(numberToGet);

      if (error) {
        return {
          error: `error when getting ${numberToGet} users`,
          errorDetails: error,
        };
      }

      return data;
    } else {
        const { data, error } = await supabase
        .from("user")
        .select("*, user_top_artist(*), user_top_songs(*)")
        .order("created_at", { ascending: false })
        .limit(numberToGet);

      if (error) {
        return {
          error: `error when getting ${numberToGet} users`,
          errorDetails: error,
        };
      }

      return data;
    }
  } catch (error) {
    return {
      error: "error when getting users from database",
      errorDetails: error,
    };
  }
};
