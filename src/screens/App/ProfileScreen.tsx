import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../../constants/colors'; // update this path
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const handlePress = (action: string) => {
    Alert.alert(action, `${action} pressed`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://i.pravatar.cc/150?img=12', // placeholder avatar
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@email.com</Text>
      </View>

      {/* Options List */}
      <View style={styles.list}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => handlePress('Modify Profile')}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color={colors.foreground}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Modify Profile</Text>
            <Text style={styles.description}>Update your personal details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.listItem}
          onPress={() => handlePress('Change Password')}
        >
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={colors.foreground}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Change Password</Text>
            <Text style={styles.description}>Secure your account</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.listItem}
          onPress={() => handlePress('Settings')}
        >
          <Ionicons
            name="settings-outline"
            size={22}
            color={colors.foreground}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.description}>App preferences and controls</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.listItem}
          onPress={() => handlePress('Options')}
        >
          <Ionicons
            name="options-outline"
            size={22}
            color={colors.foreground}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Options</Text>
            <Text style={styles.description}>Additional features</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Delete Account */}
      <TouchableOpacity
        style={[styles.listItem, styles.deleteItem]}
        onPress={() => handlePress('Delete Account')}
      >
        <Ionicons
          name="trash-outline"
          size={22}
          color={colors.error}
          style={styles.icon}
        />
        <Text style={[styles.title, { color: colors.error }]}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.card,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.foreground,
  },
  email: {
    fontSize: 14,
    color: colors.foregroundMuted,
    marginTop: 2,
  },
  list: {
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textContainer: {
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.foreground,
  },
  description: {
    fontSize: 13,
    color: colors.foregroundMuted,
  },
  deleteItem: {
    borderBottomWidth: 0,
  },
});
