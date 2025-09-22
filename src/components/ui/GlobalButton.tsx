import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

/**
 * @component GlobalButton
 * @props
 * @prop {string} title - Text to display inside the button.
 * @prop {() => void} onPress - Function to execute when button is pressed.
 * @prop {'primary' | 'secondary'} [variant='primary'] - Visual style of the button.
 * @prop {boolean} [disabled=false] - Whether the button is disabled.
 *
 * @example
 * <GlobalButton
 *   title="Submit"
 *   onPress={handleSubmit}
 *   variant="primary"
 *   disabled={false}
 * />
 */
const GlobalButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default GlobalButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.foreground },
  disabled: { opacity: 0.5 },
  text: { color: colors.primaryForeground, fontWeight: 'bold', fontSize: 14 },
});
