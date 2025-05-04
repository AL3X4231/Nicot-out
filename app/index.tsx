import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Font from "expo-font";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CigarettePopup from '../assets/components/CigarettePopup';
import CircularProgress from '../assets/components/CircularProgress';
import LifeDaysPopup from '../assets/components/LifeDaysPopup';
import MoneyPopup from '../assets/components/MoneyPopup';
import TimeSavedPopup from '../assets/components/TimeSavedPopup';

const styles = StyleSheet.create({
  TitleText: {
    fontFamily: "BrugtyDemoRegular",
  },
  insideText:{
    fontFamily:'Gallant'
  }
});

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showMoneyPopup, setShowMoneyPopup] = useState(false);
  const [showCigarettePopup, setShowCigarettePopup] = useState(false);
  const [showLifeDaysPopup, setShowLifeDaysPopup] = useState(false);
  const [showTimeSavedPopup, setShowTimeSavedPopup] = useState(false);
  const router = useRouter();

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
    <>
    <StatusBar style="dark" />
    <ScrollView className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center">
        <Text style={styles.TitleText} className="ml-2 text-3xl text-blue-700">
          Hi user4278
        </Text>
        <TouchableOpacity onPress={() => router.push('/page3')}>
          <FontAwesome5 name="cog" size={24} color="#1d4ed8" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push('/page1')} className="flex-row rounded-xl bg-blue-200 mt-3 py-4 px-2">
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
        <Text className="mt-1 ml-2 " style={styles.insideText}>how are you today?</Text>
      </TouchableOpacity>
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
      
      <View className="flex-row justify-between w-full py-3">
        <TouchableOpacity 
          className="flex-1 bg-limeGreen mx-2 rounded-3xl px-4 py-6"
          onPress={() => setShowMoneyPopup(true)}
        >
          <View className="items-center">
            <View className="flex-row items-center mb-2">
              <FontAwesome5 name="money-bill-alt" size={24} color="green" className="mr-2"/>
              <Text style={styles.insideText}>money saved</Text>
            </View>
            <Text style={styles.insideText} className="text-xl font-bold">1000$</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-1 bg-limeGreen mx-2 rounded-3xl px-4 py-6"
          onPress={() => setShowCigarettePopup(true)}
        >
          <View className="items-center">
            <View className="flex-row items-center mb-2">
              <MaterialCommunityIcons name="cigar-off" size={24} color="black" />
              <Text style={styles.insideText}>cigarettes</Text>
            </View>
            <Text style={styles.insideText} className="text-xl font-bold">2039</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View className="flex-row justify-between w-full py-3">
        <TouchableOpacity 
          className="flex-1 bg-limeGreen mx-2 rounded-3xl px-4 py-6"
          onPress={() => setShowLifeDaysPopup(true)}
        >
          <View className="items-center">
            <View className="flex-row justify-between items-center mb-2">
              <MaterialCommunityIcons name="timer-sand" size={24} color="black" />
              <Text style={styles.insideText}>life (days)</Text>
            </View>
            <Text style={styles.insideText} className="text-xl font-bold">30</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-1 bg-limeGreen mx-2 rounded-3xl px-4 py-6"
          onPress={() => setShowTimeSavedPopup(true)}
        >
          <View className="items-center">
            <View className="flex-row justify-between items-center mb-2">
              <MaterialIcons name="more-time" size={24} color="black" />
              <Text style={styles.insideText}>time saved (days)</Text>
            </View>
            <Text style={styles.insideText} className="text-xl font-bold">8.2</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View className="mt-6">
        <Text style={styles.TitleText} className="ml-2 text-3xl text-blue-700">My Health</Text>
        <View className="flex-row justify-between mt-4">
          <View className="items-center flex-1">
            <CircularProgress percentage={78} />
            <Text style={styles.insideText} className="mt-2 text-center">gum texture</Text>
          </View>
          <View className="items-center flex-1">
            <CircularProgress percentage={69} />
            <Text style={styles.insideText} className="mt-2 text-center">immunity and{'\n'}lung function</Text>
          </View>
          <View className="items-center flex-1">
            <CircularProgress percentage={29} />
            <Text style={styles.insideText} className="mt-2 text-center">reduced risk{'\n'}of heart</Text>
          </View>
        </View>
      </View>
      <View className="mt-6">
        <Text style={styles.TitleText} className="ml-2 text-3xl text-blue-700">My Goal</Text>
        <View className="flex-row flex-wrap justify-between mt-4">
          {/* Health Card */}
          <View className="w-[30%] bg-limeGreen rounded-xl p-4 mb-4">
            <View className="items-center">
              <MaterialCommunityIcons name="heart-pulse" size={24} color="#EC4899" />
              <Text style={styles.insideText} className="text-center mt-2">Health</Text>
              <View className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <View className="w-[75%] h-1 bg-pink-500 rounded-full" />
              </View>
            </View>
          </View>

          {/* Wellbeing Card */}
          <View className="w-[30%] bg-limeGreen rounded-xl p-4 mb-4">
            <View className="items-center">
              <MaterialCommunityIcons name="food-apple" size={24} color="#EF4444" />
              <Text style={styles.insideText} className="text-center mt-2">Wellbeing</Text>
              <View className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <View className="w-[60%] h-1 bg-red-500 rounded-full" />
              </View>
            </View>
          </View>

          {/* Ecology Card */}
          <View className="w-[30%] bg-limeGreen rounded-xl p-4 mb-4">
            <View className="items-center">
              <FontAwesome5 name="globe-americas" size={24} color="#10B981" />
              <Text style={styles.insideText} className="text-center mt-2">Ecology</Text>
              <View className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <View className="w-[45%] h-1 bg-emerald-500 rounded-full" />
              </View>
            </View>
          </View>

          {/* Body Card */}
          <View className="w-[30%] bg-limeGreen rounded-xl p-4 mb-4">
            <View className="items-center">
              <FontAwesome5 name="user" size={24} color="#6366F1" />
              <Text style={styles.insideText} className="text-center mt-2">Body</Text>
              <View className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <View className="w-[85%] h-1 bg-indigo-500 rounded-full" />
              </View>
            </View>
          </View>

          {/* Progress Card */}
          <View className="w-[30%] bg-limeGreen rounded-xl p-4 mb-4">
            <View className="items-center">
              <MaterialCommunityIcons name="chart-line" size={24} color="#F59E0B" />
              <Text style={styles.insideText} className="text-center mt-2">Progress</Text>
              <View className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <View className="w-[55%] h-1 bg-amber-500 rounded-full" />
              </View>
            </View>
          </View>

          {/* Lungs Card */}
          <View className="w-[30%] bg-limeGreen rounded-xl p-4 mb-4">
            <View className="items-center">
              <MaterialCommunityIcons name="lungs" size={24} color="#8B5CF6" />
              <Text style={styles.insideText} className="text-center mt-2">Lungs</Text>
              <View className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <View className="w-[65%] h-1 bg-violet-500 rounded-full" />
              </View>
            </View>
          </View>

          {/* Time Card */}
          <View className="w-[30%] bg-limeGreen rounded-xl p-4 mb-4">
            <View className="items-center">
              <MaterialCommunityIcons name="clock-outline" size={24} color="#3B82F6" />
              <Text style={styles.insideText} className="text-center mt-2">Time</Text>
              <View className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <View className="w-[70%] h-1 bg-blue-500 rounded-full" />
              </View>
            </View>
          </View>

          {/* Substances Card */}
          <View className="w-[30%] bg-limeGreen rounded-xl p-4 mb-4">
            <View className="items-center">
              <MaterialCommunityIcons name="virus" size={24} color="#DC2626" />
              <Text style={styles.insideText} className="text-center mt-2">Substances</Text>
              <View className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <View className="w-[40%] h-1 bg-red-600 rounded-full" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    
    {/* Money Popup */}
    <MoneyPopup
      isVisible={showMoneyPopup}
      onClose={() => setShowMoneyPopup(false)}
      amount="1000$"
      details={{
        daily: '3.33$',
        weekly: '23.31$',
        monthly: '100$',
        yearly: '1200$'
      }}
    />

    {/* Cigarette Popup */}
    <CigarettePopup
      isVisible={showCigarettePopup}
      onClose={() => setShowCigarettePopup(false)}
      amount="2039"
      details={{
        daily: '7',
        weekly: '49',
        monthly: '210',
        yearly: '2555'
      }}
    />
    
    {/* Life Days Popup */}
    <LifeDaysPopup
      isVisible={showLifeDaysPopup}
      onClose={() => setShowLifeDaysPopup(false)}
      days="30"
      details={{
        hoursPerDay: '4',
        expectedLifespan: '5+ years',
        qualityImprovement: '35%'
      }}
    />
    
    {/* Time Saved Popup */}
    <TimeSavedPopup
      isVisible={showTimeSavedPopup}
      onClose={() => setShowTimeSavedPopup(false)}
      days="8.2"
      details={{
        minutesPerCigarette: '5-10',
        hoursPerWeek: '9.5',
        daysPerMonth: '8.2',
        reducedConsumption: '70%'
      }}
    />
    </>
  );
}