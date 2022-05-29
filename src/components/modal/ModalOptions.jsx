import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import colors from "../../constants/colors";
import size from "../../constants/size";

const ModalOptions = ({
  DataToShow,
  description,
  options,
  visible,
  closeModal,
}) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => closeModal()}
          style={styles.modalContainer}
        >
          <View style={styles.configureContainer}>
            <View style={styles.dataContainer}>
              <View style={{ paddingHorizontal: 10 }}>
                {DataToShow.icon ? (
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: DataToShow.icon.color },
                    ]}
                  >
                    <MaterialIcons
                      name={DataToShow.icon.name}
                      size={60}
                      color={colors.primary}
                    />
                  </View>
                ) : (
                  <Image
                    style={styles.image}
                    source={require("../../../assets/default-album-art.png")}
                  />
                )}
              </View>

              <View>
                <Text style={{ color: colors.primary, fontSize: size.h3 }}>
                  {DataToShow.name}
                </Text>
                <Text style={{ color: colors.secundary, fontSize: size.h3 }}>
                  {DataToShow.size
                    ? DataToShow.size + "MB"
                    : description + " Canciones"}
                </Text>
              </View>
            </View>
            {options.map((option) => {
              const { title, iconName, event } = option;

              return (
                <TouchableOpacity
                  key={uuidv4()}
                  onPress={() => {
                    event();
                    closeModal();
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name={iconName}
                      size={40}
                      color={colors.primary}
                      style={{ padding: 20 }}
                    />
                    <Text style={{ color: colors.primary, fontSize: size.h3 }}>
                      {title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
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
  iconContainer: {
    borderRadius: 10,
    padding: 10,
  },
  optionsContainer: {
    paddingLeft: 10,
  },
});

export default ModalOptions;
