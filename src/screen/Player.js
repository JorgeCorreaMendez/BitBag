import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRef, useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
/* Importing the Time.js file from the utils folder. */

import Time from "../utils/Time";
import colors from "../constants/colors";
import size from "../constants/size";

// TODO -> problema en la posición de la playlist al seleccionar una cancion y la saltar

const Player = ({ route }) => {
  const playlist = route.params?.songs;
  const startPosition = route.params?.startPosition;
  const playlistName = route.params?.playlistName;

  const [positionPlaylist, setPositionPlaylist] = useState(startPosition);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionSong, setPositionSong] = useState(0);
  const [durationSong, setDurationSong] = useState(0);
  const AudioPlayer = useRef(new Audio.Sound());

  useEffect(() => {
    if (playlist) {
      setPositionPlaylist(startPosition);

      startNewSound();
    }
  }, [route]);

  useEffect(() => {
    setInterval(() => {
      AudioPlayer.current.getStatusAsync().then((res) => {
        if (res.isLoaded) {
          setPositionSong(res.positionMillis);
        }
      });
    }, 1000);

    setInterval(() => {
      AudioPlayer.current.getStatusAsync().then((res) => {
        if (res.isLoaded) {
          // positionMillis no llega a la duracion total de milisegundos
          const durationMillis = parseInt(res.playableDurationMillis) - 50;

          if (res.positionMillis >= durationMillis) {
            skipNextSong();
          }
        }
      });
    }, 5000);
  }, []);

  const startNewSound = async () => {
    await AudioPlayer.current.unloadAsync();
    await AudioPlayer.current.loadAsync({
      uri: playlist[positionPlaylist].uri,
    });

    const durationMillis = await (
      await AudioPlayer.current.getStatusAsync()
    ).durationMillis;

    await AudioPlayer.current.playAsync();
    setDurationSong(durationMillis);
    setIsPlaying(true);
  };

  const playSound = async () => {
    try {
      const isLoaded = await (
        await AudioPlayer.current.getStatusAsync()
      ).isLoaded;

      if (!isLoaded) {
        startNewSound();
      } else {
        await AudioPlayer.current.playAsync();
        setIsPlaying(true);
      }
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

  const skipPreviusSong = async () => {
    try {
      await AudioPlayer.current.unloadAsync();

      setPositionPlaylist(
        (currentValue) => (currentValue - 1) % playlist.length
      );
      startNewSound();
    } catch (err) {
      console.error(err);
    }
  };

  const skipNextSong = async () => {
    try {
      await AudioPlayer.current.unloadAsync();

      await setPositionPlaylist(
        (currentValue) => (currentValue + 1) % playlist.length
      );

      startNewSound();
    } catch (err) {
      console.error(err);
    }
  };

  const moveSongTo = async (positionMillis) => {
    try {
      await AudioPlayer.current.playFromPositionAsync(positionMillis);
      setIsPlaying(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const playAndPause = (
    <View>
      {isPlaying ? (
        <TouchableOpacity onPress={() => pauseSound()}>
          <MaterialIcons
            name="pause-circle-filled"
            size={80}
            color={colors.primary}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => playSound()}>
          <MaterialIcons
            name="play-circle-filled"
            size={80}
            color={colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {playlist ? (
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/default-album-art.png")}
            />
          </View>
          <View style={{ paddingLeft: "10%" }}>
            <Text style={{ color: colors.primary, fontSize: size.h3 }}>
              {playlist[positionPlaylist]?.name}
            </Text>
            <Text style={{ color: colors.secundary, fontSize: size.h4 }}>
              Reproduciendo desde {playlistName}
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              value={positionSong}
              maximumValue={durationSong}
              onValueChange={(value) => moveSongTo(value)}
              style={{ width: "90%" }}
              thumbTintColor={colors.secundary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.secundary}
            />
          </View>
          <View>
            <View style={styles.timeContainer}>
              <Text style={{ color: colors.primary }}>
                {Time.parseMillisecondsToMinutes(positionSong)}
              </Text>
              <Text style={{ color: colors.primary }}>
                {Time.parseMillisecondsToMinutes(durationSong)}
              </Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <TouchableOpacity onPress={() => skipPreviusSong()}>
              <MaterialIcons
                name="skip-previous"
                size={50}
                color={colors.primary}
              />
            </TouchableOpacity>
            {playAndPause}
            <TouchableOpacity onPress={() => skipNextSong()}>
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
    paddingTop: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "8%",
    width: "100%",
  },
  playerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
  },
});

export default Player;
