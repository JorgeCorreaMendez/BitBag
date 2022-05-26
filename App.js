import { View } from "react-native";
import { useState } from "react";
import { getDocumentAsync } from "expo-document-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import Navigator from "./src/Navigator";
import ModalAlert from "./src/components/modal/ModalAlert";

import SizeFileConverter from "./src/utils/sizeFileConverter";
import colors from "./src/constants/colors";

export default function App() {
  const [songs, setSongs] = useState([]);

  const [playlistList, setPlaylistList] = useState([]);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mensageModal, setMensageModal] = useState("");

  const onCloseModals = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);

    setMensageModal("");
  };

  const importSong = async () => {
    try {
      const song = await getDocumentAsync({ type: "audio/mpeg" });

      if (song.type === "success") {
        const isSongInPlaylist = songs.some(
          (el) => el.name + ".mp3" === song.name
        );

        if (!isSongInPlaylist) {
          setSongs((currentValue) => [
            ...currentValue,
            {
              key: uuidv4(),
              name: song.name.replace(".mp3", ""),
              size: SizeFileConverter.getMBFrom(song.size),
              uri: song.uri,
            },
          ]);
          setMensageModal("Se ha importado la cancion a la lista");
          setShowSuccessModal(true);
        } else {
          setMensageModal("La canción ya se encuentra en la lista");
          setShowErrorModal(true);
        }
      }
    } catch (err) {
      setMensageModal(`Error al importar la canción, codigo ${err.code}`);
      setShowErrorModal(true);
    }
  };

  const deleteSong = (key) => {
    setSongs((currentValue) => currentValue.filter((el) => el.key !== key));
  };

  const createNewPlaylist = (name, icon) => {
    const existPlaylist = playlistList.find((el) => el.name === name);

    if (!existPlaylist && name !== "") {
      setPlaylistList((currentValue) => [
        ...currentValue,
        { key: uuidv4(), name, icon, songs: [] },
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Navigator
        songs={songs}
        importSong={importSong}
        deleteSong={deleteSong}
        playlistList={playlistList}
        createNewPlaylist={createNewPlaylist}
      />

      <ModalAlert
        visible={showSuccessModal}
        closeModal={onCloseModals}
        text={mensageModal}
        iconName="check-circle"
        color={colors.success}
      />
      <ModalAlert
        visible={showErrorModal}
        closeModal={onCloseModals}
        text={mensageModal}
        iconName="alert-circle"
        color={colors.error}
      />
    </View>
  );
}
