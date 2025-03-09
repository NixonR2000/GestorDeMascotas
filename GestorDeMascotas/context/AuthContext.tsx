import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";

type User = { email: string } | null;

const AuthContext = createContext<{
  user: User;
  isAllowed: boolean;
  setIsAllowed: (value: boolean) => void;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  // Verificar el token al montar el componente
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsAllowed(true); // Permitir acceso si el token existe
      } else {
        setIsAllowed(false); // Denegar acceso si no hay token
      }
    };

    checkToken();
  }, []);

  const login = async (email: string) => {
    const isValidEmail = email.endsWith("@gmail.com");

    if (isValidEmail) {
      const token = Math.random().toString(36).substring(2); // Simular un token
      await AsyncStorage.setItem("authToken", token); // Guardar el token
      setUser({ email });
      setIsAllowed(true);
    } else {
      setUser(null);
      setIsAllowed(false);
      alert("Solo correos @gmail.com pueden ingresar");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken"); // Eliminar el token al cerrar sesión
    setUser(null);
    setIsAllowed(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAllowed, setIsAllowed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};