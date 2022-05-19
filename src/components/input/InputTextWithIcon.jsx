import { TextInput, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import size from "../../constants/size";

const InputTextWithIcon = ({ value, onChange, iconName, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(text) => onChange(text)}
        style={styles.textInput}
        placeholderTextColor={colors.primary}
        {...props}
      />

      <MaterialIcons name={iconName} size={27} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.superficies,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 50,
  },
  textInput: {
    color: colors.primary,
    width: "80%",
    fontSize: size.h3,
  },
});

export default InputTextWithIcon;
