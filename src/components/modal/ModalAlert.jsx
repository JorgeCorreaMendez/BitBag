import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import size from "../../constants/size";
import colors from "../../constants/colors";

const ModalAlert = ({ visible, closeModal, iconName, text, color }) => {
  return (
    <Modal animationType="slice" visible={visible} transparent={true}>
      <TouchableOpacity onPress={() => closeModal()}>
        <View style={styles.container}>
          <View style={[styles.alertContainer, { backgroundColor: color }]}>
            <Feather name={iconName} size={30} color="white" />
            <View style={{ width: "90%" }}>
              <Text style={styles.textTitle}>{text}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: "20%",
    paddingHorizontal: "5%",
    justifyContent: "flex-end",
  },
  alertContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "6%",
    borderRadius: 5,
  },
  textTitle: {
    color: colors.primary,
    fontSize: size.h3,
    paddingLeft: 20,
  },
});

export default ModalAlert;
