import { Alert, Text, View, StyleSheet } from "react-native";
import { getAuth, deleteUser } from "firebase/auth";

import Button from "../../components/button/MyButton";
import colors from "../../constants/colors";
import size from "../../constants/size";

const deleteUserFirebase = () => {
  const user = getAuth().currentUser;

  try {
    deleteUser(user);

    console.log(`Se ha elimina el usuario ${user.email} `);
  } catch (err) {
    console.error("Error al eliminar el usuario " + err);
  }
};

const AlertDeleteUser = () => {
  Alert.alert(
    "¿Quiere eliminar la cuenta de bitbag?",
    "Si elimina su cuenta perdera todos los datos dentro de bitbag ¿Estas seguro que quieres continuar?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteUserFirebase(),
      },
    ]
  );
};

const Account = () => {
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: "10%" }}>
        <Text style={styles.dataTitle}>Correo Electronico</Text>
        <Text style={styles.emailText}>{getAuth().currentUser.email}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          title="Eliminar cuenta"
          style={styles.deleteUserButton}
          onPress={() => AlertDeleteUser()}
        />
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
