import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryFilterBard from '../../components/screens/HomeScreen/CategoryFilterBard';
import TaskList from '../../components/screens/HomeScreen/TaskList';
import PriorityFilter from '../../components/screens/HomeScreen/PriorityFilter';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchTasks } from '../../redux/slice/task/TaskSlice';
import GlobalButton from '../../components/ui/GlobalButton';
import GlobalModal from '../../components/ui/GlobalModal';
import GlobalInput from '../../components/ui/GlobalInput';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(state => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const modalToggl = () => {
    setModalVisible(!modalToggl);
  };

  return (
    <SafeAreaView style={[styles.box]}>
      <CategoryFilterBard />
      <PriorityFilter />
      {/* <View
        style={{
          height: 2,
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 50,
        }}
      /> */}
      <TaskList data={tasks} />
      <GlobalButton
        title="Global Button"
        variant="primary"
        onPress={() => setModalVisible(!modalVisible)}
      />
      <GlobalModal
        header="Hello"
        description="Edit Your modal"
        visible={modalVisible}
        onClose={modalToggl}
      />

      <GlobalInput placeholder="Hello" value="Rajan" onChangeText={() => {}} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 5,
    gap: 10,
  },
});
