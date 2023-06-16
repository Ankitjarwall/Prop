import { Pressable, StyleSheet, Text, View } from "react-native";

function SimpleFlatButton({ children, onPress, width, color }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        { backgroundColor: color, width: width },
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default SimpleFlatButton;

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 22,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
  },
});
