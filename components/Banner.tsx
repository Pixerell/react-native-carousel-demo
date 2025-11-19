import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width: windowWidth } = Dimensions.get("window");

export type BannerProps = {
  url: string;
  title?: string;
  width?: number;
  height?: number;
};

export default function Banner({
  url,
  title,
  width = Math.min(Math.round(windowWidth * 0.4), 450),
  height = 200,
}: BannerProps) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        resizeMode='stretch'
        source={{ uri: url }}
        style={[{ width, height }]}
      />
      {title ? (
        <View style={styles.caption}>
          <Text numberOfLines={1} style={styles.captionText}>
            {title}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#121e12ff",
  },
  caption: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#030703ff",
    borderRadius: 6,
  },
  captionText: {
    color: "#8affc4ff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
