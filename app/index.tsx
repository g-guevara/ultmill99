// app/index.tsx - Modified to use CustomNavTab
import React, { useState, useEffect } from "react";
import { 
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View
} from "react-native";

import { User } from "./components/Login/Users";
import CustomNavTab from "./navigation/CustomNavTab"; // Import the new CustomNavTab component

import { getUser, removeUser } from "./lib/authUtils";

// URL de tu API (reemplazar con la URL de Vercel cuando esté desplegado)
const API_URL = "https://7ujm8uhb.vercel.app";

export default function Index() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay una sesión activa al iniciar la app
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      await removeUser();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await removeUser();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#7d7d7d" />
        </View>
      </SafeAreaView>
    );
  }

  // Si el usuario está logueado, mostramos el CustomNavTab
  if (user) {
    return <CustomNavTab user={user} onLogout={handleLogout} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {isLogin ? (
            <LoginForm 
              onLogin={setUser}
              onSwitchToSignup={() => setIsLogin(false)}
              apiUrl={API_URL}
            />
          ) : (
            <SignupForm 
              onSwitchToLogin={() => setIsLogin(true)}
              apiUrl={API_URL}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardView: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: 60, // Añadido espacio extra para el logo
  },

});