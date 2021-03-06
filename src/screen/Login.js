import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { auth } from "../services/firebase";

import ModalAlert from "../components/modal/ModalAlert";
import ModalInputData from "../components/modal/ModalInputData";
import InputText from "../components/input/InputTextWithIcon";
import Button from "../components/button/MyButton";

import firebaseUtils from "../utils/firebaseUtils";
import colors from "../constants/colors";
import size from "../constants/size";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailRecover, setEmailRecover] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRecoverPasswordModal, setShowRecoverPasswordModal] =
    useState(false);
  const [messageModal, setMessageModal] = useState("");

  const onCloseModals = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);

    setMessageModal("");
  };

  const handleSingUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Tracks");
      })
      .catch((err) => {
        setMessageModal(firebaseUtils.getCustomErrorMessage(err.code));
        setShowErrorModal(true);
      });
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Tracks");
      })
      .catch((err) => {
        setMessageModal(firebaseUtils.getCustomErrorMessage(err.code));
        setShowErrorModal(true);
      });
  };

  const handleRecoverPassword = () => {
    auth
      .sendPasswordResetEmail(emailRecover)
      .then(() => {
        setMessageModal(
          "Se ha enviado el correo, compruebe su bandeja de entrada"
        );
        setShowSuccessModal(true);
      })
      .catch((err) => {
        setMessageModal(firebaseUtils.getCustomErrorMessage(err.code));
        setShowErrorModal(true);
      });

    setEmailRecover("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>BitBag</Text>
        <Text style={styles.slogan}>M??sica para todos</Text>
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
        placeholder="Contrase??a"
        secureTextEntry
        iconName="vpn-key"
      />
      <View style={styles.containerLogin}>
        <Button
          title="INICIAR SESI??N"
          style={styles.loginButton}
          onPress={handleLogin}
        />
      </View>
      <View style={styles.lostPasswordContainer}>
        <Button
          title="??Has perdido la contrase??a?"
          style={styles.lostPasswordText}
          onPress={() => setShowRecoverPasswordModal(true)}
        />
      </View>
      <View style={styles.separatorContainer}>
        <View style={styles.hr} />

        <Text style={styles.separatorText}>O</Text>
        <View style={styles.hr} />
      </View>

      <View style={styles.SingUpContainer}>
        <Button
          title="Registrate"
          style={styles.SignUpButton}
          onPress={() => handleSingUp()}
        />
      </View>
      <View>
        <ModalAlert
          visible={showSuccessModal}
          closeModal={onCloseModals}
          text={messageModal}
          iconName="check-circle"
          color={colors.success}
        />
        <ModalAlert
          visible={showErrorModal}
          closeModal={onCloseModals}
          text={messageModal}
          iconName="alert-circle"
          color={colors.error}
        />

        <ModalInputData
          visible={showRecoverPasswordModal}
          closeModal={() => setShowRecoverPasswordModal(false)}
          value={emailRecover}
          onChange={setEmailRecover}
          onPressIconFunction={handleRecoverPassword}
          iconName="send"
          textDescription="Introduzca su correo para poder enviarle un metodo de recoperaci??n."
          placeholder="Correo electronico"
          keyboardType="email-address"
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
  lostPasswordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },
  SingUpContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "15%",
  },
  SignUpButton: {
    backgroundColor: colors.superficies,
    color: colors.primary,
    justifyContent: "center",
    width: "100%",
    height: "50%",
  },

  lostPasswordText: {
    color: colors.primary,
    fontSize: size.h2,
  },
});

export default Login;
