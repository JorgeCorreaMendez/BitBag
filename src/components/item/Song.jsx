import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const Song = ({ songData }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("/Users/jorgecorrea/Library/Mobile Documents/com~apple~CloudDocs/ITG/ITG/BitBag/assets/default-album-art.png")}
      />
      <View style={styles.dataContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {songData.name}
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          {songData.size}MB
        </Text>
      </View>
      <TouchableOpacity>
        <View style={styles.iconContainer}>
          <MaterialIcons name="menu" size={26} color={colors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: "18%",
    margin: "5%",
    borderRadius: 10,
    backgroundColor: colors.superficies,
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: "35%",
    height: "100%",
  },
  dataContainer: {
    paddingLeft: 10,
    width: "50%",
  },
  title: {
    color: colors.primary,
    fontSize: 17,
    paddingBottom: 10,
  },
  description: {
    color: colors.secundary,
    fontSize: 17,
  },
  iconContainer: {
    paddingLeft: "15%",
  },
});

export default Song;
