import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CigarettePopupProps {
  isVisible: boolean;
  onClose: () => void;
  amount: string;
  details: {
    daily: string;
    weekly: string;
    monthly: string;
    yearly: string;
  };
}

const CigarettePopup = ({ isVisible, onClose, amount, details }: CigarettePopupProps) => {
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

          <Text style={styles.modalTitle}>Cigarettes Avoided</Text>
          
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="cigar-off" size={40} color="black" />
            <Text style={styles.amountText}>{amount}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Daily Average:</Text>
              <Text style={styles.detailValue}>{details.daily}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Weekly Total:</Text>
              <Text style={styles.detailValue}>{details.weekly}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Monthly Total:</Text>
              <Text style={styles.detailValue}>{details.monthly}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Yearly Projection:</Text>
              <Text style={styles.detailValue}>{details.yearly}</Text>
            </View>
          </View>

          <Text style={styles.motivationalText}>
            Amazing! You're making great progress in breaking free from smoking!
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
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

export default CigarettePopup;