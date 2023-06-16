import { useState } from "react";
import { StyleSheet, View, Pressable, Dimensions, Text } from "react-native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { center } from "../../commonStyles";
import SimpleFlatButton from "../simpleFlatButton";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("screen");

function handleProceedEvent() { }

const animation = {
    0: { opacity: 0 },
    1: { opacity: 1 }
}

const Info = ({ setInfo }) => {
    return (
        <View style={styles.modalContainer}>
            <Pressable style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]} onPress={() => { setInfo(false); }}>
                <FontAwesome5 name="backspace" size={20} color="#676754" />
            </Pressable>
            <Animatable.View
                style={{ marginTop: 30, display: 'flex', alignItems: "center", justifyContent: "center" }}
                animation={animation}
                useNativeDriver
                delay={400}
            >
                <Text style={styles.infoText}>
                    Depending on your punctuality and quality of return you are credited by 1-5 points.
                    If your credit falls below 2 then you can no more use this service. In that case you have
                    to pump your score for ₹79 for one point.
                </Text>
                <Text style={styles.subInfo}>@ Macbease Connections Props 2023</Text>
            </Animatable.View>
        </View>
    )
}

const Score = ({ setCreditModal, setInfo }) => {
    return (
        <View style={styles.modalContainer}>
            <Pressable style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]} onPress={() => { setCreditModal(false); }}>
                <FontAwesome5 name="backspace" size={20} color="#676754" />
            </Pressable>
            <Pressable style={({ pressed }) => [styles.infoButton, pressed && { opacity: 0.5 }]} onPress={() => { setInfo(true); }}>
                <Entypo name="info-with-circle" size={20} color="#676754" />
            </Pressable>
            <View style={[styles.otpContainer, center]}>
                <Text style={[styles.text]}>Credit Score:</Text>
                <Text style={[styles.text]}>3.2</Text>
            </View>
            <View style={{ marginTop: 22 }}>
                <SimpleFlatButton width={120} onPress={handleProceedEvent} color={"#8c93f4b4"}>Pump</SimpleFlatButton>
            </View>
        </View>
    )
}

function CreditModal({ setCreditModal }) {
    const [info, setInfo] = useState(false);

    function getCorrectContent() {
        if (info) {
            return (
                <Info setInfo={setInfo} />
            )
        }
        return <Score setCreditModal={setCreditModal} setInfo={setInfo} />
    }

    return (
        <>
            {getCorrectContent()}
        </>
    )
}

export default CreditModal;

const styles = StyleSheet.create({
    subInfo: {
        fontWeight: "bold",
        color: "#8c93f4b4",
        marginTop: 22
    },
    infoText: {
        fontWeight: "bold",
        paddingHorizontal: 22,
        fontSize: 18,
        color: "#444",
        textAlign: 'center',
        lineHeight: 22
    },
    infoButton: {
        position: "absolute",
        left: (width / 2) + 75,
        top: 50
    },
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
        paddingTop: 30,
        borderColor: "#8c93f4b4",
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 20
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
        elevation: 4,
        borderColor: "#8c93f4b4",
        shadowColor: "#8c93f4b4",
        marginTop: 30
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#444",
        height: 40,
        width: "100%",
        textAlign: "center"
    }
});