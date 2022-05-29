import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import ModalOptions from "../modal/ModalOptions";

import colors from "../../constants/colors";

const Song = ({
  songData,
  onDelete,
  goToPlayer,
  addSongToPlaylist,
  playlistName,
}) => {
  const [showOptionsModal, setShowOptionsModals] = useState(false);

  const options = [
    {
      title: "Reproducir canción",
      iconName: "play-arrow",
      event: () => goToPlayer(songData, playlistName),
    },
    {
      title: "Añadir a la playlist",
      iconName: "playlist-add",
      event: () => addSongToPlaylist(songData),
    },
    {
      title: "Borrar canción",
      iconName: "delete",
      event: () => onDelete(songData.key),
    },
  ];

  const getOptions = () => {
    return playlistName === "Tracks" ? (
      <View>
        <TouchableOpacity onPress={() => setShowOptionsModals(true)}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="menu" size={26} color={colors.primary} />
          </View>
        </TouchableOpacity>
        <ModalOptions
          DataToShow={songData}
          options={options}
          visible={showOptionsModal}
          closeModal={() => setShowOptionsModals(false)}
        />
      </View>
    ) : (
      <TouchableOpacity onPress={() => onDelete(songData.key, playlistName)}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="delete" size={26} color={colors.primary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingBottom: 20, paddingHorizontal: 10 }}>
      <TouchableOpacity onPress={() => goToPlayer(songData, playlistName)}>
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
              {songData.size} MB
            </Text>
          </View>
          {getOptions()}
        </View>
      </TouchableOpacity>
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
    paddingLeft: "20%",
  },
});

export default Song;
