import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ReportBugPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const BugSeverityOption = ({ 
  title, 
  description, 
  value, 
  selected, 
  onSelect,
  icon,
  color
}: { 
  title: string;
  description: string;
  value: string;
  selected: boolean;
  onSelect: () => void;
  icon: string;
  color: string;
}) => (
  <TouchableOpacity 
    style={[
      styles.severityOption,
      selected && styles.severityOptionSelected
    ]} 
    onPress={onSelect}
  >
    <MaterialIcons name={icon} size={24} color={color} style={styles.severityIcon} />
    <View style={styles.severityContent}>
      <Text style={styles.severityTitle}>{title}</Text>
      <Text style={styles.severityDescription}>{description}</Text>
    </View>
    <View style={[
      styles.radioButton,
      selected && styles.radioButtonSelected
    ]}>
      {selected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
);

const ReportBugPopup = ({ isVisible, onClose }: ReportBugPopupProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [bugTitle, setBugTitle] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
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
        setBugTitle('');
        setBugDescription('');
        setSeverity('medium');
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
    // This would normally send the bug report to a backend
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSubmitted(true);
  };

  const handleClose = () => {
    setBugTitle('');
    setBugDescription('');
    setSeverity('medium');
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
          <Text style={styles.title}>Report a Bug</Text>
        </View>

        {submitted ? (
          <View style={styles.thankYouContainer}>
            <FontAwesome5 name="bug" size={60} color="#1D4ED8" style={styles.thankYouIcon} />
            <Text style={styles.thankYouTitle}>Bug Reported!</Text>
            <Text style={styles.thankYouMessage}>
              Thank you for helping us improve Nicot'Out. Our team will investigate this issue and fix it as soon as possible.
            </Text>
            <TouchableOpacity 
              style={styles.closeThankYouButton}
              onPress={handleClose}
            >
              <Text style={styles.closeThankYouButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Help us squash bugs</Text>
              <Text style={styles.description}>
                Found something that's not working right? Please let us know the details so we can fix it quickly.
              </Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Issue Title</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Short description of the problem"
                  placeholderTextColor="#9CA3AF"
                  value={bugTitle}
                  onChangeText={setBugTitle}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Steps to Reproduce</Text>
                <TextInput 
                  style={[styles.input, styles.textArea]}
                  placeholder="1. Go to...\n2. Click on...\n3. Observe that..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  value={bugDescription}
                  onChangeText={setBugDescription}
                />
              </View>

              <View style={styles.severitySection}>
                <Text style={styles.label}>How severe is this issue?</Text>
                
                <BugSeverityOption
                  title="Low"
                  description="Cosmetic issue or minor inconvenience"
                  value="low"
                  selected={severity === 'low'}
                  onSelect={() => setSeverity('low')}
                  icon="error-outline"
                  color="#60A5FA"
                />
                
                <BugSeverityOption
                  title="Medium"
                  description="Functionality is limited or behaving incorrectly"
                  value="medium"
                  selected={severity === 'medium'}
                  onSelect={() => setSeverity('medium')}
                  icon="warning-amber"
                  color="#FBBF24"
                />
                
                <BugSeverityOption
                  title="High"
                  description="Critical feature not working or app crashes"
                  value="high"
                  selected={severity === 'high'}
                  onSelect={() => setSeverity('high')}
                  icon="priority-high"
                  color="#EF4444"
                />
              </View>

              <View style={styles.deviceInfoSection}>
                <Text style={styles.infoTitle}>Device Information (automatically attached):</Text>
                <Text style={styles.infoText}>• Device: iPhone 14 Pro</Text>
                <Text style={styles.infoText}>• OS Version: iOS 16.5.1</Text>
                <Text style={styles.infoText}>• App Version: 1.0.0</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[
                styles.submitButton,
                (!bugTitle || !bugDescription) && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={!bugTitle || !bugDescription}
            >
              <Text style={[
                styles.submitButtonText,
                (!bugTitle || !bugDescription) && styles.disabledButtonText
              ]}>
                Submit Bug Report
              </Text>
            </TouchableOpacity>
          </ScrollView>
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
  severitySection: {
    marginBottom: 16,
  },
  severityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  severityOptionSelected: {
    borderColor: '#1D4ED8',
    backgroundColor: '#EFF6FF',
  },
  severityIcon: {
    marginRight: 12,
  },
  severityContent: {
    flex: 1,
  },
  severityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Gallant',
  },
  severityDescription: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#1D4ED8',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1D4ED8',
  },
  deviceInfoSection: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Gallant',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: '#D3FD51',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
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

export default ReportBugPopup;