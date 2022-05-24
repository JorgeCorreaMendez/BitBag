import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PlaylistItem from "../components/item/PlaylistItem";

import colors from "../constants/colors";

const Playlist = () => {
  const addToPlaylistIcon = () => {
    return (
      <TouchableOpacity>
        <MaterialIcons
          name="add-circle-outline"
          size={30}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  const Screen = () => (
    <View style={styles.container}>
      <PlaylistItem />
      <PlaylistItem />
    </View>
  );

  return { Screen, addToPlaylistIcon };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default Playlist;
