import { View, Text, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import FlatButton from './flatButton';
import { border, row_even } from "../commonStyles";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');
function Prop({ hearts, onField, type, color, imageUri, heading, description, index, scrollX, setModalActive, setModalProp }) {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const inputRangeOpacity = [
        (index - 0.3) * width,
        index * width,
        (index + 0.3) * width,
    ];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
    });
    const translateXHeading = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.1, 0, -width * 0.1],
    });
    const translateXDescription = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.7, 0, -width * 0.7],
    });
    const opacity = scrollX.interpolate({
        inputRange: inputRangeOpacity,
        outputRange: [0, 1, 0],
    });

    function handleBookingEvent() {
        setModalActive(true);
        setModalProp(type);
        return;
    }

    return (
        <View style={styles.itemStyle}>
            <Animated.Image
                source={imageUri}
                style={[
                    styles.imageStyle,
                    {
                        transform: [{ scale }],
                    },
                ]}
            />
            <View style={styles.textContainer}>
                <Animated.Text
                    style={[
                        styles.heading,
                        {
                            opacity,
                            transform: [{ translateX: translateXHeading }],
                        },
                    ]}
                >
                    {heading}
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.description,
                        {
                            opacity,
                            transform: [
                                {
                                    translateX: translateXDescription,
                                },
                            ],
                        },
                    ]}
                >
                    {description}
                </Animated.Text>
                <View style={[{ width: 100, height: 40, marginTop: 10 }]}>
                    <FlatButton onPress={handleBookingEvent} scrollX={scrollX} index={index} color={color}>Book</FlatButton>
                </View>
                <View style={[styles.stats, row_even]}>
                    <Animated.View style={{ opacity, transform: [{ translateX: translateXHeading }] }}><AntDesign name="heart" size={16} color="red" style={{ opacity: 0.7 }} /></Animated.View>
                    <Animated.Text style={[styles.statsText, {
                        opacity,
                        transform: [
                            {
                                translateX: translateXDescription,
                            },
                        ],
                    }]}>{hearts}</Animated.Text>
                    <Animated.View style={[
                        styles.greenDot,
                        {
                            opacity,
                            transform: [{ translateX: translateXHeading }],
                        },
                    ]}></Animated.View>
                    <Animated.Text style={[styles.statsText, {
                        opacity,
                        transform: [
                            {
                                translateX: translateXDescription,
                            },
                        ],
                    }]}>{onField}</Animated.Text>
                </View>
            </View>
        </View>
    );
};

export default Prop;

const styles = StyleSheet.create({
    itemStyle: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageStyle: {
        width: width * 0.75,
        height: width * 0.75,
        resizeMode: 'contain',
        flex: 1,
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        flex: 0.5,
    },
    heading: {
        color: '#444',
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 5,
    },
    description: {
        color: '#acaaab',
        fontWeight: '600',
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
        lineHeight: 16 * 1.5,
    },
    stats: {
        position: "absolute",
        left: width - 230,
        top: 100,
        width: 120,
        height: 40,
    },
    greenDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "green",
        opacity: 0.7
    },
    statsText: {
        fontWeight: "bold",
        color: '#acaaab'
    }
})