import React, { useMemo } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width: windowWidth } = Dimensions.get("window");

export type BannerProps = {
  url: string;
  title?: string;
  width?: number;
  height?: number;
  isMain?: boolean;
  onPress?: () => void;
};

function Banner({
  url,
  title,
  width = Math.min(Math.round(windowWidth * 0.4), 450),
  height = 200,
  isMain = true,
  onPress,
}: BannerProps) {
  const { bannerWidth, bannerHeight, bannerOpacity } = useMemo(() => {
    const w = isMain ? width : width * 0.6;
    const h = isMain ? height : height * 0.6;
    const o = isMain ? 1 : 0.5;
    return { bannerWidth: w, bannerHeight: h, bannerOpacity: o };
  }, [width, height, isMain]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.container,
          { width: bannerWidth, height: bannerHeight, opacity: bannerOpacity },
        ]}
      >
        <Image
          resizeMode='stretch'
          source={{ uri: url }}
          style={[{ width: bannerWidth, height: bannerHeight }]}
        />
        {title ? (
          <View style={styles.caption}>
            <Text numberOfLines={1} style={styles.captionText}>
              {title}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Banner);

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
