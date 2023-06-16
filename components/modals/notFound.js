import React from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import LottieView from 'lottie-react-native';
import { border, center } from '../../commonStyles';
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
function NotFound({ color, setModalActive, setModalState }) {
    return (
        <View style={[styles.modalContainer, { borderColor: color }, center]}>
            <Pressable style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]} onPress={() => { setModalState("orderForm"); setModalActive(false); }}>
                <FontAwesome5 name="backspace" size={20} color="#676754" />
            </Pressable>
            <LottieView source={require('../../assets/notFound.json')} autoPlay loop style={[{ width: 160, height: 160 }]} />
            <View style={[styles.textContainer, center]}>
                <Text style={styles.text}>Everything's booked...try something different!</Text>
            </View>
        </View>
    )
}

export default NotFound;

const styles = StyleSheet.create({
    modalContainer: {
        height: 340,
        width: width - 20,
        marginLeft: 10,
        backgroundColor: "#fffcfcf9",
        marginTop: height - 340,
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
    },
    textContainer: {
        height: 60,
        width: 370,
    },
    text: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#444"
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 20
    }
})