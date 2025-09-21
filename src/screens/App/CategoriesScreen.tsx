import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = {
  id: string;
  name: string;
  flag: string; // could be an emoji or short label
};

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Work', flag: '💼' },
    { id: '2', name: 'Personal', flag: '🏠' },
    { id: '3', name: 'Urgent', flag: '⚡' },
  ]);

  const [newName, setNewName] = useState('');
  const [newFlag, setNewFlag] = useState('');

  const addCategory = () => {
    if (!newName) {
      Alert.alert('Error', 'Category name cannot be empty');
      return;
    }
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newName,
      flag: newFlag || '🏷️',
    };
    setCategories([...categories, newCategory]);
    setNewName('');
    setNewFlag('');
  };

  const removeCategory = (id: string) => {
    Alert.alert('Delete', 'Are you sure you want to remove this category?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setCategories(categories.filter(c => c.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      {/* Add new category */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Category Name"
          placeholderTextColor={colors.foregroundMuted}
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Flag / Emoji"
          placeholderTextColor={colors.foregroundMuted}
          value={newFlag}
          onChangeText={setNewFlag}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCategory}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Category List */}
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeCategory(item.id)}>
              <Ionicons name="trash-outline" size={22} color={colors.error} />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.foreground,
  },
  addContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.foreground,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  addButton: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: colors.foregroundMuted,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.foreground,
    fontWeight: '600',
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: colors.foreground,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
});
