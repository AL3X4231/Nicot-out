import { FontAwesome5 } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import * as Font from 'expo-font';
import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';

// Interface pour les propriétés du composant TabBarIcon
interface TabBarIconProps {
  Icon: 'Feather' | 'FontAwesome5';
  name: string;
  color: string;
  focused: boolean;
}

// Composant personnalisé pour l'icône de la barre de navigation
const TabBarIcon = ({ Icon, name, color, focused }: TabBarIconProps) => {
  const navBackgroundColor = '#E6FF99'; // Couleur de fond de la barre
  const iconSize = 24;
  
  return (
    <Animated.View style={{ 
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ translateY: focused ? -18 : 0 }],
      marginTop: focused ? 0 : 10
    }}>
      {focused && (
        <View style={{
          position: 'absolute',
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#ffffff',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }} />
      )}
      
      <View style={{
        width: focused ? 50 : 45,
        height: focused ? 50 : 45,
        borderRadius: 25,
        backgroundColor: focused ? navBackgroundColor : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}>
        {Icon === 'Feather' ? (
          // @ts-ignore - Ignorer les problèmes de typage pour les noms d'icônes
          <Feather name={name} size={focused ? iconSize + 4 : iconSize} color={focused ? '#1d4ed8' : color} />
        ) : (
          // @ts-ignore - Ignorer les problèmes de typage pour les noms d'icônes
          <FontAwesome5 name={name} size={focused ? iconSize + 4 : iconSize} color={focused ? '#1d4ed8' : color} />
        )}
      </View>
    </Animated.View>
  );
};

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [showAppName, setShowAppName] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showReadPolicy, setShowReadPolicy] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const logoAnim = React.useRef(new Animated.Value(1)).current;
  const buttonAnim = React.useRef(new Animated.Value(1)).current;
  const appNameAnim = React.useRef(new Animated.Value(0)).current;
  const readPolicyAnim = React.useRef(new Animated.Value(0)).current;
  
  // Nouvelles animations pour l'entrée et la sortie du logo
  const logoEntranceAnim = React.useRef(new Animated.Value(0)).current; // Pour l'entrée avec rebond
  const logoRotationAnim = React.useRef(new Animated.Value(0)).current; // Pour la rotation lors de la sortie
  
  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        KingthingsOrganica: require('../assets/fonts/Kingthings_Organica.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 2000); // 2s noir
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (showLogo) {
      // Animation d'entrée avec rebond et opacité
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoEntranceAnim, {
          toValue: 1,
          friction: 5, // Plus la valeur est basse, plus l'effet de rebond est prononcé
          tension: 40,
          useNativeDriver: true,
        })
      ]).start(() => setCanProceed(true));
    }
  }, [showLogo]);

  // Animation d'entrée du nom de l'app
  useEffect(() => {
    if (showAppName) {
      // Animation de rotation pour la sortie du logo
      Animated.timing(logoRotationAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      
      // Fade out logo and button
      Animated.parallel([
        Animated.timing(logoAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        })
      ]).start(() => {
        // Fade in app name
        Animated.timing(appNameAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            setShowReadPolicy(true);
            Animated.timing(readPolicyAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }).start();
          }, 700);
        });
      });
    }
  }, [showAppName]);

  // Affichage de la page de politique
  if (showPolicy) {
    return (
      <View style={styles.policyContainer}>
        <Animated.ScrollView 
          style={{flex: 1, width: '100%', paddingHorizontal: 20}}
          contentContainerStyle={{paddingVertical: 40}}
          showsVerticalScrollIndicator={true}
        >
          <Animated.Text style={{ color: '#D2C0EA', fontSize: 28, marginBottom: 20, textAlign: 'center', fontWeight: 'bold', opacity: fadeAnim }}>
            Politique de Confidentialité
          </Animated.Text>
          
          <Animated.Text style={{ color: 'white', fontSize: 16, marginBottom: 15, lineHeight: 22, opacity: fadeAnim }}>
            Bienvenue dans NICOT'OUT, votre compagnon pour arrêter de fumer. Notre mission est de vous aider à vivre une vie sans tabac.
          </Animated.Text>
          
          <Animated.Text style={{ color: 'white', fontSize: 16, marginBottom: 15, lineHeight: 22, opacity: fadeAnim }}>
            <Text style={{fontWeight: 'bold', color: '#D2C0EA'}}>Données collectées :</Text>{'\n'}
            • Données de progression : jours sans tabac, cigarettes évitées{'\n'}
            • Économies réalisées{'\n'}
            • Objectifs personnels{'\n'}
            • État de santé auto-évalué
          </Animated.Text>
          
          <Animated.Text style={{ color: 'white', fontSize: 16, marginBottom: 15, lineHeight: 22, opacity: fadeAnim }}>
            <Text style={{fontWeight: 'bold', color: '#D2C0EA'}}>Utilisation des données :</Text>{'\n'}
            Nous utilisons ces informations uniquement pour vous aider dans votre parcours d'arrêt du tabac, en vous proposant des conseils personnalisés et en suivant votre progression.
          </Animated.Text>
          
          <Animated.Text style={{ color: 'white', fontSize: 16, marginBottom: 15, lineHeight: 22, opacity: fadeAnim }}>
            <Text style={{fontWeight: 'bold', color: '#D2C0EA'}}>Protection de la vie privée :</Text>{'\n'}
            Vos données personnelles ne sont jamais vendues à des tiers. Elles sont stockées de manière sécurisée et accessibles uniquement à notre équipe pour améliorer l'application.
          </Animated.Text>
          
          <Animated.Text style={{ color: 'white', fontSize: 16, marginBottom: 15, lineHeight: 22, opacity: fadeAnim }}>
            <Text style={{fontWeight: 'bold', color: '#D2C0EA'}}>Droit à l'oubli :</Text>{'\n'}
            Vous pouvez demander la suppression complète de vos données à tout moment depuis les paramètres de l'application.
          </Animated.Text>
          
          <Animated.Text style={{ color: 'white', fontSize: 16, marginBottom: 15, lineHeight: 22, opacity: fadeAnim }}>
            <Text style={{fontWeight: 'bold', color: '#D2C0EA'}}>Nous contacter :</Text>{'\n'}
            Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à privacy@nicotout.com
          </Animated.Text>
        </Animated.ScrollView>
        
        <TouchableOpacity
          style={[styles.letsGoButton, { backgroundColor: '#D2C0EA' }]}
          onPress={() => {
            setShowPolicy(false);
            setShowSplash(false);
          }}
        >
          <Text style={{ 
            color: 'black', 
            fontSize: 20, 
            fontWeight: 'bold',
            fontFamily: 'KingthingsOrganica'
          }}>
            Let's go
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showSplash) {
    return (
      <View style={{ flex: 1 }}>
        {!showLogo ? (
          <View style={styles.blackScreen} />
        ) : (
          <TouchableOpacity
            style={styles.logoScreen}
            activeOpacity={1}
            onPress={() => {
              if (!showAppName) setShowAppName(true);
            }}
          >
            {/* Logo animé */}
            {!showAppName && (
              <Animated.Image
                source={require('../assets/images/Vector.png')}
                style={[
                  styles.logo, 
                  { 
                    opacity: logoAnim,
                    transform: [
                      // Animation d'entrée avec rebond
                      { scale: logoEntranceAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 1]
                      })},
                      // Animation de rotation à la sortie 
                      { rotate: logoRotationAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg']
                      })}
                    ] 
                  }
                ]}
                resizeMode="contain"
              />
            )}
            {/* Nom de l'app animé */}
            {fontsLoaded && (
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                  display: showAppName ? 'flex' : 'none',
                  pointerEvents: 'none',
                }}
              >
                <Animated.Text
                  style={{
                    color: '#D2C0EA',
                    fontSize: 72, // Augmenté de 54 à 72
                    fontFamily: 'KingthingsOrganica',
                    opacity: appNameAnim,
                    transform: [{ scale: appNameAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
                    textAlign: 'center',
                    lineHeight: 84, // Ajusté pour maintenir un bon espacement
                  }}
                >
                  {`NICOT'\nOUT`}
                </Animated.Text>
              </Animated.View>
            )}
            {/* Texte 'Cliquez ici' en bas */}
            {fontsLoaded && !showAppName && (
              <Animated.View style={{
                opacity: buttonAnim,
                position: 'absolute',
                bottom: 40,
                width: '100%',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Cliquez ici</Text>
              </Animated.View>
            )}
            {/* Bouton Read Policy animé */}
            {showReadPolicy && (
              <Animated.View style={{
                opacity: readPolicyAnim,
                position: 'absolute',
                bottom: 40,
                left: 0,
                right: 0,
                alignItems: 'center',
                zIndex: 3,
              }}>
                <TouchableOpacity
                  style={[styles.splashButton, { backgroundColor: '#D2C0EA' }]}
                  onPress={() => setShowPolicy(true)}
                >
                  <Text style={{ 
                    color: 'black', 
                    fontSize: 18, 
                    fontWeight: 'bold',
                    fontFamily: 'KingthingsOrganica'
                  }}>
                    Read Privacy Policy Here !
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#1d4ed8',
      tabBarStyle: { 
        backgroundColor: '#E6FF99',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 8,
        shadowOpacity: 0.1,
        height: 60,
        paddingBottom: 5,
        paddingTop: 5
      },
      tabBarShowLabel: false, // Désactiver l'affichage des labels
    }}>
      <Tabs.Screen
      name="index"
      options={{
        title: 'Accueil',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon Icon="Feather" name="home" color={color} focused={focused} />
        ),
      }}
      />
      <Tabs.Screen
      name="page1"
      options={{
        title: 'Page 1',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon Icon="FontAwesome5" name="heart" color={color} focused={focused} />
        ),
      }}
      />
      <Tabs.Screen
      name="page2"
      options={{
        title: 'Page 2',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon Icon="FontAwesome5" name="star" color={color} focused={focused} />
        ),
      }}
      />
      <Tabs.Screen
      name="page3"
      options={{
        title: 'Settings',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon Icon="Feather" name="settings" color={color} focused={focused} />
        ),
      }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  blackScreen: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  logoScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 200,
  },
  policyContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  letsGoButton: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    backgroundColor: '#68DE30',
    borderRadius: 20,
    alignItems: 'center',
    padding: 16,
  },
  splashButton: {
    marginTop: 30,
    backgroundColor: '#222',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
});