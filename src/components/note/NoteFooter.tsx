import React, {FC, useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AddModal from '../modals/AddModal.tsx';
import ColorModal from '../modals/ColorModal.tsx';
import MoreOptionModal from '../modals/MoreOptions.tsx';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  labelName: string | null;
}

const NoteFooter: FC<Props> = ({labelName}) => {
  const {theme} = useContext(ThemeContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState<boolean>(false);
  const [isMoreOptionModalOpen, setIsMoreOptionModalOpen] =
    useState<boolean>(false);

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setIsColorModalOpen(false);
    setIsMoreOptionModalOpen(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setIsAddModalOpen(true)}>
          <SFSymbol
            style={styles.icon}
            name={'plus.square'}
            color={theme === 'dark' ? '#fff' : '#777'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsColorModalOpen(true)}>
          <SFSymbol
            style={styles.icon}
            name={'paintpalette'}
            color={theme === 'dark' ? '#fff' : '#777'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <SFSymbol
          style={styles.icon}
          name={'arrow.uturn.backward'}
          color={theme === 'dark' ? '#fff' : '#777'}
        />
        <SFSymbol
          style={styles.icon}
          name={'arrow.uturn.forward'}
          color={theme === 'dark' ? '#fff' : '#777'}
        />
      </View>
      <View style={[styles.iconContainer, {transform: [{rotate: '90deg'}]}]}>
        <TouchableOpacity onPress={() => setIsMoreOptionModalOpen(true)}>
          <SFSymbol
            style={styles.icon}
            name={'ellipsis'}
            color={theme === 'dark' ? '#fff' : '#777'}
          />
        </TouchableOpacity>
      </View>
      <AddModal
        isModalOpen={isAddModalOpen}
        handleModalClose={handleModalClose}
        labelName={labelName}
      />
      <ColorModal
        isModalOpen={isColorModalOpen}
        handleModalClose={handleModalClose}
      />
      <MoreOptionModal
        isModalOpen={isMoreOptionModalOpen}
        handleModalClose={handleModalClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default NoteFooter;
