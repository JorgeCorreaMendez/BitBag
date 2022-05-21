import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import colors from "../constants/colors";
import size from "../constants/size";
import SearchInputText from "../components/input/SearchInputText";
import MyButton from "../components/button/MyButton";

// TODO -> Ordenar canciones por fecha, nombre y duracion

const Tracks = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ padding: "5%" }}>
        <SearchInputText
          value={searchText}
          onChange={setSearchText}
          placeholder="Ingresa el nombre de la canción"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ color: colors.primary, fontSize: size.h3 }}>
          Actualmente no hay ninguna pistas, importa canciones y reprodúcelas
          ahora.
        </Text>
      </View>
      <View style={styles.importContainer}>
        <MyButton
          title="Importar"
          style={{ color: colors.primary, backgroundColor: colors.superficies }}
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
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
    width: "100%",
    height: "35%",
  },
  importContainer: {
    paddingHorizontal: "20%",
    justifyContent: "center",
  },
});
export default Tracks;
