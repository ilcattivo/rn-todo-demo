import { getTodoById } from "@/api/todo-api";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Container } from "@/components/Container";

export default function TodoDetailsScreen() {
  const { id: todoId } = useLocalSearchParams();
  const { data } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => getTodoById(todoId as string),
  });

  return (
    <Container>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.navigate("/")}
            style={styles.backButton}
          >
            <FontAwesome name="chevron-left" size={24} color="black" />
          </Pressable>
          <Text style={styles.headerText}>Edit TODO</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              value={data?.title || ""}
              style={styles.input}
              placeholder="Enter title"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              value={data?.description || ""}
              style={[styles.input, { height: 100 }]}
              placeholder="Enter description"
              multiline
            />
          </View>

          <Pressable style={styles.favoriteButton}>
            <Text style={styles.favoriteButtonText}>Add to favorites</Text>
          </Pressable>

          <Pressable onPress={() => {}} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    maxWidth: 500,
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  form: {},
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    width: "100%",
  },
  favoriteButton: {
    padding: 12,
    backgroundColor: "#f59e0b",
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  favoriteButtonText: {
    color: "white",
  },
  saveButton: {
    padding: 12,
    backgroundColor: "#3b82f6",
    borderRadius: 4,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
  },
});
