import { StyleSheet, Text, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

const styles = StyleSheet.create({
  TitleText: {
    fontFamily: "BrugtyDemoRegular",
    // Suppression des styles qui entrent en conflit avec TailwindCSS
  },
  insideText: {
    fontFamily: 'Gallant'
  }
});

const CircularProgress = ({ percentage, size = 80 }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressStroke = ((100 - percentage) / 100) * circumference;
  
    return (
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#DBEAFE"  // blue-100 for background
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1D4ED8"  // blue-700 for progress
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progressStroke}
            strokeLinecap="round"
            transform={`rotate(-90 ${size/2} ${size/2})`}
          />
        </Svg>
        <View style={{ 
          position: 'absolute', 
          width: size, 
          height: size, 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <Text style={styles.insideText} className="text-xl font-bold">{percentage}%</Text>
        </View>
      </View>
    );
  };

export default CircularProgress;