import {
  Modal,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import size from "../../constants/size";

const AddModal = ({
  value,
  onChange,
  icon,
  visible,
  closeModal,
  event,
  ...props
}) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.background}>
        <TouchableOpacity onPress={() => closeModal()} style={styles.container}>
          <View style={styles.AddContainer}>
            <View
              style={[styles.iconContainer, { backgroundColor: icon.color }]}
            >
              <MaterialIcons
                name={icon.name}
                size={50}
                color={colors.primary}
              />
            </View>
            <TextInput
              value={value}
              onChangeText={(text) => onChange(text)}
              style={styles.input}
              {...props}
            />

            <TouchableOpacity
              onPress={() => {
                event();
                closeModal();
              }}
            >
              <MaterialIcons
                name="add-circle-outline"
                size={50}
                color={colors.primary}
              />
            </TouchableOpacity>
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
    paddingVertical: "20%",
    paddingHorizontal: "5%",
  },
  AddContainer: {
    backgroundColor: colors.background,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 100,
  },
  iconContainer: {
    borderRadius: 15,
    padding: 5,
  },
  input: {
    fontSize: size.h3,
    color: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.secundary,
    paddingBottom: 5,
    width: "50%",
    margin: 20,
  },
});

export default AddModal;
