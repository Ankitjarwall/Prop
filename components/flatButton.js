import { Dimensions, Animated, Pressable, StyleSheet, Text, View } from 'react-native';

let w;
const { width, height } = Dimensions.get('window');
function FlatButton({ children, onPress, w, scrollX, index, color }) {
    w = w;
    const inputRange = [
        (index - 0.55) * width,
        index * width,
        (index + 0.55) * width,
    ];
    const inputTranslateRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
    });
    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
    });
    const translateX = scrollX.interpolate({
        inputRange: inputTranslateRange,
        outputRange: [width * 0.4, 0, -width * 0.4],
    });
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Animated.View style={[styles.button, { backgroundColor: color, opacity, transform: [{ scale }] }]}>
                <Animated.Text style={[styles.buttonText, { transform: [{ translateX: translateX }] }]}>{children}</Animated.Text>
            </Animated.View>
        </Pressable>
    )
}

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: w,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 22,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    pressed: {
        opacity: 0.3,
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "800",
        color: "#444"
    }
})