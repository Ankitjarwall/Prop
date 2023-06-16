import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { border, center } from "../../commonStyles";

const { width, height } = Dimensions.get("window");

function OtpModal({ color, setModalActive, setModalState }) {
    return (
        <View style={[styles.modalContainer, { borderColor: color }]}>
            <Pressable style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]} onPress={() => { setModalState("orderForm"); setModalActive(false); }}>
                <FontAwesome5 name="backspace" size={20} color="#676754" />
            </Pressable>
            <View style={[styles.otpContainer, { borderColor: color, shadowColor: color }, center]}>
                <Text style={[styles.text]}>OTP is 2765</Text>
                <Text style={[styles.text]}>Prop Id is P-1</Text>
            </View>
            <View style={[styles.animationContainer]}><LottieView source={require("../../assets/greenTick.json")} autoPlay /></View>
            <View style={[styles.bottomText, center]}>
                <Text style={[styles.text, { color: "#8a8a86" }]}>See you on the dispatch center...</Text>
            </View>
        </View>
    )
}

export default OtpModal;

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
        display: "flex",
        alignItems: "center",
        paddingTop: 30
    },
    otpContainer: {
        width: 150,
        height: 150,
        borderRadius: 22,
        backgroundColor: "white",
        borderWidth: 0,
        shadowOffset: { height: 1, width: 3 },
        shadowRadius: 12,
        shadowOpacity: 0.9,
        elevation: 4
    },
    animationContainer: {
        position: "absolute",
        width: 230,
        height: 230,
        top: 55,
        marginTop: 50
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#444",
        height: 40,
        width: "100%",
        textAlign: "center"
    },
    bottomText: {
        marginTop: 80,
        width: 320,
        height: 40
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 20
    }
});