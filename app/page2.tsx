import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AchievementPopup from '../assets/components/AchievementPopup';
import CravingsStatsPopup from '../assets/components/CravingsStatsPopup';

const styles = StyleSheet.create({
  TitleText: {
    fontFamily: "BrugtyDemoRegular",
  },
  insideText: {
    fontFamily: 'Gallant'
  },
  gradientCard: {
    backgroundColor: '#E8FFB0',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  statTitle: {
    fontFamily: 'BrugtyDemoRegular',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Gallant',
    fontSize: 20,
    color: '#666',
  }
});

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [showCravingsPopup, setShowCravingsPopup] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BrugtyDemoRegular: require("../assets/fonts/BrugtyDemoRegular.ttf"),
        Gallant: require("../assets/fonts/Kingthings_Organica.ttf")
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
        <Text style={styles.TitleText} className="text-4xl text-blue-700 mb-6">
          Statistics Today
        </Text>
        {/* Cravings Statistics Card */}
        <TouchableOpacity onPress={() => setShowCravingsPopup(true)} activeOpacity={0.85}>
          <View style={[styles.gradientCard, { height: 200 }]}>
            <Text style={styles.statTitle}>Cravings Statistic</Text>
            <Text style={styles.statValue} className="mb-4">6 Cravings on May 21</Text>
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [{
                  data: [20, 25, 17, 19, 7]
                }]
              }}
              width={Dimensions.get("window").width - 48}
              height={100}
              chartConfig={{
                backgroundColor: "#E8FFB0",
                backgroundGradientFrom: "#E8FFB0",
                backgroundGradientTo: "#E8FFB0",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#6366F1"
                },
                propsForBackgroundLines: {
                  strokeDasharray: "", // Solid lines
                  stroke: "#D1D5DB",  // Light gray lines
                  strokeOpacity: 0.4
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
        </TouchableOpacity>

        {/* Absorbed Substances Card */}
        <View style={styles.gradientCard}>
          <Text style={styles.statTitle}>Absorbed Substances</Text>
          <Text style={styles.statValue}>0.89 mg this week</Text>
        </View>

        {/* Smoked Cigarettes Card */}
        <View style={styles.gradientCard}>
          <Text style={styles.statTitle}>Smoked Cigarettes</Text>
          <Text style={styles.statValue}>13 cigarettes attempted</Text>
        </View>

        {/* Stay Clean Card */}
        <View style={styles.gradientCard}>
          <Text style={styles.statTitle}>Stay Clean For</Text>
          <Text style={styles.statValue}>120 Days</Text>
        </View>

        {/* Achievement Card */}
        <TouchableOpacity onPress={() => setShowAchievementPopup(true)} activeOpacity={0.85}>
          <View style={styles.gradientCard}>
            <Text style={styles.statTitle}>Achievement Unlocked</Text>
            <Text style={styles.statValue}>5 / 250 Achievement</Text>
          </View>
        </TouchableOpacity>

        {/* Emotions Card */}
        <View style={styles.gradientCard}>
          <Text style={styles.statTitle}>Emotions</Text>
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="emoticon" size={24} color="#6366F1" />
            <Text style={styles.statValue} className="ml-2">Somewhat Confident</Text>
          </View>
        </View>
      </ScrollView>
      <AchievementPopup isVisible={showAchievementPopup} onClose={() => setShowAchievementPopup(false)} />
      <CravingsStatsPopup isVisible={showCravingsPopup} onClose={() => setShowCravingsPopup(false)} />
    </>
  );
}