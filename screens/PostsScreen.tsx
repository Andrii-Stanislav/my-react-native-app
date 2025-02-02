import { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { useSelector } from "react-redux";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { collection, getCountFromServer, onSnapshot, query } from "firebase/firestore";

import { StackParamList, IPost } from "../types";
import { colors } from "../styles/global";
import { styles } from "../styles/css";
import { selectUser } from "../redux/user/userSelectors";

import { db } from "../firebase/config";

type Props = NativeStackScreenProps<StackParamList, "Posts">;

const PostsScreen: FC<Props> = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"));

    onSnapshot(q, async (querySnapshot) => {
      const posts = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const coll = collection(db, `posts/${doc.id}/comments`);
          const snapshot = await getCountFromServer(coll);

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
    getAllPosts();
  }, []);

  return (
    <View style={styles.screensContainer}>
      <View style={styles.userContainer}>
        <Image style={styles.avatarPhoto} source={require("../assets/images/avatar.png")} resizeMode="cover" />
        <View style={styles.userData}>
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 34 }}></View>}
          renderItem={({ item }) => (
            <View>
              <Image style={styles.postPhoto} source={{ uri: item.photo }} />
              <Text style={styles.postTitle}>{item.title}</Text>
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
                      postId: item.postId,
                      uri: item.photo,
                    })
                  }
                >
                  <Feather name="message-circle" size={24} color={colors.underline_gray} />
                  <Text style={styles.count}>{item.commentCount || 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", {
                      latitude: item.coords.latitude,
                      longitude: item.coords.longitude,
                    })
                  }
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Feather name="map-pin" size={24} color={colors.underline_gray} />
                  <Text style={styles.place}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PostsScreen;
