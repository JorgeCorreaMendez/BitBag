import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import randomDataIcons from "../../constants/randomDataIcons";
import size from "../../constants/size";

const randomNameIcon = () => {
  return randomDataIcons.names[
    parseInt(Math.random() * randomDataIcons.names.length)
  ];
};

const randomColorIcon = () => {
  return randomDataIcons.colors[
    parseInt(Math.random() * randomDataIcons.colors.length)
  ];
};

const PlaylistItem = () => {
  return (
    <View style={styles.margins}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={randomNameIcon()}
            size={30}
            color={colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: colors.primary, fontSize: size.h3 }}>
            PlaylistSong
          </Text>
          <Text style={{ color: colors.secundary, fontSize: size.h4 }}>
            0 canciones
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
    backgroundColor: randomColorIcon(),
    borderRadius: 20,
  },
  textContainer: {
    paddingLeft: 20,
  },
});

export default PlaylistItem;
