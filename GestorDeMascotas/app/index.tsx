import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Index() {
  const router = useRouter();
  const { user, isAllowed } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.replace(isAllowed ? "/home" : "/login"); // Redirigir según el estado de autenticación
    }
  }, [isMounted, isAllowed]);

  if (!isMounted) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    ); // Mostrar un mensaje de carga o un spinner
  }

  return (
    <View>
      <Text>Usuario: {user ? user.email : "No autenticado"}</Text>
    </View>
  );
}