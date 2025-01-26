import { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "../navigation/StackNavigator";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import { colors } from "../styles/global";
import { styles } from "../styles/css";
import { IPost } from "../types";

type Props = NativeStackScreenProps<StackParamList, "Posts">;

const PostsScreen: FC<Props> = ({ navigation, route }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.postsContainer}>
      <View style={styles.userContainer}>
        <Image
          style={styles.avatarPhoto}
          source={require("../assets/images/avatar.png")}
          resizeMode="cover"
        />
        <View style={styles.userData}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
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
                    navigation.navigate("Comments", { post: item })
                  }
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color={colors.underline_gray}
                  />
                  <Text style={styles.count}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", {
                      latitude: item.coords?.latitude,
                      longitude: item.coords?.longitude,
                    })
                  }
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Feather
                    name="map-pin"
                    size={24}
                    color={colors.underline_gray}
                  />
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
