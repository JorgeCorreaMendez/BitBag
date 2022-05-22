import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const Song = ({ songData }) => {
  return (
    <View style={{ paddingBottom: 20, paddingHorizontal: 10 }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/default-album-art.png")}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 120,
    borderRadius: 10,
    backgroundColor: colors.superficies,
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: "30%",
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
