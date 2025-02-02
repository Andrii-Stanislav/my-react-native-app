import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { ImageBackground, View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { collection, getCountFromServer, onSnapshot, query, where } from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { StackParamList, IPost } from "../types";
import { styles } from "../styles/css";
import { db } from "../firebase/config";
import { selectUser } from "../redux/user/userSelectors";
import { signOutUser } from "../redux/user/userOperations";
import { AppDispatch } from "../redux/store";

type HomeScreenProps = NativeStackScreenProps<StackParamList, "Profile">;

const ProfileScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const dispatch: AppDispatch = useDispatch();

  const { id, avatar, nickname } = useSelector(selectUser);

  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = async () => {
    const postsRef = collection(db, "posts");

    const q = query(postsRef, where("id", "==", id));

    onSnapshot(q, async (querySnapshot) => {
      const posts = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const coll = collection(db, `posts/${doc.id}/comments`);
          const snapshot = await getCountFromServer(coll);
          console.log("ProfileScreen", posts);
          return {
            ...doc.data(),
            postId: doc.id,
            commentCount: snapshot.data().count,
          };
        })
      );

      // @ts-ignore
      setPosts(posts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  // const newAvatar = async () => {
  //   await pickImage(setPhoto);
  //   dispatch(changeAvatar(photo));
  // };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/images/bg.png")} style={styles.imageBg}>
        <View style={styles.profileContainer}>
          <View style={{ marginBottom: 40 }}>
            <View style={styles.imgContainer}>
              {avatar && <Image style={styles.avatar} source={{ uri: avatar }} />}
              <TouchableOpacity
                style={styles.icon}
                //onPress={newAvatar}
              >
                <MaterialIcons name="close" size={20} color="#E8E8E8" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => dispatch(signOutUser())} style={{ marginLeft: "auto", marginTop: -40 }}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{nickname}</Text>
          {posts && (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.postId}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 34 }}>
                  <Image style={styles.photo} source={{ uri: item.photo }} />
                  <Text style={styles.title}>{item.title}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item?.postId,
                          uri: item.photo,
                        })
                      }
                    >
                      <EvilIcons name="comment" size={30} color="#BDBDBD" style={styles.commentIcon} />
                      <Text style={styles.count}>{item.commentCount}</Text>
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Map", {
                            latitude: item?.coords?.latitude,
                            longitude: item?.coords?.longitude,
                          })
                        }
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                        <Text style={styles.place}>{item.place}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
