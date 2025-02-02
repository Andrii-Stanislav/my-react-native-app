import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "./global";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  containerForKeyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  input: {
    padding: 16,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
  buttonContainer: {
    marginTop: 42,
  },
  formContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  formContainerLogin: {
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -152,
    marginBottom: 32,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  plusIcon: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  imageBg: {
    flex: 1,
    width: "100%",
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  innerScreenContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    textDecorationLine: "underline",
  },
  logoutBtn: {
    width: 24,
    height: 24,
  },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: colors.underline_gray,
    height: 83,
    paddingTop: 9,
    paddingBottom: 22,
    paddingHorizontal: 70,
  },
  tabHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.underline_gray,
  },
  tabHeaderTitle: {
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    color: colors.black_primary,
  },
  tabIcon: {
    width: 70,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  createPostsContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingTop: 32,
    paddingBottom: 34,
    paddingHorizontal: 16,
  },
  cameraContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.black_primary,
    marginBottom: 8,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    objectFit: "cover",

    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,

    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
  },
  photoBtnContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textUploade: {
    marginBottom: 32,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: colors.underline_gray,
  },
  createPostInput: {
    marginBottom: 32,
    paddingBottom: 15,

    borderBottomWidth: 1,
    borderBottomColor: colors.underline_gray,

    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: colors.black_primary,
  },
  locationIcon: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -3,
      },
      android: {
        top: 3,
      },
    }),
  },
  createBtn: {
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
  },
  createBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  resetBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: colors.light_gray,
    borderRadius: 20,
    marginHorizontal: "auto",
  },
  screensContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 34,
    backgroundColor: colors.white,
  },
  postPhoto: {
    marginBottom: 8,
    width: "100%",
    height: 240,

    overflow: "hidden",
    objectFit: "cover",

    borderRadius: 8,
  },
  postTitle: {
    marginBottom: 11,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: colors.black_primary,
  },
  userContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 32,
  },
  avatarPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userData: {
    gap: 0,
  },
  userName: {
    color: colors.black_primary,
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userEmail: {
    color: colors.black80,
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  place: {
    color: colors.black_primary,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginLeft: 4,
    textDecorationLine: "underline",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  count: {
    color: colors.underline_gray,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginLeft: 6,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    right: 8,
    top: 8,

    width: 34,
    height: 34,

    backgroundColor: colors.orange,
    borderRadius: 50,
  },
  data: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: colors.underline_gray,
  },
  nickname: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: colors.black_primary,
  },
  avatar: {
    width: 28,
    height: 28,

    borderRadius: 50,
    objectFit: "cover",
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colors.border_gray,
  },
  textContainer: {
    flex: 1,
    padding: 16,

    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",

    borderRadius: 6,
  },
  textInput: {
    paddingLeft: 16,
    paddingRight: 8,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  postPhotoInCommentScreen: {
    marginBottom: 32,
    width: "100%",
    height: 240,

    overflow: "hidden",
    objectFit: "cover",

    borderRadius: 8,
  },
  profilePhoto: {
    // TODO
  },
  profileContainer: {
    // TODO
  },
  imgContainer: {
    // TODO
  },
  icon: {
    // TODO
  },
  name: {
    // TODO
  },
  photo: {
    // TODO
  },
  commentIcon: {
    // TODO
  },
});
