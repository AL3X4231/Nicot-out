import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const RegistrationPage = ({ onFinish }: { onFinish?: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [birthDay, setBirthDay] = useState(1);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthYear, setBirthYear] = useState(2025);
  const [packetPrice, setPacketPrice] = useState('');
  const [perDay, setPerDay] = useState('');
  const [quitDate, setQuitDate] = useState(new Date(2021, 0, 1));
  const [motivation, setMotivation] = useState('');
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showQuitDatePicker, setShowQuitDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showAnimation, setShowAnimation] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [weight, setWeight] = useState('');
  const [smokingYears, setSmokingYears] = useState('');

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };
  const days = Array.from({ length: getDaysInMonth(birthMonth, birthYear) }, (_, i) => i + 1);
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const years = Array.from({ length: 2025 - 1920 + 1 }, (_, i) => 2025 - i);

  const onBirthDateChange = (event: any, selectedDate?: Date) => {
    setShowBirthDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
      setBirthDay(selectedDate.getDate());
      setBirthMonth(selectedDate.getMonth() + 1);
      setBirthYear(selectedDate.getFullYear());
    }
  };

  const onQuitDateChange = (event: any, selectedDate?: Date) => {
    setShowQuitDatePicker(false);
    if (selectedDate) {
      setQuitDate(selectedDate);
    }
  };

  const handleFinish = () => {
    setShowAnimation(true);
  };

  const handleAnimationFinish = () => {
    setShowAnimation(false);
    if (onFinish) onFinish();
  };

  const handleLoginPress = () => {
    setShowLoginForm(true);
  };

  if (showAnimation) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require('../animations/handshake2.json')}
          autoPlay
          loop={false}
          onAnimationFinish={handleAnimationFinish}
          style={{ width: 320, height: 320 }}
        />
      </View>
    );
  }

  if (showLoginForm) {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} bounces={false}>
        <Text style={styles.header}>Welcome Back!</Text>
        <Text style={styles.subHeader}>Sign in to continue</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            placeholderTextColor="#18122B33"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            placeholderTextColor="#18122B33"
            secureTextEntry
          />

          <TouchableOpacity style={styles.finishButton} activeOpacity={0.85}>
            <Text style={styles.finishButtonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setShowLoginForm(false)} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>I don't have an account - Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const renderDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <>
          {/* Birth Date Section */}
          <Text style={styles.label}>Your birthday</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowBirthDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {`${birthDay}/${birthMonth}/${birthYear}`}
            </Text>
          </TouchableOpacity>
          {showBirthDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="spinner"
              onChange={onBirthDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1920, 0, 1)}
            />
          )}

          {/* Quit Date Section */}
          <Text style={styles.label}>Quit date</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowQuitDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {quitDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showQuitDatePicker && (
            <DateTimePicker
              value={quitDate}
              mode="date"
              display="spinner"
              onChange={onQuitDateChange}
              minimumDate={new Date()}
            />
          )}
        </>
      );
    }

    return (
      <>
        <Text style={styles.label}>Your birthday</Text>
        <View style={styles.rowPickerGroup}>
          <View style={[styles.pickerWrapper, styles.roundPicker, { flex: 1 }]}>
            <Picker
              selectedValue={birthDay}
              onValueChange={setBirthDay}
              style={[styles.picker, styles.roundPickerInner]}
            >
              {days.map(day => (
                <Picker.Item key={day} label={day.toString()} value={day} />
              ))}
            </Picker>
          </View>
          <View style={[styles.pickerWrapper, styles.roundPicker, { flex: 1 }]}>
            <Picker
              selectedValue={birthMonth}
              onValueChange={setBirthMonth}
              style={[styles.picker, styles.roundPickerInner]}
            >
              {months.map((m, idx) => (
                <Picker.Item key={m} label={m} value={idx + 1} />
              ))}
            </Picker>
          </View>
          <View style={[styles.pickerWrapper, styles.roundPicker, { flex: 1 }]}>
            <Picker
              selectedValue={birthYear}
              onValueChange={setBirthYear}
              style={[styles.picker, styles.roundPickerInner]}
            >
              {years.map(y => (
                <Picker.Item key={y} label={y.toString()} value={y} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Quit date</Text>
        <View style={styles.rowPickerGroup}>
          <View style={[styles.pickerWrapper, styles.roundPicker, { flex: 1 }]}>
            <Picker
              selectedValue={quitDate.getDate()}
              onValueChange={day => setQuitDate(new Date(quitDate.getFullYear(), quitDate.getMonth(), day))}
              style={[styles.picker, styles.roundPickerInner]}
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <Picker.Item key={day} label={day.toString()} value={day} />
              ))}
            </Picker>
          </View>
          <View style={[styles.pickerWrapper, styles.roundPicker, { flex: 1 }]}>
            <Picker
              selectedValue={quitDate.getMonth() + 1}
              onValueChange={month => setQuitDate(new Date(quitDate.getFullYear(), month - 1, quitDate.getDate()))}
              style={[styles.picker, styles.roundPickerInner]}
            >
              {months.map((m, idx) => (
                <Picker.Item key={m} label={m} value={idx + 1} />
              ))}
            </Picker>
          </View>
          <View style={[styles.pickerWrapper, styles.roundPicker, { flex: 1 }]}>
            <Picker
              selectedValue={quitDate.getFullYear()}
              onValueChange={year => setQuitDate(new Date(year, quitDate.getMonth(), quitDate.getDate()))}
              style={[styles.picker, styles.roundPickerInner]}
            >
              {years.map(y => (
                <Picker.Item key={y} label={y.toString()} value={y} />
              ))}
            </Picker>
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} bounces={false}>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.subHeader}>Let's get to know you</Text>      <View style={styles.card}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#18122B33"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="your.email@example.com"
          placeholderTextColor="#18122B33"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Create a password"
            placeholderTextColor="#18122B33"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        {renderDatePicker()}

        <Text style={styles.label}>Packet price</Text>
        <TextInput
          style={styles.input}
          placeholder="14 €"
          placeholderTextColor="#18122B33"
          value={packetPrice}
          onChangeText={setPacketPrice}
          keyboardType="numeric"
        />        <Text style={styles.label}>How many per day?</Text>
        <TextInput
          style={styles.input}
          placeholder="5 cigarettes"
          placeholderTextColor="#18122B33"
          value={perDay}
          onChangeText={setPerDay}
          keyboardType="numeric"
        />        <Text style={styles.label}>Years of smoking</Text>
        <TextInput
          style={styles.input}
          placeholder="5 years"
          placeholderTextColor="#18122B33"
          value={smokingYears}
          onChangeText={setSmokingYears}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Your weight</Text>
        <TextInput
          style={styles.input}
          placeholder="75 kg"
          placeholderTextColor="#18122B33"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Your motivation (optional)</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="I want to quit for my health, family, etc."
          placeholderTextColor="#18122B33"
          value={motivation}
          onChangeText={setMotivation}
          multiline
        />

        <TouchableOpacity onPress={handleLoginPress} style={styles.loginLink}>
          <Text style={styles.loginLinkText}>I already have an account - Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.finishButton} onPress={handleFinish} activeOpacity={0.85}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
        

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#18122B',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#231942',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 16,
    marginBottom: 32,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  eyeButton: {
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 20,
    color: '#18122B',
  },
  header: {
    color: '#D2C0EA',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'System',
    textAlign: 'center',
  },
  subHeader: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.7,
  },
  label: {
    color: '#B8B5FF',
    fontSize: 15,
    marginTop: 16,
    marginBottom: 4,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: '#fff',
    color: '#18122B',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 0,
    fontWeight: '600',
    fontFamily: 'System',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 50,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#B8B5FF',
    marginHorizontal: 2,
  },
  picker: {
    color: '#18122B',
    height: 44,
    width: '100%',
    fontWeight: '600',
    fontFamily: 'System',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  roundPicker: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  roundPickerInner: {
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowPickerGroup: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  finishButton: {
    backgroundColor: '#B8B5FF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
    alignSelf: 'stretch',
    shadowColor: '#B8B5FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  finishButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'System',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  dateButtonText: {
    color: '#18122B',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginLink: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 8,
  },
  loginLinkText: {
    color: '#D2C0EA',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default RegistrationPage;
