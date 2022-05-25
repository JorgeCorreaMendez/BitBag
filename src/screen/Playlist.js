import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import Button from "../components/button/MyButton";

import randomDataIcons from "../constants/randomDataIcons";
import colors from "../constants/colors";
import AddModal from "../components/modal/AddModal";
import PlaylistList from "../components/item/PlaylistList";
import size from "../constants/size";
import { useNavigation } from "@react-navigation/native";

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

const Playlist = () => {
  const [playlistList, setPlaylistList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState("");
  const [icon, setIcon] = useState({ name: "", color: "" });

  const onShowAddModal = () => {
    setIcon({ name: randomNameIcon(), color: randomColorIcon() });
    setShowAddModal(true);
  };

  const navigator = useNavigation();
  const goToPlaylistViewWith = (playlist) => {
    const playlistData = playlistList.find((el) => el === playlist);

    navigator.navigate("PlaylistView", {
      playlistData,
    });
  };

  // TODO -> Cambia el estado pero no se muestra el modal
  const addToPlaylistIcon = () => {
    return (
      <TouchableOpacity onPress={() => setShowAddModal(true)}>
        <MaterialIcons
          name="add-circle-outline"
          size={30}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  const createNewPlaylist = () => {
    const existPlaylist = playlistList.find((el) => el.name === namePlaylist);

    if (!existPlaylist && namePlaylist !== "") {
      setPlaylistList((currentValue) => [
        ...currentValue,
        { key: uuidv4(), name: namePlaylist, icon, songs: [] },
      ]);

      setNamePlaylist("");
    }
  };

  return (
    <View style={styles.container}>
      {playlistList.length === 0 ? (
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Aun no existe ninguna Playlist, pulse en el boton de abajo para
            crear la primera.
          </Text>
          <Text style={styles.text}>↓</Text>
        </View>
      ) : (
        <PlaylistList list={playlistList} goToPlaylist={goToPlaylistViewWith} />
      )}

      <View style={styles.createContainer}>
        <Button
          title="Crear nueva playlist"
          style={{
            color: colors.primary,
            backgroundColor: colors.superficies,
          }}
          onPress={() => onShowAddModal()}
        />
      </View>

      <AddModal
        value={namePlaylist}
        onChange={setNamePlaylist}
        visible={showAddModal}
        event={createNewPlaylist}
        closeModal={() => setShowAddModal(false)}
        icon={icon}
        placeholder="playlist name"
        placeholderTextColor={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  createContainer: {
    paddingVertical: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: colors.primary,
    fontSize: size.h2,
  },
});

export default Playlist;
