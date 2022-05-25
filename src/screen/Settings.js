import { Alert, View, StyleSheet } from "react-native";
import Button from "../components/button/MyButton";
import colors from "../constants/colors";
import { getAuth, deleteUser } from "firebase/auth";

const deleteActualUser = () => {
  const user = getAuth().currentUser;

  deleteUser(user)
    .then(() => {
      console.log("Se ha elimina el usuario");
    })
    .catch((err) => {
      console.error("Se ha producido un error:" + err);
    });
};

const onDeleteUser = () => {
  Alert.alert(
    "¿Quiere eliminar la cuenta?",
    "Si borra su cuenta perdera todos los datos de la misma ¿Deseas continuar?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteActualUser(),
      },
    ]
  );
};

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.closeSessionContainer}>
        <Button
          title="Cerrar sesión"
          style={styles.closeSessionButton}
          onPress={() => onDeleteUser()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  closeSessionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  closeSessionButton: {
    backgroundColor: colors.superficies,
    color: colors.primary,
    borderRadius: 10,
    padding: 30,
  },
});

export default Settings;
