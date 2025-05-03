import { Tabs } from "expo-router";
import '../global.css';
import { FontAwesome5 } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { View } from 'react-native';

// Interface pour les propriétés du composant TabBarIcon
interface TabBarIconProps {
  Icon: 'Feather' | 'FontAwesome5';
  name: string;
  color: string;
  focused: boolean;
}

// Composant personnalisé pour l'icône de la barre de navigation
const TabBarIcon = ({ Icon, name, color, focused }: TabBarIconProps) => {
  const navBackgroundColor = '#E6FF99'; // Même couleur que le background de la barre
  
  return (
    <View style={{ 
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ translateY: focused ? -10 : 0 }],
      marginTop: focused ? 0 : 10
    }}>
      {focused && (
        <View style={{
          position: 'absolute',
          top: -15,
          width: 90, 
          height: 30,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: navBackgroundColor,
        }} />
      )}
      {Icon === 'Feather' ? (
        // @ts-ignore - Ignorer les problèmes de typage pour les noms d'icônes
        <Feather name={name} size={24} color={color} />
      ) : (
        // @ts-ignore - Ignorer les problèmes de typage pour les noms d'icônes
        <FontAwesome5 name={name} size={24} color={color} />
      )}
    </View>
  );
};

export default function RootLayout() {
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
        title: 'Paramètres',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon Icon="FontAwesome5" name="cog" color={color} focused={focused} />
        ),
      }}
      />
    </Tabs>
  );
}

