import { Alert, View, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";

import NavigateButton from "../../components/button/NavigateButton";
import Button from "../../components/button/MyButton";

import colors from "../../constants/colors";

const closeSession = async () => {
  try {
    getAuth().signOut();
  } catch (err) {
    console.error("Error mientaras se cerraba la sesión" + err);
  }
};

const AlertCloseSession = () => {
  Alert.alert(
    "¿Quiere cerrar la sesión?",
    "Es posible que sus datos de pierdan con el cierre de la sesión ¿Deseas continuar?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Salir",
        style: "destructive",
        onPress: () => closeSession(),
      },
    ]
  );
};

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <NavigateButton
          title="Cuenta"
          iconName="person"
          navigateTo="Account"
          style={{ backgroundColor: colors.superficies, color: colors.primary }}
        />
      </View>
      <View style={styles.closeSessionContainer}>
        <Button
          title="Cerrar sesión"
          style={styles.closeSessionButton}
          onPress={() => AlertCloseSession()}
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
