import { TextInput, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import size from "../../constants/size";

const SearchInputText = ({ value, onChange, placeholder }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={27} color={colors.primary} />
      <TextInput
        value={value}
        onChangeText={(text) => onChange(text)}
        placeholder={placeholder}
        placeholderTextColor={colors.primary}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.superficies,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 50,
  },
  textInput: {
    color: colors.primary,
    width: "90%",
    fontSize: size.h3,
    paddingLeft: 10,
  },
});

export default SearchInputText;
