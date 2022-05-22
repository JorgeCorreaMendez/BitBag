import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import colors from "../constants/colors";
import size from "../constants/size";

const Player = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/default-album-art.png")}
        />
      </View>
      <View style={{ paddingLeft: "10%" }}>
        <Text style={{ color: colors.primary, fontSize: size.h3 }}>
          Nombre de canción
        </Text>
        <Text style={{ color: colors.secundary, fontSize: size.h4 }}>
          Reproduciendo desde pistas
        </Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={{ width: "90%" }}
          thumbTintColor={colors.secundary}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.secundary}
        />
      </View>
      <View style={styles.playerContainer}>
        <TouchableOpacity>
          <MaterialIcons
            name="skip-previous"
            size={50}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons
            name="pause-circle-filled"
            size={80}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons name="skip-next" size={50} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: colors.background,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "65%",
  },
  image: {
    width: "90%",
    height: "80%",
    borderRadius: 20,
  },
  sliderContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  playerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Player;
