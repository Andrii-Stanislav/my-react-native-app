// TODO: define types
export interface IPost {
  photo: any;
  title: any;
  place: any;
  coords: { latitude?: number; longitude?: number };
  postId: any;
  commentCount: any;
}

export interface UserData {
  uid: string | null;
  email: string | null;
  displayName?: string | null;
  profilePhoto?: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
  photoURL?: string | null;
}

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: { userEmail: string };
  CreatePost: undefined;
  Posts: undefined;
  Map: { latitude?: number; longitude?: number };
  Comments: { postId: any; uri: any };
  Profile: { user: object };

  // Posts: undefined;
  // Map: { coords: object };
};
