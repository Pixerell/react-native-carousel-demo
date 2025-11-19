import React, { useState } from "react";
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

const SAMPLE_URLS = [
  "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F919f3cd4967e283956d99c512823d8c8.1000x1000x1.jpg",
  "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F17392a884cc62e9d1eca291871cce24f.1000x1000x1.png",
  "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2Faf4348aeec305042bdc979f45d4b37c8.1000x1000x1.png",
  "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2Fa2be5960ff7021a6e53b918f9a070d25.1000x1000x1.png",
  "https://www.citylife.sk/sites/default/files/blog/boards-of-canada-tomorrows-harvest.jpg",
];

export default function Index() {
  const insets: EdgeInsets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          <Banner url={SAMPLE_URLS[selectedIndex]} title='Banner' />
          <View style={styles.buttonRow}>
            {SAMPLE_URLS.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedIndex(index)}
                style={[
                  styles.circle,
                  selectedIndex === index && styles.activeCircle,
                ]}
              />
            ))}
          </View>
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
});
