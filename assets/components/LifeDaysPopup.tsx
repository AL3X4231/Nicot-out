import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LifeDaysPopupProps {
  isVisible: boolean;
  onClose: () => void;
  days: string;
  details?: {
    hoursPerDay: string;
    expectedLifespan: string;
    qualityImprovement: string;
  };
}

const { width, height } = Dimensions.get('window');

const LifeDaysPopup = ({ 
  isVisible, 
  onClose, 
  days, 
  details = {
    hoursPerDay: '4',
    expectedLifespan: '5+ years',
    qualityImprovement: '35%'
  }
}: LifeDaysPopupProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

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
          <Text style={styles.title}>Life Gained</Text>
        </View>

        <View style={styles.amountContainer}>
          <MaterialCommunityIcons name="timer-sand" size={36} color="#FB923C" />
          <Text style={styles.amountText}>{days} days</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <FontAwesome5 name="calendar-plus" size={20} color="#FB923C" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Every cigarette you don't smoke adds approximately 11 minutes to your life.
              In 30 days, that's a whole day of life gained!
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="human-handsup" size={20} color="#FB923C" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              You're gaining {details.hoursPerDay} hours of quality life every day by not smoking.
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <FontAwesome5 name="heartbeat" size={20} color="#FB923C" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Your overall life expectancy has increased by approximately {details.expectedLifespan} since quitting.
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Life Quality Improvement</Text>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: details.qualityImprovement }]} />
            </View>
            <Text style={styles.progressText}>{details.qualityImprovement}</Text>
          </View>
          
          <Text style={styles.progressDescription}>
            Not only are you living longer, but the quality of those years will be significantly better.
            Breathing is easier, physical activity is more enjoyable, and your risk of serious illnesses decreases with each day.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Keep Living Longer!</Text>
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
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    flexDirection: 'row',
  },
  amountText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FB923C',
    marginLeft: 15,
    fontFamily: 'Gallant',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  infoSection: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FB923C',
    marginBottom: 10,
    fontFamily: 'Gallant',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#FB923C',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FB923C',
    fontFamily: 'Gallant',
  },
  progressDescription: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#D3FD51',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  }
});

export default LifeDaysPopup;