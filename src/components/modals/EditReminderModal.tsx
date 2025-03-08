import React, {FC, useEffect, useState} from 'react';
import {View, Modal, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import dayjs from 'dayjs';
import {SFSymbol} from 'react-native-sfsymbols';

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
  reminder: string | undefined;
  setReminder: (reminder: string | undefined) => void;
}

const EditReminderModal: FC<Props> = ({
  isModalOpen,
  handleModalClose,
  reminder,
  setReminder,
}) => {
  const generateDates = () => {
    return Array.from({length: 10}, (_, i) => {
      const date = dayjs().add(i, 'day');
      return {
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.format('DD MMM'),
        value: date.format('D MMM'),
      };
    });
  };

  const [dateOptions, setDateOptions] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].value);
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('30');
  const [repeatOption, setRepeatOption] = useState(false);

  useEffect(() => {
    if (reminder) {
      const [day, time] = reminder.split(', ');
      setSelectedDate(day);
      setSelectedHour(time.split(':')[0]);
      setSelectedMinute(time.split(':')[1]);
    }
  }, [reminder]);

  const hours = Array.from({length: 24}, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const minutes = ['00', '10', '20', '30', '40', '50', '59'];

  const handleSetReminder = () => {
    setReminder(`${selectedDate}, ${selectedHour}:${selectedMinute}`);
    handleModalClose();
  };

  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleModalClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.datePickerHeader}>
            <TouchableOpacity
              onPress={() => {
                handleModalClose();
                setReminder(undefined);
              }}>
              <Text style={styles.cancelButton}>Delete</Text>
            </TouchableOpacity>
            <Text style={styles.datePickerTitle}>Date & Time</Text>
            <TouchableOpacity onPress={handleSetReminder}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedDate}
              onValueChange={itemValue => setSelectedDate(itemValue.toString())}
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              {dateOptions.map(date => (
                <Picker.Item
                  key={date.value}
                  label={date.label}
                  value={date.value}
                />
              ))}
            </Picker>

            <Picker
              selectedValue={selectedHour}
              onValueChange={itemValue => setSelectedHour(itemValue.toString())}
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              {hours.map(hour => (
                <Picker.Item key={hour} label={hour} value={hour} />
              ))}
            </Picker>

            <Picker
              selectedValue={selectedMinute}
              onValueChange={itemValue =>
                setSelectedMinute(itemValue.toString())
              }
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              {minutes.map(minute => (
                <Picker.Item key={minute} label={minute} value={minute} />
              ))}
            </Picker>
          </View>
          <View style={styles.repeatContainer}>
            <View style={styles.repeatRow}>
              <SFSymbol
                name={'arrow.2.circlepath'}
                style={styles.repeatIcon}
                color={'#777'}
              />
              <Text style={styles.repeatText}>Repeat</Text>
              <TouchableOpacity
                onPress={() => setRepeatOption(!repeatOption)}
                style={styles.repeatToggle}>
                <Text style={styles.repeatOptionText}>
                  {repeatOption ? 'Does not Repeat' : 'Repeats'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  cancelButton: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
  saveButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    fontSize: 18,
  },
  repeatContainer: {
    marginBottom: 30,
  },
  repeatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  repeatIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  repeatText: {
    fontSize: 16,
    color: '#000',
  },
  repeatToggle: {
    marginLeft: 'auto',
  },
  repeatOptionText: {
    fontSize: 16,
    color: '#777',
  },
});

export default EditReminderModal;
