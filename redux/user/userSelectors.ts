import { RootState } from "../store";

export const selectId = (state: RootState) => state.user.userInfo.uid;
export const selectEmail = (state: RootState) => state.user.userInfo.email;
export const selectNickName = (state: RootState) => state.user.userInfo.displayName;
export const selectAvatar = (state: RootState) => state.user.userInfo.profilePhoto;
export const selectIsAuth = (state: RootState) => state.user.userInfo.isAuth;

export const selectUser = (state: RootState) => ({
  id: state.user?.userInfo?.uid,
  email: state.user?.userInfo?.email,
  displayName: state.user?.userInfo?.displayName,
  profilePhoto: state.user?.userInfo?.profilePhoto,
  avatar: state.user?.userInfo?.profilePhoto,
  nickname: state.user?.userInfo?.displayName,
});
