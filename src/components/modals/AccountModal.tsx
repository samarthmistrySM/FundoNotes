import React, {FC, useContext} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AuthContext from '../../context/AuthContext.tsx';

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const AccountModal: FC<Props> = ({isModalOpen, handleModalClose}) => {
  const {loggedUser, handleLogout} = useContext(AuthContext);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={handleModalClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Manage an account</Text>
          </View>

          <ScrollView>
            <View style={styles.currentAccountContainer}>
              <View style={styles.accountRow}>
                <Image
                  source={{uri: loggedUser?.image}}
                  style={styles.avatar}
                />
                <View style={styles.accountInfo}>
                  <Text>
                    <Text style={styles.accountName}>
                      {loggedUser?.firstName}
                    </Text>
                    <Text style={styles.accountName}>
                      {' '}
                      {loggedUser?.lastName}
                    </Text>
                  </Text>
                  <Text style={styles.accountEmail}>{loggedUser?.email}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleModalClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
              <Text style={styles.signOutButtonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'white',
    borderRadius: 7,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  currentAccountContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontWeight: '500',
    fontSize: 16,
  },
  accountEmail: {
    fontSize: 14,
    color: '#666',
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  addAccountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  addAccountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plusIcon: {
    fontSize: 24,
    color: '#5F6368',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#5F6368',
    fontWeight: '500',
  },
  signOutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  signOutButtonText: {
    color: '#1A73E8',
    fontWeight: '500',
  },
});

export default AccountModal;
