import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryFilterBard from '../../components/screens/HomeScreen/CategoryFilterBard';
import PriorityFilter from '../../components/screens/HomeScreen/PriorityFilter';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../../redux/slice/task/TaskSlice';
import GlobalButton from '../../components/ui/GlobalButton';
import GlobalModal from '../../components/ui/GlobalModal';
import GlobalInput from '../../components/ui/GlobalInput';
import Feather from '@react-native-vector-icons/feather';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import Toast from 'react-native-toast-message';
import { Task } from '../../types/task';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector(state => state.task);
  const [taskData, setTaskData] = useState({
    name: '',
    dateTime: '',
    deadline: '',
    completed: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [pickerType, setPickerType] = useState<'dateTime' | 'deadline' | null>(
    null,
  );

  const modalToggle = () => {
    setModalVisible(prev => !prev);
    if (modalVisible) {
      setTaskData({
        name: '',
        dateTime: '',
        deadline: '',
        completed: false,
      });
      setIsEditing(false);
      setSelectedTaskId(null);
    }
  };

  const showDatePicker = (type: 'dateTime' | 'deadline') => {
    setPickerType(type);
  };

  const hideDatePicker = () => {
    setPickerType(null);
  };

  const handleConfirm = (date: Date) => {
    if (pickerType === 'dateTime') {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setTaskData(prev => ({ ...prev, dateTime: formattedDate }));
    } else if (pickerType === 'deadline') {
      const formattedDateTime = format(date, 'yyyy-MM-dd HH:mm');
      setTaskData(prev => ({ ...prev, deadline: formattedDateTime }));
    }
    hideDatePicker();
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSaveTask = async () => {
    if (!taskData.name) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Task name is required',
      });
      return;
    }

    try {
      await dispatch(createTask(taskData)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Task Created',
        text2: `${taskData.name} has been added`,
      });
      modalToggle();
    } catch (err) {
      console.error('Failed to create task', err);
      Toast.show({
        type: 'error',
        text1: 'Creating Task Failed',
        text2: 'An error occurred while creating the task',
      });
    }
  };

  const handleUpdateTask = async () => {
    if (!selectedTaskId) return;

    await dispatch(updateTask({ id: selectedTaskId, updatedTask: taskData }));
    modalToggle();
  };

  const handleDeleteTask = async () => {
    if (!selectedTaskId) return;

    try {
      await dispatch(deleteTask(selectedTaskId)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Task Deleted',
        text2: 'The task has been deleted',
      });
      modalToggle();
    } catch (err) {
      console.error('Failed to delete task', err);
      Toast.show({
        type: 'error',
        text1: 'Deleting Task Failed',
        text2: 'An error occurred while deleting the task',
      });
    }
  };

  const handleEditTask = (item: Task) => {
    console.log('Editing ID', item._id);
    setIsEditing(true);
    setSelectedTaskId(item._id);
    setTaskData({
      name: item.name,
      dateTime: item.dateTime || '',
      deadline: item.deadline || '',
      completed: item.completed,
    });
    setModalVisible(true);
  };

  const handleToggleComplete = (item: Task) => {
    dispatch(
      updateTask({ id: item._id, updatedTask: { completed: !item.completed } }),
    );
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.card}
      onLongPress={() => handleEditTask(item)}
    >
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleToggleComplete(item)}
      >
        {item.completed ? (
          <MaterialIcons
            name="radio-button-checked"
            size={25}
            color="#d3f809"
          />
        ) : (
          <MaterialIcons
            name="radio-button-unchecked"
            size={25}
            color="#d3f809"
          />
        )}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            item.completed && {
              textDecorationLine: 'line-through',
              color: colors.foregroundMuted,
            },
          ]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.box}>
      <CategoryFilterBard />
      <PriorityFilter />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Inbox</Text>
        <GlobalButton variant="primary" size="sm" onPress={modalToggle}>
          <Feather name="plus" size={22} />
        </GlobalButton>
      </View>

      <View style={styles.container}>
        <FlatList
          data={tasks}
          keyExtractor={item => item._id}
          renderItem={renderTaskItem}
        />
      </View>

      <GlobalModal
        header={isEditing ? 'Edit Task' : 'Add New Task'}
        description="Fill out the task details below"
        visible={modalVisible}
        onClose={modalToggle}
      >
        {/* Task Name */}
        <GlobalInput
          label="Task Name"
          placeholder="Finish Dishing"
          value={taskData.name}
          onChangeText={text => setTaskData(prev => ({ ...prev, name: text }))}
        />

        {/* Due Date (date only) */}
        <TouchableOpacity onPress={() => showDatePicker('dateTime')}>
          <GlobalInput
            label="Due Date"
            placeholder="Select a date"
            value={taskData.dateTime}
            editable={false}
            onChangeText={() => {}}
          />
        </TouchableOpacity>

        {/* Deadline (date + time) */}
        <TouchableOpacity onPress={() => showDatePicker('deadline')}>
          <GlobalInput
            label="Deadline"
            placeholder="Select date & time"
            value={taskData.deadline}
            editable={false}
            onChangeText={() => {}}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={pickerType !== null}
          mode={pickerType === 'deadline' ? 'datetime' : 'date'}
          date={
            pickerType === 'dateTime'
              ? taskData.dateTime
                ? new Date(taskData.dateTime)
                : new Date()
              : taskData.deadline
              ? new Date(taskData.deadline)
              : new Date()
          }
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={styles.footer}>
          {isEditing ? (
            <>
              <GlobalButton
                title="Delete"
                onPress={handleDeleteTask}
                variant="secondary"
                size="sm"
              />
              <GlobalButton
                title={loading ? 'Updating...' : 'Update Task'}
                onPress={handleUpdateTask}
                variant="primary"
                size="sm"
              />
            </>
          ) : (
            <>
              <GlobalButton
                title="Cancel"
                onPress={modalToggle}
                variant="secondary"
                size="sm"
              />
              <GlobalButton
                title={loading ? 'Saving...' : 'Save Task'}
                onPress={handleSaveTask}
                variant="primary"
                size="sm"
              />
            </>
          )}
        </View>
      </GlobalModal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.cardForeground,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkbox: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.cardForeground,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    marginLeft: 4,
    color: colors.foregroundSecondary,
  },
});
