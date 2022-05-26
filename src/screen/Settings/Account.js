import { Text, View, StyleSheet } from "react-native";
import Button from "../../components/button/MyButton";
import colors from "../../constants/colors";
import size from "../../constants/size";

const Account = () => {
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: "10%" }}>
        <Text style={styles.dataTitle}>Correo Electronico</Text>
        <Text style={styles.emailText}>jorgecorreamen@gmail.com</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button title="Eliminar cuenta" style={styles.deleteUserButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  dataTitle: {
    color: colors.primary,
    fontSize: size.h2,
  },
  emailText: {
    color: colors.secundary,
    fontSize: size.h3,
    textDecorationLine: "underline",
  },
  deleteUserButton: {
    color: colors.primary,
    backgroundColor: colors.superficies,
    paddingVertical: 20,
    paddingHorizontal: "20%",
  },
});

export default Account;
