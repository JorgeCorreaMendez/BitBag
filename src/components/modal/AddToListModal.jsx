import {
  Modal,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import colors from "../../constants/colors";
import size from "../../constants/size";

const AddToListModal = ({
  title,
  playlists,
  visible,
  closeModal,
  onPressItem,
}) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.background}>
        <TouchableOpacity onPress={() => closeModal()} style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.dataContainer}>
              <Text style={styles.text}>{title}</Text>
              <TouchableOpacity onPress={() => closeModal()}>
                <MaterialIcons name="close" size={30} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {playlists.length === 0 ? (
                <Text style={[styles.text, { padding: 20 }]}>
                  Aun no ha creado ninguna playlist, puede crearlas en la
                  pantalla de playlist
                </Text>
              ) : (
                playlists.map((playlist) => {
                  const icon = playlist.icon;

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onPressItem(playlist);
                      }}
                      style={styles.dataPlaylistContainer}
                      key={uuidv4()}
                    >
                      <View
                        style={[
                          styles.iconContainer,
                          { backgroundColor: icon.color },
                        ]}
                      >
                        <MaterialIcons
                          name={icon.name}
                          size={50}
                          color={colors.primary}
                        />
                      </View>
                      <View>
                        <Text
                          style={{ color: colors.primary, fontSize: size.h3 }}
                        >
                          {playlist.name}
                        </Text>
                        <Text
                          style={{ color: colors.secundary, fontSize: size.h3 }}
                        >
                          {playlist.songs.length} canciones
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.superficies,
    height: "100%",
  },
  container: {
    height: "100%",
    justifyContent: "flex-end",
  },
  modalContainer: {
    paddingTop: 10,
    paddingBottom: 25,
    backgroundColor: colors.background,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.secundary,
  },
  dataPlaylistContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },
  text: {
    fontSize: size.h3,
    color: colors.primary,
  },
  iconContainer: {
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 20,
  },
});

export default AddToListModal;
