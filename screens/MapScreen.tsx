import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { styles } from "../styles/css";

const MapScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.innerScreenContainer}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View>
          <Text style={styles.title}>MapScreen</Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MapScreen;
