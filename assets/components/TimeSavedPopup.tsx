import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TimeSavedPopupProps {
  isVisible: boolean;
  onClose: () => void;
  days: string;
  details?: {
    minutesPerCigarette: string;
    hoursPerWeek: string;
    daysPerMonth: string;
    reducedConsumption: string;
  };
}

const { width, height } = Dimensions.get('window');

const TimeSavedPopup = ({ 
  isVisible, 
  onClose, 
  days, 
  details = {
    minutesPerCigarette: '5-10',
    hoursPerWeek: '9.5',
    daysPerMonth: '8.2',
    reducedConsumption: '70%'
  }
}: TimeSavedPopupProps) => {
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
          <Text style={styles.title}>Time Saved</Text>
        </View>

        <View style={styles.amountContainer}>
          <MaterialIcons name="more-time" size={36} color="#3B82F6" />
          <Text style={styles.amountText}>{days} days</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="watch-later" size={20} color="#3B82F6" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Each cigarette takes {details.minutesPerCigarette} minutes to smoke. By reducing your consumption, you've saved valuable minutes each day.
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <FontAwesome5 name="calendar-week" size={20} color="#3B82F6" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              You've saved approximately {details.hoursPerWeek} hours per week that you'd otherwise spend on smoking.
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color="#3B82F6" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              That's {days} full days of your life reclaimed from smoking breaks, searching for cigarettes, or buying tobacco products.
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Your Smoking Reduction</Text>
          
          <View style={styles.chartContainer}>
            <View style={styles.chartBar}>
              <View style={styles.chartFull} />
              <Text style={styles.chartLabel}>Before</Text>
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.chartReduced, { height: `${100 - parseFloat(details.reducedConsumption)}%` }]} />
              <Text style={styles.chartLabel}>Now</Text>
            </View>
          </View>
          
          <Text style={styles.chartDescription}>
            You've reduced your cigarette consumption by {details.reducedConsumption}, 
            giving you more time for activities you enjoy, increased productivity, 
            and fewer interruptions to your day.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Make the Most of Your Time!</Text>
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
    color: '#3B82F6',
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
  chartSection: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 15,
    fontFamily: 'Gallant',
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 20,
  },
  chartBar: {
    width: 60,
    height: '100%',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  chartFull: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 6,
  },
  chartReduced: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 6,
  },
  chartLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  chartDescription: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
    lineHeight: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D3FD51',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  }
});

export default TimeSavedPopup;