import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();
  const { user, isAllowed } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // Limpieza al desmontar
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (isAllowed !== true) {
        router.replace(isAllowed ? "/(protected)/home" : "/login");
        setIsLoading(false);
      }
    }
  }, [isMounted, isAllowed]);

  // Mostrar un spinner mientras se carga o redirige
  if (isLoading || !isMounted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Este contenido solo se mostrará brevemente antes de la redirección
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Usuario: {user ? user.email : "No autenticado"}</Text>
    </View>
  );
}