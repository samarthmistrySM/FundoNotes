import React, {FC} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {SFSymbol} from 'react-native-sfsymbols';
import dayjs from 'dayjs';

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
  setReminder(s: string | undefined): void;
  setIsEditReminderModalOpen(s: boolean): void;
}

const AddReminderModal: FC<Props> = ({
  isModalOpen,
  handleModalClose,
  setReminder,
  setIsEditReminderModalOpen,
}) => {
  const tomorrow = dayjs().add(1, 'day').format('D MMM');
  const sevenDaysLater = dayjs().add(7, 'day').format('D MMM');

  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleModalClose}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleModalClose}>
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Remind me later</Text>
            <Text style={styles.text}>Saved in Google Reminders</Text>
          </View>
          <ScrollView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setReminder(`${tomorrow}, 08:00`);
                handleModalClose();
              }}>
              <View style={styles.btnLabel}>
                <SFSymbol name={'alarm'} style={styles.icon} color={'#777'} />
                <Text style={styles.text}>Tomorrow morning</Text>
              </View>
              <Text style={styles.text}>08:00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setReminder(`${tomorrow}, 18:00`);
                handleModalClose();
              }}>
              <View style={styles.btnLabel}>
                <SFSymbol name={'alarm'} style={styles.icon} color={'#777'} />
                <Text style={styles.text}>Tomorrow evening</Text>
              </View>
              <Text style={styles.text}>18:00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setReminder(`${sevenDaysLater}, 08:00`);
                handleModalClose();
              }}>
              <View style={styles.btnLabel}>
                <SFSymbol name={'alarm'} style={styles.icon} color={'#777'} />
                <Text style={styles.text}>{sevenDaysLater}, 08:00</Text>
              </View>
              <Text style={styles.text}>{sevenDaysLater}, 08:00</Text>
            </TouchableOpacity>

            <View style={styles.button}>
              <View style={styles.btnLabel}>
                <SFSymbol name={'house'} style={styles.icon} color={'#999'} />
                <Text style={[styles.text, {color: '#888'}]}>Home</Text>
              </View>
            </View>
            <View style={styles.button}>
              <View style={styles.btnLabel}>
                <SFSymbol
                  name={'suitcase.fill'}
                  style={styles.icon}
                  color={'#999'}
                />
                <Text style={[styles.text, {color: '#888'}]}>Work</Text>
              </View>
            </View>

            {/* Custom Date & Time */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleModalClose();
                setIsEditReminderModalOpen(true);
              }}>
              <View style={styles.btnLabel}>
                <SFSymbol name={'alarm'} style={styles.icon} color={'#777'} />
                <Text style={styles.text}>Select date and time</Text>
              </View>
            </TouchableOpacity>

            {/* Location Reminder */}
            <TouchableOpacity style={styles.button}>
              <View style={styles.btnLabel}>
                <SFSymbol
                  name={'location.north.fill'}
                  style={styles.icon}
                  color={'#777'}
                />
                <Text style={styles.text}>Location</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    height: '60%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#777',
    paddingBottom: 20,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 7,
    color: '#555',
    marginHorizontal: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  btnLabel: {
    flexDirection: 'row',
  },
  icon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
    marginHorizontal: 10,
    tintColor: '#8a8a8a',
  },
  text: {
    color: '#444',
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default AddReminderModal;
