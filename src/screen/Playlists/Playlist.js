import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import SongList from "../../components/item/SongList.jsx";
import colors from "../../constants/colors";
import size from "../../constants/size";

const Playlist = ({ route }) => {
  const { playlistData } = route.params;
  const icon = playlistData.icon;

  const navigator = useNavigation();
  const goToPlayerWith = (song) => {
    const { name, songs } = playlistData;
    const startPosition = playlistData.songs.indexOf(song);

    navigator.navigate("Player", { playlistName: name, songs, startPosition });
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={[styles.iconContainer, { backgroundColor: icon.color }]}>
          <MaterialIcons name={icon.name} size={90} color={colors.primary} />
        </View>

        <View style={styles.titleAndOptionsContainer}>
          <Text style={styles.nameSong} numberOfLines={1}>
            {playlistData.name}
          </Text>

          <View style={styles.optionContainer}>
            <TouchableOpacity>
              <MaterialIcons name="settings" size={50} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                name="play-circle-outline"
                size={50}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.songsContainer}>
        {playlistData.songs.length === 0 ? (
          <Text style={{ color: colors.primary, fontSize: size.h2 }}>
            Esta Playlist esta vacia, puedes añadir canciones desde la pantalla
            de pistas
          </Text>
        ) : (
          <SongList list={playlistData.songs} goToPlayer={goToPlayerWith} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: "5%",
    paddingTop: "10%",
  },
  dataContainer: {
    alignItems: "center",
    paddingTop: "10%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: colors.secundary,
  },
  iconContainer: {
    borderRadius: 10,
    padding: 10,
  },
  titleAndOptionsContainer: {
    flex: 1,
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nameSong: {
    color: colors.primary,
    fontSize: size.h2,
  },
  optionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 20,
  },
  songsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});

export default Playlist;
