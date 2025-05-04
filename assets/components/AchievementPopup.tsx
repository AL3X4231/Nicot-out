import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AchievementPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const fakeAchievements = [
  {
    icon: 'medal',
    color: '#FFD700',
    title: 'First Step',
    description: 'You unlocked your first achievement!'
  },
  {
    icon: 'fire',
    color: '#EF4444',
    title: 'On Fire!',
    description: '3 days without smoking.'
  },
  {
    icon: 'trophy',
    color: '#6366F1',
    title: 'Milestone',
    description: 'You reached 100 cigarettes not smoked.'
  },
  {
    icon: 'star',
    color: '#FBBF24',
    title: 'Consistency',
    description: 'Logged your progress 7 days in a row.'
  }
];

const AchievementPopup = ({ isVisible, onClose }: AchievementPopupProps) => {
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
      <Animated.View style={[styles.popup, { transform: [{ translateY }] }]}>  
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome5 name="times" size={20} color="#1D4ED8" />
          </TouchableOpacity>
          <Text style={styles.title}>Achievement Unlocked!</Text>
        </View>
        <View style={styles.achievementsList}>
          {fakeAchievements.map((ach, idx) => (
            <View key={idx} style={styles.achievementItem}>
              <View style={[styles.iconCircle, { backgroundColor: ach.color }]}>  
                <FontAwesome5 name={ach.icon as any} size={24} color="#fff" />
              </View>
              <View style={styles.achievementText}>
                <Text style={styles.achievementTitle}>{ach.title}</Text>
                <Text style={styles.achievementDesc}>{ach.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
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
    padding: 24,
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
  achievementsList: {
    marginBottom: 24,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D4ED8',
    fontFamily: 'Gallant',
  },
  achievementDesc: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  button: {
    backgroundColor: '#D3FD51',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  },
});

export default AchievementPopup;
