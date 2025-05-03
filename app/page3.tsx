import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from "expo-font";

export default function Page3() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 py-6">
        <Text style={{ fontFamily: "BrugtyDemoRegular" }} className="text-5xl font-bold text-indigo-700 mb-6">Settings</Text>

        {/* My Account Section */}
        <Text className="text-2xl font-bold text-black mb-3">My Account</Text>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <Text className="text-xl text-black">Account Details</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <Text className="text-xl text-black">Addictions</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <Text className="text-xl text-black">Notifications</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <Text className="text-xl text-black">Appeareances</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        {/* Green line after Appeareances */}
        <View className="h-1 bg-[#68DE30] mb-6" />
        
        {/* App Experiences Section */}
        <Text className="text-2xl font-bold text-black mb-3">App Experiences</Text>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <Text className="text-xl text-black">Suggest a feature</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <Text className="text-xl text-black">Report a bug</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
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
  );
}