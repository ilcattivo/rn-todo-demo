import { StyleSheet, View } from "react-native";

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 16,
  },
});
