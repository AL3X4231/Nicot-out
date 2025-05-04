import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AccountDetailsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  userDetails?: {
    username: string;
    email: string;
    joinDate: string;
    phoneNumber?: string;
  };
}

const { width, height } = Dimensions.get('window');

const AccountDetailsPopup = ({ 
  isVisible, 
  onClose, 
  userDetails = {
    username: 'user4278',
    email: 'user@example.com',
    joinDate: 'May 1, 2025',
    phoneNumber: '',
  }
}: AccountDetailsPopupProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [username, setUsername] = useState(userDetails.username);
  const [email, setEmail] = useState(userDetails.email);
  const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber || '');
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
    // For now, we just toggle editing mode
    setIsEditing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
          <Text style={styles.title}>Account Details</Text>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => !isEditing && setIsEditing(true)}
          >
            <FontAwesome5 name="edit" size={18} color="#1D4ED8" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://ui-avatars.com/api/?name=User&background=D3FD51&color=1D4ED8&size=200' }}
              style={styles.profileImage}
            />
            {isEditing && (
              <TouchableOpacity style={styles.changePhotoButton}>
                <Text style={styles.changePhotoText}>Change photo</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.label}>Username</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.value}>{username}</Text>
            )}
            
            <View style={styles.separator} />

            <Text style={styles.label}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.value}>{email}</Text>
            )}
            
            <View style={styles.separator} />

            <Text style={styles.label}>Phone Number (optional)</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholder="Add phone number"
                placeholderTextColor="#9CA3AF"
              />
            ) : (
              <Text style={styles.value}>
                {phoneNumber || 'Not provided'}
              </Text>
            )}
            
            <View style={styles.separator} />

            <Text style={styles.label}>Member Since</Text>
            <Text style={styles.value}>{userDetails.joinDate}</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          {isEditing ? (
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={handleSaveChanges}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={[styles.button, styles.dangerButton]}>
                <Text style={[styles.buttonText, styles.dangerButtonText]}>Delete Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.logoutButton]}>
                <Text style={[styles.buttonText, styles.logoutButtonText]}>Log Out</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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
  profileSection: {
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D3FD51',
  },
  changePhotoButton: {
    marginTop: 10,
    padding: 5,
  },
  changePhotoText: {
    color: '#1D4ED8',
    fontFamily: 'Gallant',
    fontSize: 14,
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Gallant',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Gallant',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  actionsSection: {
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 5,
  },
  saveButton: {
    backgroundColor: '#D3FD51',
  },
  dangerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Gallant',
  },
  dangerButtonText: {
    color: '#EF4444',
  },
  logoutButtonText: {
    color: '#4B5563',
  },
});

export default AccountDetailsPopup;