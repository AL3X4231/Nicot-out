import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ShareAppPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const ShareOption = ({ 
  icon, 
  title, 
  color,
  onPress 
}: { 
  icon: string; 
  title: string; 
  color: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.shareOption} onPress={onPress}>
    <View style={[styles.shareIconContainer, { backgroundColor: color }]}>
      <FontAwesome5 name={icon} size={24} color="white" />
    </View>
    <Text style={styles.shareOptionText}>{title}</Text>
  </TouchableOpacity>
);

const ShareAppPopup = ({ isVisible, onClose }: ShareAppPopupProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [shareSuccess, setShareSuccess] = useState(false);

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
      
      if (shareSuccess) {
        setShareSuccess(false);
      }
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleShare = (platform: string) => {
    // This would normally trigger platform-specific sharing
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShareSuccess(true);
    
    // Normally we would track this share event
    console.log(`Shared via ${platform}`);
  };

  const handleClose = () => {
    setShareSuccess(false);
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
          <Text style={styles.title}>Share Nicot'Out</Text>
        </View>

        {shareSuccess ? (
          <View style={styles.successContainer}>
            <FontAwesome5 name="heart" size={60} color="#EC4899" style={styles.successIcon} />
            <Text style={styles.successTitle}>Thank You!</Text>
            <Text style={styles.successMessage}>
              Your support helps more people discover Nicot'Out and begin their journey to quit smoking. Together we can save lives.
            </Text>
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={handleClose}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.contentSection}>
              <Image 
                source={require('../images/splash-icon.png')} 
                style={styles.appLogo} 
                resizeMode="contain"
              />

              <Text style={styles.impactTitle}>Make an Impact</Text>
              <Text style={styles.impactDescription}>
                Smoking claims millions of lives each year. By sharing Nicot'Out, you're not just sharing an app - you're potentially saving lives. Help someone start their quit journey today.
              </Text>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>1.3 billion</Text>
                  <Text style={styles.statLabel}>smokers worldwide</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>8 million</Text>
                  <Text style={styles.statLabel}>deaths per year</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>70%</Text>
                  <Text style={styles.statLabel}>want to quit</Text>
                </View>
              </View>

              <Text style={styles.shareTitle}>Share via</Text>
              <View style={styles.shareOptionsContainer}>
                <ShareOption 
                  icon="whatsapp" 
                  title="WhatsApp" 
                  color="#25D366"
                  onPress={() => handleShare('WhatsApp')}
                />
                <ShareOption 
                  icon="facebook-messenger" 
                  title="Messenger" 
                  color="#0078FF"
                  onPress={() => handleShare('Messenger')}
                />
                <ShareOption 
                  icon="twitter" 
                  title="Twitter" 
                  color="#1DA1F2"
                  onPress={() => handleShare('Twitter')}
                />
                <ShareOption 
                  icon="instagram" 
                  title="Instagram" 
                  color="#E1306C"
                  onPress={() => handleShare('Instagram')}
                />
              </View>

              <View style={styles.otherOptionsContainer}>
                <ShareOption 
                  icon="envelope" 
                  title="Email" 
                  color="#6366F1"
                  onPress={() => handleShare('Email')}
                />
                <ShareOption 
                  icon="link" 
                  title="Copy Link" 
                  color="#6B7280"
                  onPress={() => handleShare('Copy Link')}
                />
                <ShareOption 
                  icon="qrcode" 
                  title="QR Code" 
                  color="#111827"
                  onPress={() => handleShare('QR Code')}
                />
                <ShareOption 
                  icon="ellipsis-h" 
                  title="More" 
                  color="#9333EA"
                  onPress={() => handleShare('More')}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => handleShare('Default')}
            >
              <FontAwesome5 name="share-alt" size={18} color="#1F2937" style={styles.shareButtonIcon} />
              <Text style={styles.shareButtonText}>Share Now</Text>
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
    marginBottom: 16,
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
  contentSection: {
    marginBottom: 20,
  },
  appLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    fontFamily: 'Gallant',
    marginBottom: 8,
  },
  impactDescription: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Gallant',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D4ED8',
    fontFamily: 'Gallant',
  },
  statLabel: {
    fontSize: 12,
    color: '#4B5563',
    fontFamily: 'Gallant',
    textAlign: 'center',
    maxWidth: 90,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#D1D5DB',
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Gallant',
    marginBottom: 12,
  },
  shareOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  otherOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shareOption: {
    alignItems: 'center',
    width: 70,
  },
  shareIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  shareOptionText: {
    fontSize: 12,
    color: '#4B5563',
    fontFamily: 'Gallant',
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#D3FD51',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  shareButtonIcon: {
    marginRight: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Gallant',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#4B5563',
    fontFamily: 'Gallant',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  doneButton: {
    backgroundColor: '#D3FD51',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'Gallant',
  },
});

export default ShareAppPopup;