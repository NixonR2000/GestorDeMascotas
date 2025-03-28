import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

interface MascotaCardProps {
  nombre: string;
  edad: string;
  raza: string;
  peso: string;
  estatura: string;
}

export default function MascotaCard({ nombre, edad, raza, peso, estatura }: MascotaCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{nombre}</Text>
      <View style={styles.infoRow}>
        <Ionicons name="paw-outline" size={20} color="#4A90E2" />
        <Text style={styles.infoText}>Edad: {edad} años</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="paw-outline" size={20} color="#4A90E2" />
        <Text style={styles.infoText}>Raza: {raza}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="paw-outline" size={20} color="#4A90E2" />
        <Text style={styles.infoText}>Peso: {peso} kg</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="paw-outline" size={20} color="#4A90E2" />
        <Text style={styles.infoText}>Estatura: {estatura} cm</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
});