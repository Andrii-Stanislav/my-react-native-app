import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors } from "../styles/global";

import Input from "./Input";

interface Props {
  placeholder: string;
  value: string;
  onTextChange: (value: string) => void;
}

const PasswordInput = (props: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const showPassword = () => setIsPasswordVisible((prev) => !prev);

  return (
    <Input
      {...props}
      rightButton={
        <TouchableOpacity onPress={showPassword}>
          <Text style={[styles.baseText, styles.passwordButtonText]}>
            {isPasswordVisible ? "Показати" : "Приховати"}
          </Text>
        </TouchableOpacity>
      }
      outerStyles={styles.passwordButton}
      secureTextEntry={isPasswordVisible}
    />
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
