import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Importa el tipo RootState

export default function RegisterScreen() {
  const router = useRouter();
  const mascotas = useSelector((state: RootState) => state.mascota.mascotas); 
  // Obtén las mascotas desde Redux

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw-outline" size={32} color="#2D2E32" />
        <Text style={styles.title}>Registro de Mascotas</Text>
      </View>

      <FlatList
        data={mascotas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => router.push
            ({ pathname: `../item/${item.id}`, params: item })}>
            <View style={styles.itemHeader}>
              <Ionicons name="paw-outline" size={24} color="#4A90E2" />
              <Text style={styles.itemTitle}>{item.nombre}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="paw-outline" size={20} color="#666" />
              <Text style={styles.itemCategory}>Raza: {item.raza}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="paw-outline" size={20} color="#666" />
              <Text style={styles.itemQuantity}>Edad: {item.edad} años</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D2E32",
    marginLeft: 10,
  },
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  itemCategory: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#444",
    fontWeight: "bold",
    marginLeft: 8,
  },
});