import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import size from "../../constants/size";

const ModalOptions = ({ DataToShow, options, visible, closeModal }) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.container}>
        <Modal animationType="slice" visible={visible} transparent={true}>
          <TouchableOpacity
            onPress={() => closeModal()}
            style={styles.modalContainer}
          >
            <View style={styles.configureContainer}>
              <View style={styles.dataContainer}>
                <View style={{ paddingHorizontal: 10 }}>
                  <Image
                    style={styles.image}
                    source={require("../../../assets/default-album-art.png")}
                  />
                </View>

                <View>
                  <Text style={{ color: colors.primary, fontSize: size.h3 }}>
                    {DataToShow.name}
                  </Text>
                  <Text style={{ color: colors.secundary, fontSize: size.h3 }}>
                    {DataToShow.size} MB
                  </Text>
                </View>
              </View>
              {options.map((option) => {
                const { title, iconName, event } = option;

                return (
                  <TouchableOpacity
                    key={DataToShow.key}
                    onPress={() => {
                      event();
                      closeModal();
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <MaterialIcons
                        name={iconName}
                        size={40}
                        color={colors.primary}
                        style={{ padding: 20 }}
                      />
                      <Text
                        style={{ color: colors.primary, fontSize: size.h3 }}
                      >
                        {title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    height: "100%",
  },
  modalContainer: {
    height: "100%",
    justifyContent: "flex-end",
  },
  configureContainer: {
    paddingVertical: 15,
    backgroundColor: colors.background,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.secundary,
    paddingBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    paddingLeft: 10,
  },
});

export default ModalOptions;
