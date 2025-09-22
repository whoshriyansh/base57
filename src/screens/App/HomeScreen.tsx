import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryFilterBard from '../../components/screens/HomeScreen/CategoryFilterBard';
import TaskList from '../../components/screens/HomeScreen/TaskList';
import PriorityFilter from '../../components/screens/HomeScreen/PriorityFilter';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchTasks } from '../../redux/slice/task/TaskSlice';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(state => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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
