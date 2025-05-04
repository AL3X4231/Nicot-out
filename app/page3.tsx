import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
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

  return (
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

      {/* My Account Popups */}
      <AccountDetailsPopup 
        isVisible={showAccountDetailsPopup}
        onClose={() => setShowAccountDetailsPopup(false)}
        userDetails={{
          username: 'user4278',
          email: 'user@example.com',
          joinDate: 'May 1, 2025',
          phoneNumber: '',
        }}
      />

      <AddictionsPopup
        isVisible={showAddictionsPopup}
        onClose={() => setShowAddictionsPopup(false)}
        addictionDetails={{
          cigarettesPerDay: 15,
          cigaretteCost: 0.5,
          startDate: 'January 10, 2020',
          quitDate: 'February 1, 2025',
        }}
      />

      <NotificationsPopup
        isVisible={showNotificationsPopup}
        onClose={() => setShowNotificationsPopup(false)}
        notificationSettings={{
          dailyReminders: true,
          achievementAlerts: true,
          milestoneReminders: true,
          motivationalMessages: false,
          healthUpdates: true,
          savingsAlerts: false,
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
    </ScrollView>
  );
}