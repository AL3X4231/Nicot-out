import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  TitleText: {
    fontFamily: "BrugtyDemoRegular",
    // Suppression des styles qui entrent en conflit avec TailwindCSS
  },
  insideText:{
    fontFamily:'Gallant'
  }

});

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BrugtyDemoRegular: require("../assets/fonts/BrugtyDemoRegular.ttf"),
        Gallant : require("../assets/fonts/Kingthings_Organica.ttf")
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row ">
        <Text style={styles.TitleText} className="ml-2 text-3xl text-blue-700">
          Hi user4278
        </Text>
      </View>
      <View className="flex-row rounded-xl bg-blue-200 mt-3 py-4 px-2">
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
        <Text className="mt-1 ml-2 " style={styles.insideText}>how are you today?</Text>

      </View>
      <View className="flex-row justify-between mt-10">
        <Text style={styles.TitleText} className="ml-2 text-3xl text-blue-700 ">My Progress</Text>
        <Entypo name="share-alternative" size={24} color="blue" className="mr-2" />
      </View>
      
      <View className="bg-limeGreen mt-2 pb-6 rounded-xl">
        <View className="flex-row ml-2 mt-3 ">
          <MaterialCommunityIcons name="clock-check-outline" size={24} color="black" />
          <Text style={styles.insideText} className="mt-1 ml-1"> Stay clean for</Text>
        </View>
        <View className="flex-row justify-between px-20">
          <View>
              <Text style={styles.insideText} className="text-4xl">03</Text>
              <Text style={styles.insideText} >months</Text>
          </View>
          <View>
              <Text style={styles.insideText}className="text-4xl">03</Text>
              <Text style={styles.insideText}>days</Text>
          </View>
          <View>
              <Text style={styles.insideText} className="text-4xl">03</Text>
              <Text style={styles.insideText}>hours</Text>
          </View>
        </View>
        

      </View>
      <View className="flex-row justify-center py-3">
        <View className="bg-limeGreen mx-3 rounded-xl px-5">
          <View className="flex-row">
            <FontAwesome5 name="money-bill-alt" size={24} color="green" className="mr-2"/>
            <Text style={styles.insideText} className="mt-1"> money saved</Text>
          </View>
          
        </View>
        <View className="bg-limeGreen mx-3 rounded-xl px-5">
          <View className="flex-row">
            <MaterialCommunityIcons name="cigar-off" size={24} color="black" />
            <Text style={styles.insideText} className="mt-1"> ciggaretes</Text>
          </View>
        </View>
      </View>
    </View>
  );
}