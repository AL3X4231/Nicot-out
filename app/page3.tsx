import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AccountDetailsPopup from '../assets/components/AccountDetailsPopup';
import AddictionsPopup from '../assets/components/AddictionsPopup';
import AppearancesPopup from '../assets/components/AppearancesPopup';
import NotificationsPopup from '../assets/components/NotificationsPopup';
import ReportBugPopup from '../assets/components/ReportBugPopup';
import ShareAppPopup from '../assets/components/ShareAppPopup';
import SuggestFeaturePopup from '../assets/components/SuggestFeaturePopup';

export default function Page3() {
  // My Account section popups
  const [showAccountDetailsPopup, setShowAccountDetailsPopup] = useState(false);
  const [showAddictionsPopup, setShowAddictionsPopup] = useState(false);
  const [showNotificationsPopup, setShowNotificationsPopup] = useState(false);
  const [showAppearancesPopup, setShowAppearancesPopup] = useState(false);

  // App Experiences section popups
  const [showSuggestFeaturePopup, setShowSuggestFeaturePopup] = useState(false);
  const [showReportBugPopup, setShowReportBugPopup] = useState(false);
  const [showShareAppPopup, setShowShareAppPopup] = useState(false);

  // Add user data state
  const [userData, setUserData] = useState<any>(null);

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        if (userId) {
          const response = await axios.get(`http://localhost:3000/users/${userId}`);
          console.log('User settings data:', response.data);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <>
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 py-6">
        <Text style={{ fontFamily: "BrugtyDemoRegular" }} className="text-5xl font-bold text-indigo-700 mb-6">Settings</Text>

        {/* My Account Section */}
        <Text className="text-2xl font-bold text-black mb-3">My Account</Text>
        
        <TouchableOpacity 
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
          onPress={() => setShowAccountDetailsPopup(true)}
        >
          <Text className="text-xl text-black">Account Details</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
          onPress={() => setShowAddictionsPopup(true)}
        >
          <Text className="text-xl text-black">Addictions</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
          onPress={() => setShowNotificationsPopup(true)}
        >
          <Text className="text-xl text-black">Notifications</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
          onPress={() => setShowAppearancesPopup(true)}
        >
          <Text className="text-xl text-black">Appeareances</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        {/* Green line after Appeareances */}
        <View className="h-1 bg-[#68DE30] mb-6" />
        
        {/* App Experiences Section */}
        <Text className="text-2xl font-bold text-black mb-3">App Experiences</Text>
        
        <TouchableOpacity 
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
          onPress={() => setShowSuggestFeaturePopup(true)}
        >
          <Text className="text-xl text-black">Suggest a feature</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
          onPress={() => setShowReportBugPopup(true)}
        >
          <Text className="text-xl text-black">Report a bug</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
          onPress={() => setShowShareAppPopup(true)}
        >
          <Text className="text-xl text-purple-400">Share this app & save lives</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        {/* Green line after Share this app */}
        <View className="h-1 bg-[#68DE30] mb-6" />
        
        {/* Start New Button */}
        <TouchableOpacity className="flex-row items-center justify-between py-3 mb-6">
          <Text className="text-2xl font-bold text-indigo-700">Start New</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        {/* App Version */}
        <View className="items-end mb-4">
          <Text className="text-lg text-gray-700">App Version 1.0</Text>
        </View>
      </View>
      </ScrollView>

      {/* My Account Popups */}
      <AccountDetailsPopup 
        isVisible={showAccountDetailsPopup}
        onClose={() => setShowAccountDetailsPopup(false)}
        userDetails={{
          username: userData?.username || '',
          email: userData?.email || '',
          joinDate: userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : '',
          phoneNumber: '', // This field isn't in the API yet
        }}
      />

      <AddictionsPopup
        isVisible={showAddictionsPopup}
        onClose={() => setShowAddictionsPopup(false)}
        addictionDetails={{
          cigarettesPerDay: userData?.starting_cigarettes_per_day || 0,
          cigaretteCost: 0.5, // Cost per cigarette (assuming $10 per pack of 20)
          startDate: userData?.birth ? new Date(userData.birth).toLocaleDateString() : '',
          quitDate: userData?.quit_date ? new Date(userData.quit_date).toLocaleDateString() : '',
        }}
      />

      <NotificationsPopup
        isVisible={showNotificationsPopup}
        onClose={() => setShowNotificationsPopup(false)}
        notificationSettings={{
          dailyReminders: true,
          achievementAlerts: true,
          milestoneReminders: true,
          motivationalMessages: true,
          healthUpdates: true,
          savingsAlerts: true,
        }}
      />

      <AppearancesPopup
        isVisible={showAppearancesPopup}
        onClose={() => setShowAppearancesPopup(false)}
        appearanceSettings={{
          darkMode: false,
          colorScheme: 'standard',
          fontSize: 'medium',
          reduceMotion: false,
          useBiometricAuth: true,
        }}
      />
      
      {/* App Experiences Popups */}
      <SuggestFeaturePopup
        isVisible={showSuggestFeaturePopup}
        onClose={() => setShowSuggestFeaturePopup(false)}
      />

      <ReportBugPopup
        isVisible={showReportBugPopup}
        onClose={() => setShowReportBugPopup(false)}
      />

      <ShareAppPopup
        isVisible={showShareAppPopup}
        onClose={() => setShowShareAppPopup(false)}
      />
    
    </>
  );
}