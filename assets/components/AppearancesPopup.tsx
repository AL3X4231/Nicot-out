import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface AppearancesPopupProps {
  isVisible: boolean;
  onClose: () => void;
  appearanceSettings?: {
    darkMode: boolean;
    colorScheme: 'standard' | 'colorblind' | 'high-contrast';
    fontSize: 'small' | 'medium' | 'large';
    reduceMotion: boolean;
    useBiometricAuth: boolean;
  };
}

const { width, height } = Dimensions.get('window');

const AppearancesPopup = ({ 
  isVisible, 
  onClose, 
  appearanceSettings = {
    darkMode: false,
    colorScheme: 'standard' as const,
    fontSize: 'medium' as const,
    reduceMotion: false,
    useBiometricAuth: true,
  }
}: AppearancesPopupProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [settings, setSettings] = useState(appearanceSettings);

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

  const handleSwitchChange = (key: 'darkMode' | 'reduceMotion' | 'useBiometricAuth') => (value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleOptionSelect = (
    key: 'colorScheme' | 'fontSize',
    value: 'standard' | 'colorblind' | 'high-contrast' | 'small' | 'medium' | 'large'
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSaveChanges = () => {
    // Here we would save changes to a database
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onClose();
  };

  if (!isVisible) return null;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const getOptionButtonStyle = (
    key: 'colorScheme' | 'fontSize',
    value: string,
    currentValue: string
  ) => {
    return value === currentValue 
      ? [styles.optionButton, styles.optionButtonSelected]
      : styles.optionButton;
  };

  const getOptionTextStyle = (
    key: 'colorScheme' | 'fontSize',
    value: string,
    currentValue: string
  ) => {
    return value === currentValue 
      ? [styles.optionButtonText, styles.optionButtonTextSelected]
      : styles.optionButtonText;
  };

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
          <Text style={styles.title}>Appearance Settings</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Use dark theme throughout the app</Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={handleSwitchChange('darkMode')}
              trackColor={{ false: '#E5E7EB', true: '#D3FD51' }}
              thumbColor={settings.darkMode ? '#1D4ED8' : '#F9FAFB'}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
          
          <View style={styles.separator} />
          
          <Text style={styles.sectionTitle}>Color Scheme</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={getOptionButtonStyle('colorScheme', 'standard', settings.colorScheme)}
              onPress={() => handleOptionSelect('colorScheme', 'standard')}
            >
              <Text style={getOptionTextStyle('colorScheme', 'standard', settings.colorScheme)}>Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={getOptionButtonStyle('colorScheme', 'colorblind', settings.colorScheme)}
              onPress={() => handleOptionSelect('colorScheme', 'colorblind')}
            >
              <Text style={getOptionTextStyle('colorScheme', 'colorblind', settings.colorScheme)}>Colorblind</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={getOptionButtonStyle('colorScheme', 'high-contrast', settings.colorScheme)}
              onPress={() => handleOptionSelect('colorScheme', 'high-contrast')}
            >
              <Text style={getOptionTextStyle('colorScheme', 'high-contrast', settings.colorScheme)}>High Contrast</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.separator} />
          
          <Text style={styles.sectionTitle}>Font Size</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={getOptionButtonStyle('fontSize', 'small', settings.fontSize)}
              onPress={() => handleOptionSelect('fontSize', 'small')}
            >
              <Text style={[getOptionTextStyle('fontSize', 'small', settings.fontSize), { fontSize: 12 }]}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={getOptionButtonStyle('fontSize', 'medium', settings.fontSize)}
              onPress={() => handleOptionSelect('fontSize', 'medium')}
            >
              <Text style={[getOptionTextStyle('fontSize', 'medium', settings.fontSize), { fontSize: 16 }]}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={getOptionButtonStyle('fontSize', 'large', settings.fontSize)}
              onPress={() => handleOptionSelect('fontSize', 'large')}
            >
              <Text style={[getOptionTextStyle('fontSize', 'large', settings.fontSize), { fontSize: 20 }]}>Large</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Reduce Motion</Text>
              <Text style={styles.settingDescription}>Minimize animations throughout the app</Text>
            </View>
            <Switch
              value={settings.reduceMotion}
              onValueChange={handleSwitchChange('reduceMotion')}
              trackColor={{ false: '#E5E7EB', true: '#D3FD51' }}
              thumbColor={settings.reduceMotion ? '#1D4ED8' : '#F9FAFB'}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Use Biometric Authentication</Text>
              <Text style={styles.settingDescription}>Use Face ID or Touch ID to access the app</Text>
            </View>
            <Switch
              value={settings.useBiometricAuth}
              onValueChange={handleSwitchChange('useBiometricAuth')}
              trackColor={{ false: '#E5E7EB', true: '#D3FD51' }}
              thumbColor={settings.useBiometricAuth ? '#1D4ED8' : '#F9FAFB'}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B5563',
    fontFamily: 'Gallant',
    marginVertical: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Gallant',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionButtonSelected: {
    backgroundColor: '#D3FD51',
    borderColor: '#D3FD51',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  optionButtonTextSelected: {
    color: '#1F2937',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
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

export default AppearancesPopup;