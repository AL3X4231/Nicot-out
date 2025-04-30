import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const styles = StyleSheet.create({
  customText: {
    fontFamily: "BrugtyDemoRegular",
    // Suppression des styles qui entrent en conflit avec TailwindCSS
  },
});

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BrugtyDemoRegular: require("../assets/fonts/BrugtyDemoRegular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-row items-center bg-white p-4">
      <FontAwesome5 name="hand-peace" size={24} color="#1d4ed8" />
      <Text style={styles.customText} className="ml-2 text-2xl text-blue-700 font-normal">
        Hi user4278.
      </Text>
    </View>
  );
}