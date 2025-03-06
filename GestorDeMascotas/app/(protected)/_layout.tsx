
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedLayout() {
  const { isAllowed, setIsAllowed } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("authToken"); // Verificar si el token existe
      if (token) {
        setIsAllowed(true); // Permitir acceso si el token existe
      } else {
        setIsAllowed(false); // Denegar acceso si no hay token
      }
      setIsLoading(false); // Finalizar la carga
    };

    checkToken();
  }, []);

  if (isLoading) {
    return null; // O puedes mostrar un componente de carga (spinner)
  }

  if (!isAllowed) {
    return <Redirect href="/login" />; // Redirigir al login si no está autenticado
  }

  return <Stack />; // Permitir acceso a las rutas protegidas
}