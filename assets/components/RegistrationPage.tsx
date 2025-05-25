import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
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
  const [smokingYears, setSmokingYears] = useState('1');
  
  // Smoking years array
  const smokingYearsOptions = Array.from({ length: 70 }, (_, i) => (i + 1).toString());
  
  // Validation states
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    packetPrice: '',
    perDay: '',
    weight: '',
    smokingYears: ''
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Simple validation function
  const validateFields = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else {
      newErrors.name = '';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    } else {
      newErrors.email = '';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    } else {
      newErrors.password = '';
    }
    
    if (!packetPrice.trim()) {
      newErrors.packetPrice = 'Packet price is required';
      isValid = false;
    } else {
      newErrors.packetPrice = '';
    }
    
    if (!perDay.trim()) {
      newErrors.perDay = 'Cigarettes per day is required';
      isValid = false;
    } else {
      newErrors.perDay = '';
    }
    
    if (!weight.trim()) {
      newErrors.weight = 'Weight is required';
      isValid = false;
    } else {
      newErrors.weight = '';
    }
    
    setErrors(newErrors);
    return isValid;
  };

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

  const handleFinish = async () => {
    if (!validateFields()) {
      // If validation fails, return without submitting
      return;
    }
    
    const userData = {
      name,
      email,
      password,
      birthDay,
      birthMonth,
      birthYear,
      packetPrice,
      perDay,
      quitDate: quitDate.toISOString(),
      motivation,
      weight,
      smokingYears,
    };
    try {
      const response = await axios.post('http://localhost:3000/register', userData);
      console.log('Registration POST response:', response.data);
    } catch (error) {
      console.error('Registration POST error:', error);
    }
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

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const navigation = useNavigation();
  const handleLogin = async () => {
    setLoginError('');
    setLoginLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: loginEmail,
        password: loginPassword,
      });
      console.log('Login POST response:', response.data);
      // Save user_id in AsyncStorage
      if (response.data && response.data.user && response.data.user.user_id) {
        await AsyncStorage.setItem('user_id', response.data.user.user_id);
      }
      // Redirect to home screen
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error) {
      setLoginError('Invalid email or password');
      console.error('Login POST error:', error);
    } finally {
      setLoginLoading(false);
    }
  };

  if (showLoginForm) {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} bounces={false}>
        <Text style={styles.header}>Welcome Back!</Text>
        <Text style={styles.subHeader}>Sign in to continue</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            placeholderTextColor="#18122B33"
            keyboardType="email-address"
            autoCapitalize="none"
            value={loginEmail}
            onChangeText={setLoginEmail}
          />

          <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            placeholderTextColor="#18122B33"
            secureTextEntry
            value={loginPassword}
            onChangeText={setLoginPassword}
          />

          {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

          <TouchableOpacity style={styles.finishButton} activeOpacity={0.85} onPress={handleLogin} disabled={loginLoading}>
            <Text style={styles.finishButtonText}>{loginLoading ? 'Logging in...' : 'Login'}</Text>
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
      <Text style={styles.subHeader}>Let's get to know you</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Your name <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder="Name"
          placeholderTextColor="#18122B33"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (text.trim()) {
              setErrors({...errors, name: ''});
            }
          }}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="your.email@example.com"
          placeholderTextColor="#18122B33"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailRegex.test(text)) {
              setErrors({...errors, email: ''});
            }
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
        <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Create a password"
            placeholderTextColor="#18122B33"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text.length >= 6) {
                setErrors({...errors, password: ''});
              }
            }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        {renderDatePicker()}

        <Text style={styles.label}>Packet price <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.packetPrice ? styles.inputError : null]}
          placeholder="14 €"
          placeholderTextColor="#18122B33"
          value={packetPrice}
          onChangeText={(text) => {
            setPacketPrice(text);
            if (text.trim()) {
              setErrors({...errors, packetPrice: ''});
            }
          }}
          keyboardType="numeric"
        />
        {errors.packetPrice ? <Text style={styles.errorText}>{errors.packetPrice}</Text> : null}
        
        <Text style={styles.label}>How many per day? <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.perDay ? styles.inputError : null]}
          placeholder="5 cigarettes"
          placeholderTextColor="#18122B33"
          value={perDay}
          onChangeText={(text) => {
            setPerDay(text);
            if (text.trim()) {
              setErrors({...errors, perDay: ''});
            }
          }}
          keyboardType="numeric"
        />
        {errors.perDay ? <Text style={styles.errorText}>{errors.perDay}</Text> : null}        <Text style={styles.label}>Years of smoking <Text style={styles.required}>*</Text></Text>
        <View style={styles.rowPickerGroup}>
          <View style={[styles.pickerWrapper, styles.roundPicker, { flex: 1 }]}>
            <Picker
              selectedValue={smokingYears}
              onValueChange={(value) => setSmokingYears(value)}
              style={[styles.picker, styles.roundPickerInner]}
            >
              {smokingYearsOptions.map(year => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
          <View style={{ flex: 2 }}></View>
        </View>
        {errors.smokingYears ? <Text style={styles.errorText}>{errors.smokingYears}</Text> : null}

        <Text style={styles.label}>Your weight <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.weight ? styles.inputError : null]}
          placeholder="75 kg"
          placeholderTextColor="#18122B33"
          value={weight}
          onChangeText={(text) => {
            setWeight(text);
            if (text.trim()) {
              setErrors({...errors, weight: ''});
            }
          }}
          keyboardType="numeric"
        />
        {errors.weight ? <Text style={styles.errorText}>{errors.weight}</Text> : null}
        
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
  inputError: {
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 6,
    fontWeight: '500',
  },
  required: {
    color: '#FF6B6B',
    fontWeight: 'bold',
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
