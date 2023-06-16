import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { border, center, row_even } from "../../commonStyles";
import SimpleFlatButton from "../simpleFlatButton";

const { width, height } = Dimensions.get("window");
function ReviewModal({ color, setReviewModal }) {
    const [heart, setHeart] = useState("black");
    return (
        <View style={[styles.modalContainer, { borderColor: color }]}>
            <View style={[styles.modalLabelContainer, center]}>
                <Pressable style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]} onPress={() => { setReviewModal(false) }}>
                    <FontAwesome5 name="backspace" size={20} color="#676754" />
                </Pressable>
                <Text style={styles.modalLabel}>Review</Text>
            </View>
            <View style={[styles.reviewContainer]}>
                <TextInput
                    placeholder="Enter your review..."
                    style={[styles.reviewInput]}
                    multiline={true}
                />
                <View style={[styles.heart, row_even]}>
                    <Text style={styles.heartText}>...loved it</Text>
                    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]} onPress={() => { heart === "black" ? setHeart("red") : setHeart("black") }}>
                        {getCorrectHeart(heart)}
                    </Pressable>
                </View>
            </View>
            <View style={[center]}>
                <SimpleFlatButton width={120} color={color}>Submit</SimpleFlatButton>
            </View>
        </View>
    )
}

export default ReviewModal;

const getCorrectHeart = (heart) => {
    switch (heart) {
        case "black":
            return (
                <AntDesign name="hearto" size={16} color="black" />
            )
        case "red":
            return (
                <AntDesign name="heart" size={16} color="red" />
            )
        default:
            return;
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        height: 300,
        width: width - 20,
        marginLeft: 10,
        backgroundColor: "#fffcfcf9",
        marginTop: (height / 2) - 200,
        borderWidth: 3,
        borderRadius: 22
    },
    modalLabelContainer: {
        width: "100%",
        height: 40,
        marginTop: 16
    },
    backButton: {
        marginRight: 40,
        position: "absolute",
        left: 20
    },
    modalLabel: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#444"
    },
    reviewContainer: {
        height: 188
    },
    reviewInput: {
        height: 150,
        padding: 20,
        fontWeight: "bold",
        fontSize: 16,
        color: "#444"
    },
    heart: {
        position: "absolute",
        width: 120,
        height: 40,
        left: width - 150,
        top: 150
    },
    heartText: {
        fontWeight: "bold",
        color: "#444"
    }
})