import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import dayjs from 'dayjs';
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
  const [userData, setUserData] = useState<any>(null);
  const [streakData, setStreakData] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  
  // Add calculated values state
  const [calculatedData, setCalculatedData] = useState({
    moneySaved: 0,
    lifeDays: 0,
    timeSaved: 0,
    cigarettesAvoided: 0
  });
  
  const router = useRouter();


  // Combine font loading and user ID check in one useEffect
  useEffect(() => {
    async function init() {
      try {
        // Load fonts
        await Font.loadAsync({
          BrugtyDemoRegular: require("../assets/fonts/BrugtyDemoRegular.ttf"),
          Gallant: require("../assets/fonts/Kingthings_Organica.ttf")
        });
        setFontsLoaded(true);

        // Check user ID and fetch user data
        const userId = await AsyncStorage.getItem('user_id');
        console.log('Current user_id:', userId);

        if (userId) {
          // Fetch user data
          const response = await axios.get(`http://localhost:3000/users/${userId}`);
          console.log('User data:', response.data);
          setUserData(response.data);
          
          // Calculate streak from quit_date
          const quitDate = dayjs(response.data.quit_date);
          const now = dayjs();
          const diffInMinutes = now.diff(quitDate, 'minute');
          
          setStreakData({
            days: Math.floor(diffInMinutes / 1440),
            hours: Math.floor((diffInMinutes % 1440) / 60),
            minutes: diffInMinutes % 60
          });

          // Calculate values
          const cigarettesAvoided = response.data.cigarettesAvoided.cigarettesAvoided;
          const packetPrice = 10; // Assuming 10$ per packet of 20 cigarettes
          
          setCalculatedData({
            moneySaved: (cigarettesAvoided * (packetPrice / 20)).toFixed(2), // Price per cigarette * avoided
            lifeDays: ((15 * cigarettesAvoided) / 1440).toFixed(1), // 15 min per cigarette to days
            timeSaved: ((4 * cigarettesAvoided) / 1440).toFixed(1), // 4 min per cigarette to days
            cigarettesAvoided: cigarettesAvoided
          });
        } else {
          // If no userId is found, redirect to login
          router.replace('/');
        }
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    }
    init();
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
          Hi {userData?.username || 'user'}
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
      </View>
        <View className="bg-limeGreen mt-2 pb-6 rounded-xl">
        <View className="flex-row ml-2 mt-3 ">
          <MaterialCommunityIcons name="medal-outline" size={24} color="black" />
          <Text style={styles.insideText} className="mt-1 ml-1">Your Streak</Text>
        </View>
        <View className="flex-row justify-between px-20">
          <View>
            <Text style={styles.insideText} className="text-4xl">{streakData.days}</Text>
            <Text style={styles.insideText}>days</Text>
          </View>
          <View>
            <Text style={styles.insideText} className="text-4xl">{streakData.hours}</Text>
            <Text style={styles.insideText}>hours</Text>
          </View>
          <View>
            <Text style={styles.insideText} className="text-4xl">{streakData.minutes}</Text>
            <Text style={styles.insideText}>minutes</Text>
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
            <Text style={styles.insideText} className="text-xl font-bold">${calculatedData.moneySaved}</Text>
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
            <Text style={styles.insideText} className="text-xl font-bold">{calculatedData.cigarettesAvoided}</Text>
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
            <Text style={styles.insideText} className="text-xl font-bold">{calculatedData.lifeDays}</Text>
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
            <Text style={styles.insideText} className="text-xl font-bold">{calculatedData.timeSaved}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View className="mt-6">
        <Text style={styles.TitleText} className="ml-2 text-3xl text-blue-700">My Health</Text>
        <View className="flex-row justify-between mt-4">
          <View className="items-center flex-1">
            <CircularProgress percentage={userData?.healthMetrics?.gumTexture?.gumTextureImprovementPercent || 0} />
            <Text style={styles.insideText} className="mt-2 text-center">gum texture</Text>
          </View>
          <View className="items-center flex-1">
            <CircularProgress percentage={userData?.healthMetrics?.immunityAndLung?.combinedImprovementPercent || 0} />
            <Text style={styles.insideText} className="mt-2 text-center">immunity and{'\n'}lung function</Text>
          </View>
          <View className="items-center flex-1">
            <CircularProgress percentage={userData?.healthMetrics?.heartFailure?.heart?.improvementPercent || 0} />
            <Text style={styles.insideText} className="mt-2 text-center">reduced risk{'\n'}of heart</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    
    {/* Money Popup */}
    <MoneyPopup
      isVisible={showMoneyPopup}
      onClose={() => setShowMoneyPopup(false)}
      amount={`${calculatedData.moneySaved}$`}
      details={{
        daily: `${(calculatedData.moneySaved / userData?.cigarettesAvoided?.totalDays).toFixed(2)}$`,
        weekly: `${((calculatedData.moneySaved / userData?.cigarettesAvoided?.totalDays) * 7).toFixed(2)}$`,
        monthly: `${((calculatedData.moneySaved / userData?.cigarettesAvoided?.totalDays) * 30).toFixed(2)}$`,
        yearly: `${((calculatedData.moneySaved / userData?.cigarettesAvoided?.totalDays) * 365).toFixed(2)}$`
      }}
    />

    {/* Cigarette Popup */}
    <CigarettePopup
      isVisible={showCigarettePopup}
      onClose={() => setShowCigarettePopup(false)}
      amount={calculatedData.cigarettesAvoided.toString()}
      details={{
        daily: userData?.cigarettesAvoided?.averagePerDay || '0',
        weekly: ((userData?.cigarettesAvoided?.averagePerDay || 0) * 7).toString(),
        monthly: ((userData?.cigarettesAvoided?.averagePerDay || 0) * 30).toString(),
        yearly: ((userData?.cigarettesAvoided?.averagePerDay || 0) * 365).toString()
      }}
    />
    
    {/* Life Days Popup */}
    <LifeDaysPopup
      isVisible={showLifeDaysPopup}
      onClose={() => setShowLifeDaysPopup(false)}
      days={calculatedData.lifeDays.toString()}
      details={{
        hoursPerDay: ((15 * userData?.cigarettesAvoided?.averagePerDay) / 60).toFixed(1),
        expectedLifespan: '5+ years',
        qualityImprovement: `${userData?.healthMetrics?.immunityAndLung?.combinedImprovementPercent || 0}%`
      }}
    />
    
    {/* Time Saved Popup */}
    <TimeSavedPopup
      isVisible={showTimeSavedPopup}
      onClose={() => setShowTimeSavedPopup(false)}
      days={calculatedData.timeSaved.toString()}
      details={{
        minutesPerCigarette: '4',
        hoursPerWeek: ((4 * userData?.cigarettesAvoided?.averagePerDay * 7) / 60).toFixed(1),
        daysPerMonth: ((4 * userData?.cigarettesAvoided?.averagePerDay * 30) / 1440).toFixed(1),
        reducedConsumption: `${((userData?.cigarettesAvoided?.cigarettesAvoided / userData?.cigarettesAvoided?.totalExpectedSmoked) * 100).toFixed(0)}%`
      }}
    />
    </>
  );
}