const getCustomErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-exists":
      errorCode = "Error, el correo introducido ya esta en uso";
      break;
    case "auth/internal-error":
      errorCode = "Error, inesperado mientras se procesaba la solicitud";
      break;
    case "auth/invalid-email":
      errorCode = "Error, el email introducido no es valido";
      break;
    case "auth/invalid-password":
      errorCode = "Error, la contraseña introducida no es valida";
      break;
    case "auth/user-not-found":
      errorCode = "Error, no se ha encontrado ninguna cuenta este email";
      break;
    case "auth/wrong-password":
      errorCode = "Error, Contraseña incorrecta";
      break;
    case "auth/too-many-requests":
      errorCode =
        "Error, Has alcanzado el limite de intentos, Prueba mas tarde.";
      break;
    case "auth/weak-password":
      errorCode =
        "Error, Ha introducido una contraseña muy corta, Introduzca más de 6 caracteres";
      break;
    case "auth/missing-email":
      errorCode = "Error, No ha introducido ningún correo";
      break;
    default:
      errorCode = `Error desconocido, codigo ${errorCode}`;
  }

  return errorCode;
};

export default { getCustomErrorMessage };
