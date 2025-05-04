import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MoneyPopupProps {
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

const MoneyPopup = ({ isVisible, onClose, amount, details = { 
  daily: '3.33$', 
  weekly: '23.31$', 
  monthly: '100$', 
  yearly: '1200$' 
} }: MoneyPopupProps) => {
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
          <Text style={styles.title}>Money Saved</Text>
        </View>

        <View style={styles.amountContainer}>
          <FontAwesome5 name="money-bill-wave" size={36} color="#16A34A" />
          <Text style={styles.amountText}>{amount}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Daily savings:</Text>
            <Text style={styles.detailValue}>{details.daily}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Weekly savings:</Text>
            <Text style={styles.detailValue}>{details.weekly}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monthly savings:</Text>
            <Text style={styles.detailValue}>{details.monthly}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Yearly savings:</Text>
            <Text style={styles.detailValue}>{details.yearly}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text style={styles.message}>
          You've saved enough to buy yourself a nice reward! Keep going!
        </Text>

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Keep Saving</Text>
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
    color: '#16A34A',
    marginLeft: 15,
    fontFamily: 'Gallant',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  detailsContainer: {
    marginBottom: 20,
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
    color: '#047857',
    fontFamily: 'Gallant',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4B5563',
    marginBottom: 20,
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

export default MoneyPopup;