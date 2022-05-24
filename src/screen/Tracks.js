import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { getDocumentAsync } from "expo-document-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import SearchInputText from "../components/input/SearchInputText";
import Button from "../components/button/MyButton";
import SongList from "../components/item/SongList";
import ModalAlert from "../components/modal/ModalAlert";

import SizeFileConverter from "../utils/SizeFileConverter";
import colors from "../constants/colors";
import size from "../constants/size";

// TODO -> Ordenar canciones por fecha, nombre y duracion
// TODO -> Añadir boton en el header para importar
// TODO -> Añadir alerta al borrar cancion

const Tracks = () => {
  const [songs, setSongs] = useState([]);
  const [searchText, setSearchText] = useState("");
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
    setSongs((currentValue) => currentValue.filter((el) => el === key));
  };

  const navigator = useNavigation();
  const goToPlayerWith = (song) => {
    const startPosition = songs.indexOf(song);

    navigator.navigate("Player", { songs, startPosition });
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: "5%" }}>
        <SearchInputText
          value={searchText}
          onChange={setSearchText}
          placeholder="Ingresa el nombre de la canción"
        />
      </View>

      {songs.length === 0 ? (
        <View>
          <View style={styles.textContainer}>
            <Text style={{ color: colors.primary, fontSize: size.h3 }}>
              Actualmente no hay ninguna pistas, importa canciones y
              reprodúcelas ahora.
            </Text>
          </View>
          <View style={styles.importContainer}>
            <Button
              title="Importar"
              style={{
                color: colors.primary,
                backgroundColor: colors.superficies,
              }}
              onPress={importSong}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={{ height: "80%" }}>
            <SongList
              list={songs}
              onDelete={deleteSong}
              goToPlayer={goToPlayerWith}
            />
          </View>

          <Button
            title="Importar"
            style={{
              color: colors.primary,
              backgroundColor: colors.superficies,
            }}
            onPress={importSong}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
    width: "100%",
    height: "35%",
  },
  importContainer: {
    padding: "20%",
    justifyContent: "center",
  },
});
export default Tracks;
