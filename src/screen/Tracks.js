import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { getDocumentAsync } from "expo-document-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import SearchInputText from "../components/input/SearchInputText";
import Button from "../components/button/MyButton";
import SongList from "../components/item/SongList";

import SizeFileConverter from "../utils/SizeFileConverter";
import colors from "../constants/colors";
import size from "../constants/size";

// TODO -> Ordenar canciones por fecha, nombre y duracion
// TODO -> Añadir boton en el header para importar

const Tracks = () => {
  const [songs, setSongs] = useState([]);
  const [searchText, setSearchText] = useState("");

  const importSong = () => {
    getDocumentAsync({ type: "audio/mpeg" })
      .then((song) => {
        if (song.type === "success") {
          setSongs((currentValue) => [
            ...currentValue,
            {
              key: uuidv4(),
              name: song.name.replace(".mp3", ""),
              size: SizeFileConverter.getMBFrom(song.size),
              uri: song.uri,
            },
          ]);
        }
      })
      .catch((err) => console.error(err.message));
  };

  const deleteSong = (key) => {
    setSongs((currentValue) => currentValue.filter((el) => el === key));
  };

  const navigator = useNavigation();
  const goToPlayer = () => {
    navigator.navigate("Player", { songs });
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
              goToPlayer={goToPlayer}
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
