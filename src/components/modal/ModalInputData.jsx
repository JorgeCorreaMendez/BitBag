import {
  Platform,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import size from "../../constants/size";

const ModalInputData = ({
  visible,
  closeModal,
  value,
  onChange,
  iconName,
  textDescription,
  onPressIconFunction,
  ...props
}) => {
  return (
    <Modal animationType="slice" visible={visible} transparent={true}>
      <View style={styles.background}>
        <TouchableOpacity onPress={() => closeModal()}>
          <View style={styles.container}>
            <View style={styles.modalContainer}>
              <Text style={styles.textInfo}>{textDescription}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  style={styles.textInput}
                  placeholderTextColor={colors.primary}
                  {...props}
                />
                <TouchableOpacity
                  onPress={() => {
                    closeModal();
                    onPressIconFunction();
                  }}
                >
                  <MaterialIcons
                    name={iconName}
                    size={30}
                    color={colors.primary}
                    style={{ paddingLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
    paddingVertical: "10%",
    paddingHorizontal: "3%",
    height: "100%",
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderRadius: 15,
    paddingLeft: 20,
    paddingVertical: "8%",
  },
  textInfo: {
    color: colors.primary,
    fontSize: size.h4,
    paddingBottom: 20,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    width: "80%",
    fontSize: size.h3,
    backgroundColor: colors.superficies,
    color: colors.primary,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ModalInputData;
