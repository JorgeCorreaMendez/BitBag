import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/button/MyButton";
import SongList from "../components/item/SongList";

import colors from "../constants/colors";
import size from "../constants/size";

// TODO -> Añadir alerta al borrar cancion (no se muestra)

const Tracks = ({ songs, importSong, deleteSong, addSongToPlaylist }) => {
  const navigator = useNavigation();
  const goToPlayerWith = (song, playlistName) => {
    const startPosition = songs.indexOf(song);

    navigator.navigate("Player", {
      playlistName,
      startPosition,
      songs,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: "5%" }}>
        <Button
          title="Importar"
          style={{
            color: colors.primary,
            backgroundColor: colors.superficies,
          }}
          onPress={importSong}
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
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ height: "85%" }}>
            <SongList
              list={songs}
              onDelete={deleteSong}
              goToPlayer={goToPlayerWith}
              addSongToPlaylist={addSongToPlaylist}
              playlistName="Tracks"
            />
          </View>
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
    height: "40%",
  },
  importContainer: {
    padding: "20%",
    justifyContent: "center",
  },
});
export default Tracks;
