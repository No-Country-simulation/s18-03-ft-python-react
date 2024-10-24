import { supabase } from './supabaseClient';

export async function searchUsers(searchTerm: string) {
  console.log("Nombre ingresado:", searchTerm);

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .ilike('display_name', `%${searchTerm}%`);

  // Verificación de error
  if (error) {
    console.error("Error buscando usuarios:", error.message);
    return [];
  }

  // Mensaje para depuración
  if (data && data.length > 0) {
    console.log("Datos encontrados:", data);
  } else {
    console.log("No se encontraron datos para:", searchTerm);
  }

  return data;
}