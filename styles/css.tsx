import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../styles/global";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const styles = StyleSheet.create({
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
  image: {
    flex: 1,
    justifyContent: "flex-end",
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
    borderTopColor: colors.underline_grey,
    height: 83,
    paddingTop: 9,
    paddingRight: 70,
    paddingLeft: 70,
  },
  tabHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.underline_grey,
  },
  tabHeaderTitle: {
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 22,
    color: colors.black_primary,
  },
  tabIcon: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
