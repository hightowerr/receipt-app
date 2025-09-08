// components/PositioningGuide.tsx
import React from "react";
import {StyleSheet, View, ViewProps} from "react-native";
import {ThemedView} from "./ThemedView";

interface PositioningGuideProps extends ViewProps {
  visible?: boolean;
}

export function PositioningGuide({
  visible = true,
  style,
  ...rest
}: PositioningGuideProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      <ThemedView style={styles.guide} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  guide: {
    width: "90%",
    height: "60%",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
});
