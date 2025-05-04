import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WebSlider from '../assets/components/WebSlider';

const styles = StyleSheet.create({
  TitleText: {
    fontFamily: "BrugtyDemoRegular",
  },
  insideText: {
    fontFamily: 'Gallant'
  },
  chatBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
    fontFamily: 'Gallant',
  },
  correctionButton: {
    backgroundColor: '#E5E7EB',  // Gris clair plus subtil
    padding: 10,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  correctionButtonText: {
    color: '#4B5563',  // Gris foncé pour le texte
    fontFamily: 'Gallant',
    fontSize: 14,
  },
});

const SliderComponent = Platform.select({
  web: WebSlider,
  default: Slider,
});

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [step, setStep] = useState(0);
  const [cigarettesCount, setCigarettesCount] = useState('');
  const [confidence, setConfidence] = useState(5);
  const [craving, setCraving] = useState(5);
  const [messages, setMessages] = useState([
    { text: "Hi! Let's talk about your progress today.", isBot: true }
  ]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BrugtyDemoRegular: require("../assets/fonts/BrugtyDemoRegular.ttf"),
        Gallant: require("../assets/fonts/Kingthings_Organica.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const handleNextStep = () => {
    switch(step) {
      case 0:
        setMessages(prev => [...prev, 
          { text: "How many cigarettes did you smoke today?", isBot: true }
        ]);
        setStep(1);
        break;
      case 1:
        if (cigarettesCount) {
          setMessages(prev => [...prev, 
            { text: cigarettesCount, isBot: false },
            { text: "On a scale of 1-10, how confident do you feel about tomorrow?", isBot: true }
          ]);
          setStep(2);
        }
        break;
      case 2:
        setMessages(prev => [...prev, 
          { text: `Confidence level: ${confidence}/10`, isBot: false },
          { text: "Last question: On a scale of 1-10, how strong is your craving right now?", isBot: true }
        ]);
        setStep(3);
        break;
      case 3:
        setMessages(prev => [...prev, 
          { text: `Craving level: ${craving}/10`, isBot: false },
          { text: "Thank you for sharing! Keep going, you're doing great!", isBot: true }
        ]);
        setStep(4);
        break;
    }
  };

  const handleCorrection = () => {
    // Réinitialiser toutes les valeurs pour permettre à l'utilisateur de recommencer
    setCigarettesCount('');
    setConfidence(5);
    setCraving(5);
    setMessages([
      { text: "Hi! Let's correct your check-in for today.", isBot: true },
      { text: "How many cigarettes did you smoke today?", isBot: true }
    ]);
    setStep(1);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Welcome Header */}
        <View className="flex-row items-center bg-white mb-4">
          <Text style={styles.TitleText} className="text-3xl text-blue-700">
            Daily Check-in
          </Text>
        </View>

        {/* Welcome Message Box */}
        <View className="flex-row rounded-xl bg-blue-200 py-4 px-4 mb-6 items-center">
          <Ionicons name="chatbubble-ellipses-outline" size={24}
           />
          <Text style={styles.insideText} className="ml-2 ">
            Let's track your progress today
          </Text>
        </View>

        {/* Chat Messages */}
        <View className="mt-4">
          {messages.map((message, index) => (
            <View key={index} 
              className={`flex-row ${message.isBot ? 'justify-start' : 'justify-end'} mb-3`}
            >
              <View 
                className={`${
                  message.isBot 
                    ? 'bg-blue-100 rounded-tr-xl rounded-tl-xl rounded-br-xl' 
                    : 'bg-green-100 rounded-tl-xl rounded-tr-xl rounded-bl-xl'
                } px-4 py-3`}
              >
                <Text style={styles.insideText} className="text-gray-800">
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Input Section */}
        {step < 4 && (
          <View className="flex-row items-center mt-6 mb-4">
            {step === 1 && (
              <TextInput
                style={styles.input}
                value={cigarettesCount}
                onChangeText={setCigarettesCount}
                keyboardType="numeric"
                placeholder="Enter number of cigarettes"
                placeholderTextColor="#9CA3AF"
              />
            )}
            {(step === 2 || step === 3) && (
              <View className="flex-1">
                <SliderComponent
                  style={{height: 40}}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={step === 2 ? confidence : craving}
                  onValueChange={step === 2 ? setConfidence : setCraving}
                  minimumTrackTintColor="#1D4ED8"
                  maximumTrackTintColor="#E5E7EB"
                  thumbTintColor="#1D4ED8"
                />
                <Text style={styles.insideText} className="text-center text-gray-600 mt-2">
                  {step === 2 ? confidence : craving}/10
                </Text>
              </View>
            )}
            <TouchableOpacity 
              className="bg-blue-700 px-6 py-3 rounded-xl ml-2"
              onPress={handleNextStep}
            >
              <Text style={styles.insideText} className="text-white">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Espace pour pousser le bouton vers le bas */}
        {step === 4 && <View style={{ flex: 1, minHeight: 40 }} />}

        {/* Correction Button - plus discret et en bas de page */}
        {step === 4 && (
          <TouchableOpacity 
            style={styles.correctionButton}
            onPress={handleCorrection}
          >
            <Text style={styles.correctionButtonText}>
              Corriger mon check-in
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}