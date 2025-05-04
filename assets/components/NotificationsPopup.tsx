import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface NotificationsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  notificationSettings?: {
    dailyReminders: boolean;
    achievementAlerts: boolean;
    milestoneReminders: boolean;
    motivationalMessages: boolean;
    healthUpdates: boolean;
    savingsAlerts: boolean;
  };
}

interface NotificationOptionProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const { width, height } = Dimensions.get('window');

const NotificationOption = ({ title, description, value, onValueChange }: NotificationOptionProps) => (
  <View style={styles.optionContainer}>
    <View style={styles.optionInfo}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionDescription}>{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#E5E7EB', true: '#D3FD51' }}
      thumbColor={value ? '#1D4ED8' : '#F9FAFB'}
      ios_backgroundColor="#E5E7EB"
    />
  </View>
);

const NotificationsPopup = ({ 
  isVisible, 
  onClose, 
  notificationSettings = {
    dailyReminders: true,
    achievementAlerts: true,
    milestoneReminders: true,
    motivationalMessages: false,
    healthUpdates: true,
    savingsAlerts: false,
  }
}: NotificationsPopupProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [settings, setSettings] = useState(notificationSettings);

  React.useEffect(() => {
    if (isVisible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Animated.spring(animatedValue, {
        toValue: 1,
        damping: 15,
        mass: 1,
        stiffness: 120,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleValueChange = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = () => {
    // Here we would save changes to a database
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onClose();
  };

  const toggleAllNotifications = (value: boolean) => {
    const updatedSettings = Object.keys(settings).reduce((acc, key) => {
      return { ...acc, [key]: value };
    }, {}) as typeof settings;
    
    setSettings(updatedSettings);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (!isVisible) return null;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  return (
    <View style={styles.container}>
      <BlurView intensity={90} style={StyleSheet.absoluteFill} tint="dark" />
      
      <Animated.View 
        style={[
          styles.popup, 
          { transform: [{ translateY }] }
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome5 name="times" size={20} color="#1D4ED8" />
          </TouchableOpacity>
          <Text style={styles.title}>Notification Settings</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.toggleAllContainer}>
            <TouchableOpacity 
              style={styles.toggleButton}
              onPress={() => toggleAllNotifications(true)}
            >
              <Text style={styles.toggleButtonText}>Enable All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleButton, styles.toggleButtonOff]}
              onPress={() => toggleAllNotifications(false)}
            >
              <Text style={[styles.toggleButtonText, styles.toggleButtonTextOff]}>Disable All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <NotificationOption 
            title="Daily Reminders"
            description="Get daily reminders to check in and update your progress"
            value={settings.dailyReminders}
            onValueChange={(value) => handleValueChange('dailyReminders', value)}
          />
          
          <View style={styles.separator} />
          
          <NotificationOption 
            title="Achievement Alerts"
            description="Be notified when you earn achievements and badges"
            value={settings.achievementAlerts}
            onValueChange={(value) => handleValueChange('achievementAlerts', value)}
          />
          
          <View style={styles.separator} />
          
          <NotificationOption 
            title="Milestone Reminders"
            description="Get notified when you reach important milestones"
            value={settings.milestoneReminders}
            onValueChange={(value) => handleValueChange('milestoneReminders', value)}
          />
          
          <View style={styles.separator} />
          
          <NotificationOption 
            title="Motivational Messages"
            description="Receive motivational quotes and messages to keep you going"
            value={settings.motivationalMessages}
            onValueChange={(value) => handleValueChange('motivationalMessages', value)}
          />
          
          <View style={styles.separator} />
          
          <NotificationOption 
            title="Health Updates"
            description="Get periodic updates about your improving health metrics"
            value={settings.healthUpdates}
            onValueChange={(value) => handleValueChange('healthUpdates', value)}
          />
          
          <View style={styles.separator} />
          
          <NotificationOption 
            title="Savings Alerts"
            description="Be notified about milestones in money saved from not smoking"
            value={settings.savingsAlerts}
            onValueChange={(value) => handleValueChange('savingsAlerts', value)}
          />
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: height * 0.8,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textAlign: 'center',
    fontFamily: 'Gallant',
  },
  section: {
    marginBottom: 20,
  },
  toggleAllContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  toggleButton: {
    backgroundColor: '#D3FD51',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  toggleButtonOff: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  },
  toggleButtonTextOff: {
    color: '#4B5563',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionInfo: {
    flex: 1,
    paddingRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Gallant',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#D3FD51',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  },
});

export default NotificationsPopup;