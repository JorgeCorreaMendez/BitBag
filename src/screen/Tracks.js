import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { getDocumentAsync } from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import colors from "../constants/colors";
import size from "../constants/size";
import SearchInputText from "../components/input/SearchInputText";
import Button from "../components/button/MyButton";
import SongList from "../components/item/SongList";

// TODO -> Ordenar canciones por fecha, nombre y duracion

const addNewSong = (
  <TouchableOpacity onPress={() => importSong()}>
    <MaterialIcons name="add-circle-outline" size={35} color={colors.primary} />
  </TouchableOpacity>
);

const Tracks = () => {
  useNavigation().setOptions({ headerRight: () => addNewSong });

  const [songs, setSongs] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log(songs)

  const importSong = () => {
    getDocumentAsync({ type: "audio/mpeg" })
      .then((song) => {
        if (song.type === "success") {
          setSongs((currentValue) => [
            ...currentValue,
            {
              key: uuidv4(),
              name: song.name.replace(".mp3"),
              size: song.size,
              uri: song.uri,
            },
          ]);
        }
      })
      .catch((err) => console.error(err.message));
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
        <>
          <SongList list={songs} />
        </>
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
