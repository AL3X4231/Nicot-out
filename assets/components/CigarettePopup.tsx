import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CigarettePopupProps {
  isVisible: boolean;
  onClose: () => void;
  amount: string;
  details?: {
    daily: string;
    weekly: string;
    monthly: string;
    yearly: string;
  };
}

const { width, height } = Dimensions.get('window');

const CigarettePopup = ({ isVisible, onClose, amount, details = { 
  daily: '7', 
  weekly: '49', 
  monthly: '210', 
  yearly: '2555' 
} }: CigarettePopupProps) => {
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
          <Text style={styles.title}>Cigarettes Not Smoked</Text>
        </View>

        <View style={styles.amountContainer}>
          <MaterialCommunityIcons name="cigar-off" size={36} color="#4F46E5" />
          <Text style={styles.amountText}>{amount}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Daily average:</Text>
            <Text style={styles.detailValue}>{details.daily}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Weekly average:</Text>
            <Text style={styles.detailValue}>{details.weekly}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monthly average:</Text>
            <Text style={styles.detailValue}>{details.monthly}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Yearly projection:</Text>
            <Text style={styles.detailValue}>{details.yearly}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <FontAwesome5 name="lungs" size={20} color="#10B981" style={styles.infoIcon} />
            <Text style={styles.infoText}>Your lung capacity has improved by approximately 15%</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="heart-pulse" size={20} color="#EF4444" style={styles.infoIcon} />
            <Text style={styles.infoText}>Your risk of heart disease has decreased by 48%</Text>
          </View>
          
          <View style={styles.infoRow}>
            <FontAwesome5 name="running" size={20} color="#3B82F6" style={styles.infoIcon} />
            <Text style={styles.infoText}>Your physical stamina has increased by 25%</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Stay Strong!</Text>
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
    color: '#4F46E5',
    marginLeft: 15,
    fontFamily: 'Gallant',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F46E5',
    fontFamily: 'Gallant',
  },
  infoSection: {
    marginBottom: 20,
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

export default CigarettePopup;