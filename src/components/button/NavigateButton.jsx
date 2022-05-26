import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const NavigateButton = ({ title, style, iconName, navigateTo, ...props }) => {
  const navigator = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.textContainer, style]}
      onPress={() => navigator.navigate(navigateTo)}
      {...props}
    >
      <MaterialIcons name={iconName} size={28} color={colors.primary} />
      <Text style={[{ color: style?.color }, styles.title]}>{title}</Text>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <MaterialIcons name="arrow-forward" size={28} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
  },
  title: {
    paddingLeft: 20,
    fontSize: 20,
  },
});

export default NavigateButton;
