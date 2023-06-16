import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Pressable,
  Modal,
} from "react-native";

import data from "./data";

import Prop from "./components/prop";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { center, ios_shadow } from "./commonStyles.js";
import OrderForm1 from "./components/modals/orderForm1";
import ChooseSlots from "./components/modals/chooseSlots";
import HistoryModal from "./components/historyModal";
import PropSearching from "./components/modals/propSearching";
import OtpModal from "./components/modals/otpModal";
import NotFound from "./components/modals/notFound";
import CreditModal from "./components/modals/creditModal";

const { width, height } = Dimensions.get("window");
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Circle = ({ scrollX }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const Ticker = ({ scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Pagination = ({ scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: "absolute",
            // backgroundColor: 'red',
            transform: [{ translateX }],
          },
        ]}
      />
      {data.map((item) => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, { backgroundColor: item.color }]}
            />
          </View>
        );
      })}
    </View>
  );
};

const History = ({ setHistoryModal }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.historyIcon,
        center,
        ios_shadow,
        pressed && styles.pressed,
      ]}
      onPress={() => {
        setHistoryModal(true);
      }}
    >
      <MaterialIcons name="history" size={22} color="#444" />
    </Pressable>
  );
};

const Credit = ({ setCreditModal }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.creditIcon,
        center,
        ios_shadow,
        pressed && styles.pressed,
      ]}
      onPress={() => {
        setCreditModal(true);
      }}
    >
      <Entypo name="credit-card" size={22} color="#444" />
    </Pressable>
  );
};

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [historyModal, setHistoryModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalProp, setModalProp] = useState("Projector");
  const [modalState, setModalState] = useState("orderForm");
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [pickedSlots, setPickedSlots] = useState([]);
  const [creditModal, setCreditModal] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" hidden />
      <Circle scrollX={scrollX} />
      <Animated.FlatList
        keyExtractor={(item) => item.key}
        data={data}
        renderItem={({ item, index }) => (
          <Prop
            {...item}
            index={index}
            scrollX={scrollX}
            setModalActive={setModalActive}
            setModalProp={setModalProp}
          />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.logo}
        source={require("./assets/ue_black_logo.png")}
      />
      <Pagination scrollX={scrollX} />
      <Ticker scrollX={scrollX} />
      <History setHistoryModal={setHistoryModal} />
      <Credit setCreditModal={setCreditModal} />
      {/* {Credit(setCreditModal)} */}
      <Modal visible={modalActive} animationType="slide" transparent={true}>
        {getCorrectModal(
          modalActive,
          modalProp,
          modalState,
          day,
          time,
          setModalActive,
          setModalProp,
          setModalState,
          setDay,
          setTime,
          scrollY,
          setPickedSlots,
          pickedSlots
        )}
      </Modal>
      <Modal visible={historyModal} animationType="slide" transparent={true}>
        <HistoryModal setHistoryModal={setHistoryModal} />
      </Modal>
      <Modal visible={creditModal} animationType="slide" transparent={true}>
        <CreditModal setCreditModal={setCreditModal} />
      </Modal>
    </View>
  );
}

const getCorrectModal = (
  modalActive,
  modalProp,
  modalState,
  day,
  time,
  setModalActive,
  setModalProp,
  setModalState,
  setDay,
  setTime,
  scrollY,
  setPickedSlots,
  pickedSlots
) => {
  let selectedProp = data.filter((item) => item.type === modalProp);
  let color = selectedProp[0]?.color;
  switch (modalState) {
    case "orderForm":
      function handleProceedEvent() {
        if (day && time) {
          if (time === "Day") setModalState("chooseSlot");
          if (time === "Night") {
            setModalState("searching");
            setTimeout(() => {
              setModalState("otp");
            }, 3000);
          }
        } else {
          return;
        }
      }
      return (
        <OrderForm1
          color={color}
          handleProceedEvent={handleProceedEvent}
          setDay={setDay}
          setTime={setTime}
          setModalActive={setModalActive}
          day={day}
          time={time}
        />
      );
    case "chooseSlot":
      return (
        <ChooseSlots
          color={color}
          pickedSlots={pickedSlots}
          setPickedSlots={setPickedSlots}
          setModalState={setModalState}
        />
      );
    case "searching":
      return <PropSearching color={color} />;
    case "otp":
      return (
        <OtpModal
          color={color}
          setModalActive={setModalActive}
          setModalState={setModalState}
        />
      );
    case "notFound":
      return (
        <NotFound
          color={color}
          setModalActive={setModalActive}
          setModalState={setModalState}
        />
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: "-90deg" },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
  pagination: {
    position: "absolute",
    right: 20,
    bottom: 40,
    flexDirection: "row",
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  tickerContainer: {
    position: "absolute",
    width: 240,
    top: 40,
    left: 20,
    overflow: "hidden",
    height: TICKER_HEIGHT,
    marginTop: 6,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: "uppercase",
    fontWeight: "800",
  },
  historyIcon: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 20,
    top: 40,
    borderRadius: 20,
    backgroundColor: "#e8e7e7",
  },
  creditIcon: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 75,
    top: 40,
    borderRadius: 20,
    backgroundColor: "#e8e7e7",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    top: "15%",
  },
  pressed: {
    opacity: 0.7,
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
  },
  modalLabelContainer: {
    width: "100%",
    height: 40,
    marginTop: 16,
  },
  dayInput: {
    flex: 1,
  },
});
