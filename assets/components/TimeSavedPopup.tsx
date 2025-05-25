import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TimeSavedPopupProps {
  isVisible: boolean;
  onClose: () => void;
  days: string;
  details: {
    minutesPerCigarette: string;
    hoursPerWeek: string;
    daysPerMonth: string;
    reducedConsumption: string;
  };
}

const TimeSavedPopup = ({ isVisible, onClose, days, details }: TimeSavedPopupProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Time Saved</Text>
          <Text style={styles.amountText}>{days} days</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Minutes Per Cigarette:</Text>
              <Text style={styles.detailValue}>{details.minutesPerCigarette}min</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Hours Per Week:</Text>
              <Text style={styles.detailValue}>{details.hoursPerWeek}h</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Days Per Month:</Text>
              <Text style={styles.detailValue}>{details.daysPerMonth}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Reduced Consumption:</Text>
              <Text style={styles.detailValue}>{details.reducedConsumption}</Text>
            </View>
          </View>

          <Text style={styles.motivationalText}>
            You're gaining back precious time for the things that matter most!
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#E6FF99',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Gallant',
    color: '#1d4ed8',
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1d4ed8',
    marginBottom: 20,
    fontFamily: 'BrugtyDemoRegular',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: 'Gallant',
    color: '#4a5568',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Gallant',
    color: '#1d4ed8',
  },
  motivationalText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2d3748',
    fontFamily: 'Gallant',
    fontStyle: 'italic',
  },
});

export default TimeSavedPopup;