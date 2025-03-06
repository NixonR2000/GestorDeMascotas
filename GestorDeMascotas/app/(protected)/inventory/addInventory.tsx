import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function AddInventoryScreen() {
  const router = useRouter();

  const [inventory, setInventory] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: null as string | null,
  });

  const handleChange = (field: string, value: string) => {
    setInventory((prev) => ({ ...prev, [field]: value }));
  };

  const selectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se necesita acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      quality: 1 
    });

    if (!result.canceled) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se necesita acceso a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 });

    if (!result.canceled) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const saveProduct = () => {
    const { name, category, price, quantity, image } = inventory;
    if (!name || !category || !price || !quantity || !image) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    console.log("Producto guardado:", inventory);
    Alert.alert("Éxito", "El producto se ha registrado correctamente.");
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Inventario</Text>

      <TextInput style={styles.input} placeholder="Nombre del producto" value={inventory.name} onChangeText={(text) => handleChange("name", text)} />
      <TextInput style={styles.input} placeholder="Categoría" value={inventory.category} onChangeText={(text) => handleChange("category", text)} />
      <TextInput style={styles.input} placeholder="Precio" value={inventory.price} onChangeText={(text) => handleChange("price", text)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Cantidad" value={inventory.quantity} onChangeText={(text) => handleChange("quantity", text)} keyboardType="numeric" />

      {inventory.image && <Image source={{ uri: inventory.image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSave} onPress={saveProduct}>
        <Text style={styles.buttonText}>Guardar Producto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 15, marginBottom: 10, backgroundColor: "#fff" },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", marginTop: 10 },
  buttonSave: { backgroundColor: "#28a745", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  image: { width: 200, height: 200, borderRadius: 10, marginVertical: 10 },
});

