import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import WebSlider from './WebSlider';

interface AddictionsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  addictionDetails?: {
    cigarettesPerDay: number;
    cigaretteCost: number;
    startDate: string;
    quitDate: string;
  };
}

const { width, height } = Dimensions.get('window');
const SliderComponent = Platform.select({
  web: WebSlider,
  default: Slider,
});

const AddictionsPopup = ({ 
  isVisible, 
  onClose, 
  addictionDetails = {
    cigarettesPerDay: 15,
    cigaretteCost: 0.5,
    startDate: 'January 10, 2020',
    quitDate: 'February 1, 2025',
  }
}: AddictionsPopupProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [cigarettesPerDay, setCigarettesPerDay] = useState(addictionDetails.cigarettesPerDay);
  const [cigaretteCost, setCigaretteCost] = useState(addictionDetails.cigaretteCost);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSaveChanges = () => {
    // Here we would save changes to a database
    setIsEditing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  if (!isVisible) return null;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const formatCost = (cost: number) => {
    return `$${cost.toFixed(2)}`;
  };

  const handleCigaretteCostChange = (text: string) => {
    const value = parseFloat(text.replace('$', ''));
    if (!isNaN(value)) {
      setCigaretteCost(value);
    }
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
          <Text style={styles.title}>Addiction Settings</Text>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => !isEditing && setIsEditing(true)}
          >
            <FontAwesome5 name="edit" size={18} color="#1D4ED8" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="cigarette" size={24} color="#4B5563" />
            <Text style={styles.sectionTitle}>Smoking Statistics</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Former cigarettes per day</Text>
            {isEditing ? (
              <View style={styles.sliderContainer}>
                <SliderComponent 
                  style={{height: 40, width: '100%'}}
                  minimumValue={1}
                  maximumValue={60}
                  step={1}
                  value={cigarettesPerDay}
                  onValueChange={setCigarettesPerDay}
                  minimumTrackTintColor="#1D4ED8"
                  maximumTrackTintColor="#E5E7EB"
                  thumbTintColor="#1D4ED8"
                />
                <Text style={styles.sliderValue}>{cigarettesPerDay}</Text>
              </View>
            ) : (
              <Text style={styles.value}>{cigarettesPerDay}</Text>
            )}
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Cost per cigarette</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formatCost(cigaretteCost)}
                onChangeText={handleCigaretteCostChange}
                keyboardType="decimal-pad"
              />
            ) : (
              <Text style={styles.value}>{formatCost(cigaretteCost)}</Text>
            )}
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Started smoking</Text>
            <Text style={styles.value}>{addictionDetails.startDate}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Quit date</Text>
            <Text style={styles.value}>{addictionDetails.quitDate}</Text>
          </View>
        </View>

        <View style={styles.statisticsSection}>
          <Text style={styles.statisticsTitle}>Your Progress Impact</Text>
          
          <View style={styles.statisticsRow}>
            <View style={styles.statisticItem}>
              <Text style={styles.statisticValue}>
                {(cigarettesPerDay * 30).toFixed(0)}
              </Text>
              <Text style={styles.statisticLabel}>
                Monthly cigarettes avoided
              </Text>
            </View>
            
            <View style={styles.statisticItem}>
              <Text style={styles.statisticValue}>
                ${(cigarettesPerDay * cigaretteCost * 30).toFixed(2)}
              </Text>
              <Text style={styles.statisticLabel}>
                Monthly savings
              </Text>
            </View>
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
        
        {!isEditing && (
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => {
              // This would reset addiction tracking
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }}
          >
            <Text style={styles.resetButtonText}>Reset Addiction Tracking</Text>
          </TouchableOpacity>
        )}
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
  editButton: {
    position: 'absolute',
    right: 0,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B5563',
    fontFamily: 'Gallant',
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#4B5563',
    fontFamily: 'Gallant',
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Gallant',
  },
  input: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Gallant',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    minWidth: 80,
    textAlign: 'right',
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D4ED8',
    fontFamily: 'Gallant',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  statisticsSection: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  statisticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D4ED8',
    fontFamily: 'Gallant',
    marginBottom: 10,
    textAlign: 'center',
  },
  statisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statisticItem: {
    alignItems: 'center',
  },
  statisticValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#047857',
    fontFamily: 'Gallant',
  },
  statisticLabel: {
    fontSize: 12,
    color: '#4B5563',
    fontFamily: 'Gallant',
    textAlign: 'center',
    maxWidth: 120,
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
  resetButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
    fontFamily: 'Gallant',
  },
});

export default AddictionsPopup;