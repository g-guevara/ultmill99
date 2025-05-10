import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Platform, StatusBar as RNStatusBar } from "react-native";

export default function RootLayout() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
    >
      {/* Configuración del StatusBar para que coincida con el fondo */}
      <StatusBar backgroundColor="#f5f5f5" style="dark" translucent={true} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f5f5f5' },
        }}
      />
    </View>
  );
}
