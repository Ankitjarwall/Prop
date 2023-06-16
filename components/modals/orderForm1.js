import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import SimpleFlatButton from "../simpleFlatButton";
import { row_even, center, border } from "../../commonStyles";

const { width, height } = Dimensions.get("window");
const options1 = ["Today", "Tomorrow", "Third Day"];
const options2 = ["Day", "Night"];
function OrderForm1({ color, handleProceedEvent, setDay, setTime, setModalActive, day, time }) {
    return (
        <View style={[styles.modalContainer, { borderColor: color }]}>
            <Pressable style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]} onPress={() => { setModalActive(false) }}>
                <FontAwesome5 name="backspace" size={20} color="#676754" />
            </Pressable>
            <View style={[styles.dayInput]}>
                <View style={[styles.modalLabelContainer, center]}>
                    <Text style={styles.modalLabel}>Select day</Text>
                </View>
                <View style={[row_even, { padding: 10 }]}>
                    {options1.map((item, index) => {
                        return (
                            <View style={[{ flex: 1 }, row_even]} key={index}>
                                <Pressable onPress={() => { setDay(item) }}>
                                    <View style={[{ borderColor: color }, styles.tickerBox, day === item ? { backgroundColor: color } : { backgroundColor: "transparent" }]}></View>
                                </Pressable>
                                <View><Text style={[styles.options, day === item ? { color: "#444" } : { color: "#85888a" }]}>{item}</Text></View>
                            </View>
                        )
                    })}

                </View>
            </View>
            <View style={[styles.dayInput]}>
                <View style={[styles.modalLabelContainer, center]}>
                    <Text style={styles.modalLabel}>Select time</Text>
                </View>
                <View style={[row_even, { padding: 10 }]}>
                    {options2.map((item, index) => {
                        return (
                            <View style={[{ flex: 1 }, row_even]} key={index}>
                                <Pressable onPress={() => { setTime(item) }}>
                                    <View style={[{ borderColor: color }, styles.tickerBox, time === item ? { backgroundColor: color } : { backgroundColor: "transparent" }]}></View>
                                </Pressable>
                                <View><Text style={[{ fontSize: 16, fontWeight: "bold" }, time === item ? { color: "#444" } : { color: "#85888a" }]}>{item}</Text></View>
                            </View>
                        )
                    })}
                </View>
            </View>
            <View style={[styles.dayInput, center]}>
                <SimpleFlatButton width={120} onPress={handleProceedEvent} color={color}>Proceed</SimpleFlatButton>
            </View>
        </View>
    )
}

export default OrderForm1;

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
    dayInput: {
        flex: 1
    },
    modalLabelContainer: {
        width: "100%",
        height: 40,
        marginTop: 16
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 25
    },
    tickerBox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2
    },
    options: {
        fontSize: 16,
        fontWeight: "bold"
    },
    modalLabel: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#444"
    }
})