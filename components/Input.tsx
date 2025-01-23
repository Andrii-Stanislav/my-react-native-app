import { TextInput, View, ViewProps } from "react-native";
import { FC, useState } from "react";
import { styles } from "../styles/css";

type InputProps = {
  value: string;
  placeholder?: string;
  outerStyles?: ViewProps["style"];
  rightButton?: React.ReactNode;
  onTextChange: (value: string) => void;
  secureTextEntry?: boolean;
  autofocus?: boolean;
};

const Input: FC<InputProps> = ({
  value,
  onTextChange,
  placeholder,
  outerStyles,
  rightButton,
  autofocus = false,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.input, isFocused && styles.focused, outerStyles]}>
      <TextInput
        value={value}
        autoFocus={autofocus}
        onChangeText={onTextChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.baseText}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {rightButton}
    </View>
  );
};

export default Input;
