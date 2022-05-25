import { Text, TouchableOpacity, StyleSheet } from "react-native";

const MyButton = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.textContainer, style]} {...props}>
      <Text style={{ color: style?.color, fontSize: 20 }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
});

export default MyButton;
