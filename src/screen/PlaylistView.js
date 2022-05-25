import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";

const PlaylistView = ({ route }) => {
  const { playlistData } = route.params;

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default PlaylistView;
