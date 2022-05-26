import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Playlists from "../../components/item/Playlists";
import Button from "../../components/button/MyButton";
import AddModal from "../../components/modal/AddModal";

import randomDataIcons from "../../constants/randomDataIcons";
import colors from "../../constants/colors";
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

const PlaylistsView = ({ playlists, createNewPlaylist }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState("");
  const [icon, setIcon] = useState({ name: "", color: "" });

  const onShowAddModal = () => {
    setIcon({ name: randomNameIcon(), color: randomColorIcon() });
    setShowAddModal(true);
  };

  const navigator = useNavigation();
  const goToPlaylistViewWith = (playlist) => {
    const playlistData = playlists.find((el) => el === playlist);

    navigator.navigate("PlaylistView", {
      playlistData,
    });
  };

  return (
    <View style={styles.container}>
      {playlists.length === 0 ? (
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Aun no existe ninguna Playlist, pulse en el boton de abajo para
            crear la primera.
          </Text>
          <Text style={styles.text}>↓</Text>
        </View>
      ) : (
        <Playlists list={playlists} goToPlaylist={goToPlaylistViewWith} />
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
        event={() => createNewPlaylist(namePlaylist, icon)}
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

export default PlaylistsView;
