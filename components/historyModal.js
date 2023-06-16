import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Animated, FlatList, Image, Pressable, Modal } from 'react-native';
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { border, center, row, row_even } from "../commonStyles";
import data from '../data';
import ReviewModal from './modals/reviewModal';

const historyData = [
    { id: 1, otp: 3214, prop: "P-4", time: "9am to 10am", propType: "PROJECTOR", date: "20-03-2023", status: "Booked", reviewed: false },
    { id: 2, otp: 1234, prop: "C-3", time: "11am to 12noon", propType: "CHESS", date: "20-03-2023", status: "Dispatched", reviewed: false },
    { id: 3, otp: 6754, prop: "B-1", time: "2pm to 4pm", propType: "BOARD", date: "19-03-2023", status: "Received", reviewed: false },
    { id: 4, otp: 3234, prop: "S-4", time: "Night Shift", propType: "CANVAS", date: "17-03-2023", status: "Received", reviewed: false },
    { id: 5, otp: 3214, prop: "P-4", time: "9am to 10am", propType: "PROJECTOR", date: "20-03-2023", status: "Received", reviewed: true },
    { id: 6, otp: 1234, prop: "C-3", time: "11am to 12noon", propType: "CHESS", date: "20-03-2023", status: "Received", reviewed: false },
    { id: 7, otp: 6754, prop: "B-1", time: "2pm to 4pm", propType: "BOARD", date: "19-03-2023", status: "Received", reviewed: true },
    { id: 8, otp: 3234, prop: "S-4", time: "Night Shift", propType: "CANVAS", date: "17-03-2023", status: "Received", reviewed: true },
    { id: 9, otp: 3214, prop: "P-4", time: "9am to 10am", propType: "PROJECTOR", date: "20-03-2023", status: "Received", reviewed: true },
    { id: 10, otp: 1234, prop: "C-3", time: "11am to 12noon", propType: "CHESS", date: "20-03-2023", status: "Received", reviewed: true },
    { id: 11, otp: 6754, prop: "B-1", time: "2pm to 4pm", propType: "BOARD", date: "19-03-2023", status: "Received", reviewed: true },
    { id: 12, otp: 3234, prop: "S-4", time: "Night Shift", propType: "CANVAS", date: "17-03-2023", status: "Received", reviewed: true },
    { id: 13, otp: 3214, prop: "P-4", time: "9am to 10am", propType: "PROJECTOR", date: "20-03-2023", status: "Booked", reviewed: false },
    { id: 14, otp: 1234, prop: "C-3", time: "11am to 12noon", propType: "CHESS", date: "20-03-2023", status: "Dispatched", reviewed: false },
    { id: 15, otp: 6754, prop: "B-1", time: "2pm to 4pm", propType: "BOARD", date: "19-03-2023", status: "Received", reviewed: false },
    { id: 16, otp: 3234, prop: "S-4", time: "Night Shift", propType: "CANVAS", date: "17-03-2023", status: "Received", reviewed: false },
    { id: 17, otp: 3214, prop: "P-4", time: "9am to 10am", propType: "PROJECTOR", date: "20-03-2023", status: "Received", reviewed: true },
    { id: 18, otp: 1234, prop: "C-3", time: "11am to 12noon", propType: "CHESS", date: "20-03-2023", status: "Received", reviewed: false },
    { id: 19, otp: 6754, prop: "B-1", time: "2pm to 4pm", propType: "BOARD", date: "19-03-2023", status: "Received", reviewed: true },
    { id: 20, otp: 3234, prop: "S-4", time: "Night Shift", propType: "CANVAS", date: "17-03-2023", status: "Received", reviewed: true },
    { id: 21, otp: 3214, prop: "P-4", time: "9am to 10am", propType: "PROJECTOR", date: "20-03-2023", status: "Received", reviewed: true },
    { id: 22, otp: 1234, prop: "C-3", time: "11am to 12noon", propType: "CHESS", date: "20-03-2023", status: "Received", reviewed: true },
    { id: 23, otp: 6754, prop: "B-1", time: "2pm to 4pm", propType: "BOARD", date: "19-03-2023", status: "Received", reviewed: true },
    { id: 24, otp: 3234, prop: "S-4", time: "Night Shift", propType: "CANVAS", date: "17-03-2023", status: "Received", reviewed: true }
]

const { width, height } = Dimensions.get('window');
const ITEM_SIZE_Opacity = 120;
const ITEM_SIZE = 120;
let color;

