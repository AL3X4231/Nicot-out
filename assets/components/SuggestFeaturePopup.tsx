import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SuggestFeaturePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const SuggestFeaturePopup = ({ isVisible, onClose }: SuggestFeaturePopupProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
      // Reset form state if popup is reopened
      if (submitted) {
        setSubmitted(false);
        setFeatureTitle('');
        setFeatureDescription('');
      }
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleSubmit = () => {
    // This would normally send the suggestion to a backend
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSubmitted(true);
  };

  const handleClose = () => {
    setFeatureTitle('');
    setFeatureDescription('');
    setSubmitted(false);
    onClose();
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
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <FontAwesome5 name="times" size={20} color="#1D4ED8" />
          </TouchableOpacity>
          <Text style={styles.title}>Suggest a Feature</Text>
        </View>

        {submitted ? (
          <View style={styles.thankYouContainer}>
            <FontAwesome5 name="check-circle" size={60} color="#68DE30" style={styles.thankYouIcon} />
            <Text style={styles.thankYouTitle}>Thank You!</Text>
            <Text style={styles.thankYouMessage}>
              Your feature suggestion has been submitted successfully. Our team will review it soon.
            </Text>
            <TouchableOpacity 
              style={styles.closeThankYouButton}
              onPress={handleClose}
            >
              <Text style={styles.closeThankYouButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Help us improve Nicot'Out</Text>
              <Text style={styles.description}>
                Do you have an idea for a feature that would help you or others quit smoking? 
                We'd love to hear about it!
              </Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Feature Title</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Enter a short title for your feature"
                  placeholderTextColor="#9CA3AF"
                  value={featureTitle}
                  onChangeText={setFeatureTitle}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput 
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe your feature idea in detail"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  value={featureDescription}
                  onChangeText={setFeatureDescription}
                />
              </View>

              <View style={styles.featureTipsContainer}>
                <Text style={styles.tipTitle}>Tips for good suggestions:</Text>
                <View style={styles.tipRow}>
                  <FontAwesome5 name="check" size={14} color="#68DE30" style={styles.tipIcon} />
                  <Text style={styles.tipText}>Be specific about what you want</Text>
                </View>
                <View style={styles.tipRow}>
                  <FontAwesome5 name="check" size={14} color="#68DE30" style={styles.tipIcon} />
                  <Text style={styles.tipText}>Explain how it would help you quit smoking</Text>
                </View>
                <View style={styles.tipRow}>
                  <FontAwesome5 name="check" size={14} color="#68DE30" style={styles.tipIcon} />
                  <Text style={styles.tipText}>Consider how other users might benefit too</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={[
                styles.submitButton,
                (!featureTitle || !featureDescription) && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={!featureTitle || !featureDescription}
            >
              <Text style={[
                styles.submitButtonText,
                (!featureTitle || !featureDescription) && styles.disabledButtonText
              ]}>
                Submit Suggestion
              </Text>
            </TouchableOpacity>
          </>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textAlign: 'center',
    fontFamily: 'Gallant',
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Gallant',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Gallant',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Gallant',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  featureTipsContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Gallant',
    marginBottom: 8,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  tipIcon: {
    marginRight: 8,
    marginTop: 3,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  submitButton: {
    backgroundColor: '#D3FD51',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
  thankYouContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  thankYouIcon: {
    marginBottom: 20,
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Gallant',
    marginBottom: 10,
  },
  thankYouMessage: {
    fontSize: 16,
    color: '#4B5563',
    fontFamily: 'Gallant',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  closeThankYouButton: {
    backgroundColor: '#D3FD51',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  closeThankYouButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  },
});

export default SuggestFeaturePopup;