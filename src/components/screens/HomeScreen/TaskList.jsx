import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { colors } from '../../../constants/colors';
import Feather from '@react-native-vector-icons/feather';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Finish React Native project',
      category: 'Work',
      priority: 'High',
      dueDate: '2025-09-25',
      completed: false,
    },
    {
      id: 2,
      name: 'Grocery Shopping',
      category: 'Personal',
      priority: 'Low',
      dueDate: '2025-09-23',
      completed: true,
    },
  ]);

  const toggleComplete = id => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'High':
        return colors.error;
      case 'Medium':
        return colors.warning;
      case 'Low':
        return colors.success;
      default:
        return colors.foregroundMuted;
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.card}>
      {/* Left Circle Checkbox */}
      <TouchableOpacity
        onPress={() => toggleComplete(item.id)}
        style={styles.checkbox}
      >
        {item.completed ? (
          <FontAwesome name="angle-double-up" size={25} color="gold" solid />
        ) : (
          <FontAwesome name="angle-double-down" size={25} color="gold" solid />
        )}
      </TouchableOpacity>

      {/* Task Info */}
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
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <FontAwesome name="star" size={25} color="gold" solid />
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <View
            style={[
              styles.badge,
              { backgroundColor: getPriorityColor(item.priority) + '20' },
            ]}
          >
            <FontAwesome name="amazon" size={25} color="gold" solid />
            <Text
              style={[
                styles.badgeText,
                { color: getPriorityColor(item.priority) },
              ]}
            >
              {item.priority}
            </Text>
          </View>
          <View style={styles.badge}>
            <FontAwesome name="star" size={25} color="gold" solid />
            <Text style={[styles.badgeText, { color: colors.info }]}>
              {item.dueDate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Inbox</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={22} color={colors.primaryForeground} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTask}
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  addButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 50,
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