function HistoryModal({ setHistoryModal }) {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [reviewModal, setReviewModal] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fffffff5" }}>
            <View >
                <Pressable style={[styles.goBack, row]} onPress={() => setHistoryModal(false)}>
                    <FontAwesome5 name="backspace" size={20} color="#676754" />
                    <Text style={[styles.title, center]}>History</Text>
                </Pressable>
                <View style={[styles.carousel]}>
                    <Animated.FlatList
                        data={historyData}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        )}
                        contentContainerStyle={[center]}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            const inputRange = [ITEM_SIZE * (index - 1), ITEM_SIZE * index, ITEM_SIZE * (index + 1)];
                            const scale = scrollY.interpolate({
                                inputRange,
                                outputRange: [1, 1, 0],
                            });
                            const opacityInputRange = [ITEM_SIZE * (index - 1), ITEM_SIZE * index, ITEM_SIZE * (index + 1)];
                            const opacity = scrollY.interpolate({
                                inputRange: opacityInputRange,
                                outputRange: [1, 1, 0]
                            })
                            return (
                                <Animated.View style={[styles.historyCard, { opacity, transform: [{ scale }], borderColor: color, backgroundColor: color }]}>
                                    <View style={[{ flex: 1 }, row]}>
                                        <View style={center}>
                                            <Image source={getImageSource(item)} style={[styles.imageStyle]} />
                                            <View style={row_even}>
                                                {getGreenDot(item)}
                                                {getReviewIcon(item, setReviewModal)}
                                            </View>
                                        </View>
                                        <View style={[styles.historyInfo, center]}>
                                            <View style={[styles.infoBox, row_even, { borderColor: color }]}>
                                                <Text style={styles.infoText}>Id:{item.prop}</Text>
                                                <Text style={styles.infoText}>Otp:{item.otp}</Text>
                                            </View>
                                            <View style={[styles.infoBox, { borderColor: color }]}>
                                                <Text style={[styles.infoText]}>{item.time}</Text>
                                            </View>
                                            <View style={[styles.infoBox, { borderColor: color }]}>
                                                <Text style={styles.infoText}>{item.date}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Animated.View>
                            )
                        }}
                    />
                </View>
                <Modal visible={reviewModal} transparent={true}>
                    <View style={{ flex: 1, backgroundColor: "#ffffffc9" }}>
                        <ReviewModal color={color} setReviewModal={setReviewModal} />
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const getImageSource = (item) => {
    let prop = item.propType;
    switch (prop) {
        case "PROJECTOR":
            color = data[3].color;
            return data[3].imageUri;
        case "CHESS":
            color = data[0].color;
            return data[0].imageUri;
        case "BOARD":
            color = data[1].color;
            return data[1].imageUri;
        case "CANVAS":
            color = data[2].color;
            return data[2].imageUri;
        default:
            break;
    }
}

const getReviewIcon = (item, setReviewModal) => {
    if (item.status === "Received" && item.reviewed === false) {
        return (
            <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]} onPress={() => { setReviewModal(true) }}><MaterialIcons name="rate-review" size={16} color="white" /></Pressable>
        )
    }
}

const getGreenDot = (item) => {
    if (item.status === "Booked" || item.status === "Dispatched") {
        return (
            <View style={[styles.greenDot, { marginRight: 12 }]}></View>
        )
    }
}

export default HistoryModal;

const styles = StyleSheet.create({
    goBack: {
        position: "absolute",
        left: 12,
        top: 12
    },
    title: {
        marginLeft: (width / 2) - 100,
        width: 140,
        height: 50,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 36,
        color: "#444"
    },
    carousel: {
        marginTop: 60
    },
    historyCard: {
        width: 300,
        height: 100,
        borderRadius: 32,
        backgroundColor: "white",
        marginTop: 20,
        backgroundColor: "#b9b5b552",
        borderWidth: 3
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: "contain",
        marginTop: 12,
    },
    historyInfo: {
        width: 180,
        height: "100%",
        marginLeft: 12
    },
    infoBox: {
        flex: 1,
        width: "100%",
        marginTop: 4,
        backgroundColor: "#ffffffa1",
        marginBottom: 4,
        borderRadius: 12,
        borderWidth: 0
    },
    infoText: {
        fontWeight: "bold",
        fontSize: 12,
        textAlign: "center",
        paddingVertical: 4,
        color: "#444"
    },
    greenDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "green",
        opacity: 0.6
    }
})