import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WebSlider from '../assets/components/WebSlider';

type FeedbackType = 'cigarettes' | 'confidence' | 'craving';

interface PreviousResponses {
  cigarettesCount: number;
  confidence: number;
  craving: number;
  streak: number;
  lastCheckIn: Date | null;
}

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
  const [previousResponses, setPreviousResponses] = useState<PreviousResponses>({
    cigarettesCount: 0,
    confidence: 5,
    craving: 5,
    streak: 0,
    lastCheckIn: null
  });
  const [messages, setMessages] = useState<Array<{text: string, isBot: boolean}>>([]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BrugtyDemoRegular: require("../assets/fonts/BrugtyDemoRegular.ttf"),
        Gallant: require("../assets/fonts/Kingthings_Organica.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();

    // Initialize welcome message based on streak
    if (previousResponses.streak === 0) {
      setMessages([{ text: "Welcome! Let's start your journey to quit smoking together. 🌟", isBot: true }]);
    } else {
      setMessages([{ text: "Welcome back! Let's check in on your progress today. 💪", isBot: true }]);
    }
  }, []);

  const checkStreak = (lastCheckIn: Date | null): number => {
    if (!lastCheckIn) return 0;
    
    const now = new Date();
    const hoursSinceLastCheckIn = (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);
    
    // If more than 48 hours have passed, reset streak
    if (hoursSinceLastCheckIn > 48) return 0;
    
    // If less than 24 hours have passed since last check-in, maintain current streak
    // This prevents multiple check-ins or corrections from affecting the streak
    if (hoursSinceLastCheckIn < 24) return previousResponses.streak;
    
    // If between 24-48 hours, increment streak by 1
    return previousResponses.streak + 1;
  };

  const getFeedbackMessage = (currentValue: number, previousValue: number, type: FeedbackType): string => {
    const difference = currentValue - previousValue;
    const percentageChange = previousValue ? ((difference / previousValue) * 100) : 0;

    if (type === 'cigarettes') {
      if (currentValue === 0) {
        return "Amazing! You're completely smoke-free today! 🌟\n\nTip: Keep a water bottle handy to help manage any cravings.";
      } else if (currentValue < previousValue) {
        if (percentageChange <= -50) {
          return `Incredible progress! You've reduced your smoking by ${Math.abs(percentageChange).toFixed(1)}%! Keep this momentum going! 🎉\n\nTip: Try deep breathing exercises when you feel the urge to smoke.`;
        } else if (percentageChange <= -25) {
          return `Great job! You've cut down by ${Math.abs(percentageChange).toFixed(1)}%. Every reduction counts! 💪\n\nTip: Stay hydrated and take short walks to help manage cravings.`;
        } else {
          return `Good progress! You're smoking ${Math.abs(difference)} fewer cigarettes today. Keep it up! 👍\n\nTip: Reward yourself with something healthy for each cigarette you don't smoke.`;
        }
      } else if (currentValue > previousValue) {
        if (percentageChange >= 50) {
          return `I notice you're smoking more today. Remember, setbacks are part of the journey. 🤝\n\nTip: Try to identify your triggers and have a plan ready for next time.`;
        } else {
          return `I see a small increase in smoking today. Remember, every day is a new opportunity. 💭\n\nTip: Keep track of when you smoke to help identify patterns.`;
        }
      } else {
        return "You're maintaining the same level. 🌱\n\nTip: Try setting a specific time to reduce your next cigarette by 30 minutes.";
      }
    } else if (type === 'confidence') {
      if (currentValue > previousValue) {
        return `Your confidence is growing! That's fantastic! 🌟\n\nTip: Write down your achievements to remind yourself of your progress.`;
      } else if (currentValue < previousValue) {
        return `I notice your confidence has dipped a bit. Remember, it's normal to have ups and downs. 🤔\n\nTip: Focus on your past successes and the reasons you want to quit.`;
      } else {
        return "Your confidence is stable. 💪\n\nTip: Visualize your smoke-free future to boost your motivation.";
      }
    } else if (type === 'craving') {
      if (currentValue < previousValue) {
        return `Great! Your cravings are decreasing. Keep using those coping strategies! 🎯\n\nTip: Stay active and keep your hands busy to help manage cravings.`;
      } else if (currentValue > previousValue) {
        return `I see your cravings are stronger today. Remember, this too shall pass. 🌊\n\nTip: Try the 4 D's: Delay, Deep breathe, Drink water, Do something else.`;
      } else {
        return "Your cravings are at the same level. 🧘‍♂️\n\nTip: Practice mindfulness techniques to help manage cravings when they occur.";
      }
    }
    return "";
  };

  const getStreakMessage = (streak: number): string => {
    if (streak === 0) {
      return "Let's start your smoke-free journey today! 🌱\n\nTip: Set a specific goal for your first smoke-free day.";
    }
    if (streak === 1) {
      return "You've completed your first day! Keep going! 🌟\n\nTip: Celebrate this first day and plan your strategy for tomorrow.";
    }
    if (streak < 7) {
      return `You're on a ${streak}-day streak! Every day smoke-free is a victory! 🎉\n\nTip: Keep a list of reasons to quit handy for when motivation wanes.`;
    }
    if (streak < 30) {
      return `Incredible! ${streak} days smoke-free! You're building a healthier future! 💪\n\nTip: Share your success with friends and family for extra support.`;
    }
    return `Outstanding! ${streak} days of freedom from smoking! You're an inspiration! 🌈\n\nTip: Help others on their journey to quit smoking.`;
  };

  const logCheckinLevels = async () => {
    console.log('Cigarettes smoked:', cigarettesCount);
    console.log('Confidence level:', confidence);
    console.log('Craving level:', craving);
    try {
      const response = await axios.post('http://localhost:3000/daily', {
        cigarettesCount: cigarettesCount,
        confidence: confidence,
        craving: craving,
        streak: previousResponses.streak
      });
      console.log('Axios POST response:', response.data);
    } catch (error) {
      console.error('Axios POST error:', error);
    }
  };

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
          const currentCount = parseInt(cigarettesCount);
          const feedback = getFeedbackMessage(currentCount, previousResponses.cigarettesCount, 'cigarettes');
          const streakMessage = getStreakMessage(previousResponses.streak);
          
          setMessages(prev => [...prev, 
            { text: cigarettesCount, isBot: false },
            { text: feedback, isBot: true },
            { text: streakMessage, isBot: true },
            { text: "On a scale of 1-10, how confident do you feel about tomorrow?", isBot: true }
          ]);
          setStep(2);
        }
        break;
      case 2:
        const confidenceFeedback = getFeedbackMessage(confidence, previousResponses.confidence, 'confidence');
        setMessages(prev => [...prev, 
          { text: `Confidence level: ${confidence}/10`, isBot: false },
          { text: confidenceFeedback, isBot: true },
          { text: "Last question: On a scale of 1-10, how strong is your craving right now?", isBot: true }
        ]);
        setStep(3);
        break;
      case 3:
        const cravingFeedback = getFeedbackMessage(craving, previousResponses.craving, 'craving');
        const finalMessage = parseInt(cigarettesCount) < previousResponses.cigarettesCount 
          ? "You're making real progress! Keep up the great work! 🌟\n\nRemember: Every cigarette not smoked is a victory. Stay strong!"
          : "Remember, every day is a new opportunity to make progress. I believe in you! 💪\n\nFocus on your goals and take it one day at a time.";
        
        setMessages(prev => [...prev, 
          { text: `Craving level: ${craving}/10`, isBot: false },
          { text: cravingFeedback, isBot: true },
          { text: finalMessage, isBot: true }
        ]);
        
        // Update previous responses with new streak calculation
        const newStreak = checkStreak(previousResponses.lastCheckIn);
        setPreviousResponses(prev => ({
          ...prev,
          cigarettesCount: parseInt(cigarettesCount),
          confidence: confidence,
          craving: craving,
          streak: newStreak,
          lastCheckIn: new Date()
        }));
        
        setStep(4);
        logCheckinLevels();
        break;
    }
  };

  const handleCorrection = () => {
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
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity 
              style={[styles.correctionButton, { marginBottom: 24 }]}
              onPress={handleCorrection}
            >
              <Text style={styles.correctionButtonText}>
                Corriger mon check-in
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}