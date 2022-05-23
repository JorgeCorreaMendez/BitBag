import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import colors from "../constants/colors";
import size from "../constants/size";


const Player = ({ route }) => {
  const song = route.params?.song;
  const [isPlaying, setIsPlaying] = useState(false);
  const AudioPlayer = useRef(new Audio.Sound());

  const startNewSound = async () => {
    try {
      const isLoaded = await (
        await AudioPlayer.current.getStatusAsync()
      ).isLoaded;

      if (!isLoaded) {
        await AudioPlayer.current.unloadAsync();

        await AudioPlayer.current.loadAsync({ uri: song.uri });
      }

      await AudioPlayer.current.playAsync();

      setIsPlaying(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const pauseSound = async () => {
    try {
      await AudioPlayer.current.pauseAsync();

      setIsPlaying(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      {song ? (
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/default-album-art.png")}
            />
          </View>
          <View style={{ paddingLeft: "10%" }}>
            <Text style={{ color: colors.primary, fontSize: size.h3 }}>
              {song.name}
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

            {isPlaying ? (
              <TouchableOpacity onPress={() => pauseSound()}>
                <MaterialIcons
                  name="pause-circle-filled"
                  size={80}
                  color={colors.primary}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => startNewSound()}>
                <MaterialIcons
                  name="play-circle-filled"
                  size={80}
                  color={colors.primary}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity>
              <MaterialIcons
                name="skip-next"
                size={50}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: colors.primary, fontSize: size.h2 }}>
            Actualmente no se esta repoduciendo ninguna canción, seleccione una
            canción en la pantalla de pista para reproducirla.
          </Text>
        </View>
      )}
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
