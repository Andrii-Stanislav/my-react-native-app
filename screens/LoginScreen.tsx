import { FC, useState } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "../types";

import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";

import { styles } from "../styles/css";

import Input from "../components/Input";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";

import { useDispatch } from "react-redux";
import { signIn } from "../redux/user/userOperations";
import { AppDispatch } from "../redux/store";

type Props = NativeStackScreenProps<StackParamList, "Login">;

const LoginScreen: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setKeyboardStatus(true);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setKeyboardStatus(true);
  };

  const onLogin = () => {
    dispatch(signIn({ email, password }));
    setEmail(email);
    setPassword(password);
  };

  const onRegister = () => {
    navigation.navigate("Registration", { userEmail: email });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.containerForKeyboard}>
        <Image source={require("../assets/images/bg.png")} resizeMode="cover" style={styles.image} />

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <View
            style={{
              ...styles.formContainerLogin,
              height: keyboardStatus ? "60%" : "50%",
            }}
          >
            <Text style={styles.title}>Увійти</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input value={email} autofocus placeholder="Адреса електронної пошти" onTextChange={handleEmailChange} />

              <PasswordInput value={password} placeholder="Пароль" onTextChange={handlePasswordChange} />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onLogin}>
                <Text style={[styles.baseText, styles.buttonText]}>Увійти</Text>
              </Button>

              <View style={styles.loginContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Немає акаунту?&ensp;
                  <TouchableWithoutFeedback onPress={onRegister}>
                    <Text style={styles.linkText}>Зареєструватися</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
