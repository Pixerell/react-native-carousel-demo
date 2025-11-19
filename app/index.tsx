import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Banner from "../components/Banner";
import { StatusBar } from "expo-status-bar";
import { getCircularIndex } from "@/scripts/getIndex";

const SAMPLE_URLS = [
  "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F919f3cd4967e283956d99c512823d8c8.1000x1000x1.jpg",
  "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F17392a884cc62e9d1eca291871cce24f.1000x1000x1.png",
  "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2Faf4348aeec305042bdc979f45d4b37c8.1000x1000x1.png",
  "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2Fa2be5960ff7021a6e53b918f9a070d25.1000x1000x1.png",
  "https://www.citylife.sk/sites/default/files/blog/boards-of-canada-tomorrows-harvest.jpg",
];
const AUTO_SCROLL_INTERVAL = 3500;
const TICK_INTERVAL = 100;

export default function Index() {
  const insets: EdgeInsets = useSafeAreaInsets();
  const [timeLeft, setTimeLeft] = useState(AUTO_SCROLL_INTERVAL / 1000);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const prevIndex = getCircularIndex(selectedIndex - 1, SAMPLE_URLS.length);
  const nextIndex = getCircularIndex(selectedIndex + 1, SAMPLE_URLS.length);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(AUTO_SCROLL_INTERVAL / 1000);

    intervalRef.current = setInterval(() => {
      setSelectedIndex((prev) =>
        getCircularIndex(prev + 1, SAMPLE_URLS.length)
      );
      setTimeLeft(AUTO_SCROLL_INTERVAL / 1000);
    }, AUTO_SCROLL_INTERVAL);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      elapsedRef.current += TICK_INTERVAL;

      // Counter
      setTimeLeft(
        Math.max(
          Number(
            ((AUTO_SCROLL_INTERVAL - elapsedRef.current) / 1000).toFixed(1)
          ),
          0
        )
      );

      // Auto scroll
      if (elapsedRef.current >= AUTO_SCROLL_INTERVAL) {
        setSelectedIndex((prev) =>
          getCircularIndex(prev + 1, SAMPLE_URLS.length)
        );
        elapsedRef.current = 0;
        setTimeLeft(AUTO_SCROLL_INTERVAL / 1000);
      }
    }, TICK_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleBannerClick = useCallback((index: number) => {
    setSelectedIndex(index);
    startAutoScroll();
  }, []);

  return (
    <>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}
        >
          <Text style={styles.title}>
            Carousel With Boards Of Canada Albums
          </Text>
          <View style={styles.carouselRow}>
            <Banner
              isMain={false}
              url={SAMPLE_URLS[prevIndex]}
              title='Prev'
              onPress={() => handleBannerClick(prevIndex)}
            />
            <Banner url={SAMPLE_URLS[selectedIndex]} title='Banner' />
            <Banner
              isMain={false}
              url={SAMPLE_URLS[nextIndex]}
              title='Next'
              onPress={() => handleBannerClick(nextIndex)}
            />
          </View>
          <View style={styles.buttonRow}>
            {SAMPLE_URLS.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleBannerClick(index)}
                style={[
                  styles.circle,
                  selectedIndex === index && styles.activeCircle,
                ]}
              />
            ))}
          </View>
          <Text style={styles.counter}>
            Time left before Auto-Sroll: {timeLeft}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#030703ff",
    alignItems: "center",
    gap: 16,
  },
  title: {
    color: "#8affc4ff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  carouselRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#888",
  },
  activeCircle: {
    backgroundColor: "#fff",
  },
  counter: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
