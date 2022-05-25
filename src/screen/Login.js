import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { auth } from "../services/firebase";

import ModalAlert from "../components/modal/ModalAlert";
import InputText from "../components/input/InputTextWithIcon";
import Button from "../components/button/MyButton";

import colors from "../constants/colors";
import size from "../constants/size";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mensageModal, setMensageModal] = useState("");

  const onCloseModals = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);

    setMensageModal("");
  };

  const handleSingUp = () => {
    auth.createUserWithEmailAndPassword(email, password).catch((err) => {
      setMensageModal(err.message);
      setShowErrorModal(true);
    });
  };

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setMensageModal(err.message);
      setShowErrorModal(true);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>BitBag</Text>
        <Text style={styles.slogan}>Música para todos</Text>
      </View>

      <View style={styles.space}>
        <InputText
          value={email}
          onChange={setEmail}
          placeholder="Correo electronico"
          keyboardType="email-address"
          iconName="email"
        />
      </View>
      <InputText
        value={password}
        onChange={setPassword}
        placeholder="Contraseña"
        secureTextEntry
        iconName="vpn-key"
      />
      <View style={styles.containerLogin}>
        <Button
          title="INICIAR SESIÓN"
          style={styles.loginButton}
          onPress={handleLogin}
        />
      </View>
      <View style={styles.separatorContainer}>
        <View style={styles.hr} />

        <Text style={styles.separatorText}>O</Text>
        <View style={styles.hr} />
      </View>

      <View style={styles.otherOptionsContainer}>
        <Text style={styles.otherOptionsText}>¿No tienes cuenta ?</Text>
        <Button
          title="Registrate"
          style={styles.otherOptionsButton}
          onPress={() => handleSingUp()}
        />
      </View>
      <View style={styles.otherOptionsContainer}>
        <Text style={styles.otherOptionsText}>¿Has perdido la contraseña?</Text>
        <Button title="Recuperar" style={styles.otherOptionsButton} />
      </View>
      <View>
        <ModalAlert
          visible={showSuccessModal}
          closeModal={onCloseModals}
          text={mensageModal}
          iconName="check-circle"
          color={colors.success}
        />
        <ModalAlert
          visible={showErrorModal}
          closeModal={onCloseModals}
          text={mensageModal}
          iconName="alert-circle"
          color={colors.error}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "20%",
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  descriptionContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: colors.primary,
    fontSize: size.h1,
  },
  slogan: {
    color: colors.primary,
    fontSize: size.h2,
  },
  space: {
    paddingTop: "10%",
    paddingBottom: 20,
  },
  containerLogin: {
    paddingTop: "10%",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "10%",
  },
  separatorText: {
    fontSize: 50,
    color: colors.primary,
    paddingHorizontal: 20,
  },
  hr: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secundary,
  },
  otherOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "5%",
  },
  otherOptionsButton: {
    backgroundColor: colors.superficies,
    color: colors.primary,
    paddingHorizontal: 20,
  },
  otherOptionsText: {
    color: colors.primary,
    fontSize: size.h2,
    width: "50%",
  },
});

export default Login;
