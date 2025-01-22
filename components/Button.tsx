import { FC } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { colors } from "../styles/global";

type ButtonProps = {
  children: React.ReactNode;
  buttonStyle?: ViewStyle;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({ children, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity style={[style.button, buttonStyle]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const style = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: colors.orange,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
