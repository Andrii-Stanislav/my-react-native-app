import React, { useState, FC, useRef, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import { StackParamList } from "../types";
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

import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSelectors";

type Props = NativeStackScreenProps<StackParamList, "CreatePost">;

const CreatePostsScreen: FC<Props> = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [error, setError] = useState("");

  const [facing, setFacing] = useState<CameraType>("back");
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
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const takePicture = async () => {
    if (!camera) return;

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    // @ts-ignore
    const { uri } = await camera?.current?.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(uri);
    setPhoto(uri);
  };

  const isAllowed = !!photo && !!title && !!place;

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo ?? "");

    const file = await response.blob();

    const photoId = "ph_" + Math.random() * 1000;
    const imagesRef = ref(storage, `postImages/${photoId}`);

    await uploadBytesResumable(imagesRef, file);

    const url = await getDownloadURL(imagesRef);

    return url;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      await addDoc(collection(db, "posts"), {
        photo,
        title,
        place,
        location: location?.coords,
        uid: user.id,
      });
    } catch (error: any) {
      setError(error?.message ?? "Error uploading post");
    }
  };

  const onSubmit = async () => {
    await uploadPostToServer();

    navigation.navigate("Posts");

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
            <CameraView style={styles.camera} ref={camera} facing={facing}>
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
                <MaterialIcons name="photo-camera" size={24} color={photo ? colors.white : colors.underline_gray} />
              </TouchableOpacity>
            </CameraView>
          </View>
          <Text style={styles.textUploade}>{!photo ? "Завантажте фото" : "Редагувати фото"}</Text>

          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <TextInput
              style={styles.createPostInput}
              placeholder="Назва..."
              placeholderTextColor={colors.underline_gray}
              onFocus={() => setIsShownKeyboard(true)}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <View style={{ position: "relative" }}>
              <Ionicons name="location-outline" size={24} color={colors.underline_gray} style={styles.locationIcon} />
              <TextInput
                style={{ ...styles.createPostInput, paddingLeft: 28 }}
                placeholder="Місцевість..."
                placeholderTextColor={colors.underline_gray}
                onFocus={() => setIsShownKeyboard(true)}
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
