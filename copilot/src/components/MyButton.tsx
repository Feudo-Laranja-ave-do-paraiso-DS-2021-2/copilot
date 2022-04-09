import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface MyButtonProps extends TouchableOpacityProps {
  title: string;
}
export function MyButton({title, style, ...rest}: MyButtonProps) {
  return (
    <TouchableOpacity {...rest} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,    
  },
  button: {
    backgroundColor: '#D95204',
    padding: 20,
    width: '100%',
    alignItems: 'center'
  },
});
