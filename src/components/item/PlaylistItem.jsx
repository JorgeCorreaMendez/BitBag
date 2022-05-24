import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import size from "../../constants/size";

const PlaylistItem = ({ playlistData }) => {
  const { name, color } = playlistData.icon;

  return (
    <View style={styles.margins}>
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <MaterialIcons name={name} size={30} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: colors.primary, fontSize: size.h3 }}>
            {playlistData.name}
          </Text>
          <Text style={{ color: colors.secundary, fontSize: size.h4 }}>
            {playlistData.songs.length} canciones
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  margins: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
  },
  container: {
    height: 80,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  iconContainer: {
    padding: 15,
    borderRadius: 20,
  },
  textContainer: {
    paddingLeft: 20,
  },
});

export default PlaylistItem;
