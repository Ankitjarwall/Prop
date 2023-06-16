import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import LottieView from 'lottie-react-native';
import { border, center } from '../../commonStyles';

const { width, height } = Dimensions.get("window");
function PropSearching({ color }) {
    return (
        <View style={[styles.modalContainer, { borderColor: color }, center]}>
            <LottieView source={require('../../assets/propSearching.json')} autoPlay loop style={[{ width: 100, height: 100 }]} />
            <View><Text style={styles.searchText}>Searching...</Text></View>
        </View>
    )
}

export default PropSearching;

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
    searchText: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#ccc"
    }
})