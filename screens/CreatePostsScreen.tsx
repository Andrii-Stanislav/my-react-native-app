import React, { useState, FC, useRef, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { CameraView, useCameraPermissions } from "expo-camera";

import { StackParamList } from "../navigation/StackNavigator";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Keyboard,
  Platform,
  Button,
} from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/css";
import { colors } from "../styles/global";

type Props = NativeStackScreenProps<StackParamList, "CreatePost">;

const CreatePostsScreen: FC<Props> = ({ navigation }) => {
  const [photo, setPhoto] = useState<null | string>(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");

  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const takePicture = async () => {
    if (!camera) return;

    const cameraRes = await camera?.current?.takePictureAsync();
    if (!cameraRes) return;

    await MediaLibrary.saveToLibraryAsync(cameraRes?.uri);
    setPhoto(cameraRes?.uri);
  };

  const isAllowed = !!photo && !!title && !!place;

  const onSubmit = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    navigation.navigate("Posts", { photo, title, place, coords });

    setTitle("");
    setPhoto(null);
    setPlace("");
  };

  const onReset = async () => {
    setTitle("");
    setPhoto(null);
    setPlace("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.createPostsContainer}>
        <View>
          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} ref={camera}>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image style={styles.camera} source={{ uri: photo }} />
                </View>
              )}
              <TouchableOpacity
                style={{
                  ...styles.photoBtnContainer,
                  backgroundColor: photo ? colors.white30 : colors.white,
                }}
                activeOpacity={0.8}
                onPress={takePicture}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={photo ? colors.white : colors.underline_gray}
                />
              </TouchableOpacity>
            </CameraView>
          </View>
          <Text style={styles.textUploade}>
            {!photo ? "Завантажте фото" : "Редагувати фото"}
          </Text>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.createPostInput}
              placeholder="Назва..."
              placeholderTextColor={colors.underline_gray}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <View style={{ position: "relative" }}>
              <Ionicons
                name="location-outline"
                size={24}
                color={colors.underline_gray}
                style={styles.locationIcon}
              />
              <TextInput
                style={{ ...styles.createPostInput, paddingLeft: 28 }}
                placeholder="Місцевість..."
                placeholderTextColor={colors.underline_gray}
                value={place}
                onChangeText={(text) => setPlace(text)}
              />
            </View>
            <View
              style={{
                ...styles.createBtn,
                backgroundColor: isAllowed ? colors.orange : colors.light_gray,
              }}
            >
              <TouchableOpacity disabled={!isAllowed} onPress={onSubmit}>
                <Text
                  style={{
                    ...styles.createBtnText,
                    color: isAllowed ? colors.white : colors.underline_gray,
                  }}
                >
                  Опубліковати
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.resetBtn}>
          <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
            <Feather name="trash-2" size={24} color={colors.underline_gray} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
