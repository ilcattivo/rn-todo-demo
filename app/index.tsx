import {
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
  Pressable,
  View,
  TextInput,
  ListRenderItemInfo,
} from "react-native";

import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/api/todo-api";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Container } from "@/components/Container";

export default function HomeScreen() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const renderTodo = ({ item }: ListRenderItemInfo<any>) => {
    const isFavorite = false;
    return (
      <Pressable
        style={styles.todoItem}
        onPress={() => {
          router.navigate(`/todos/${item.id}`);
        }}
      >
        <View style={styles.todoRow}>
          <Text style={styles.todoTitle}>{item.title}</Text>

          <Pressable onPress={() => {}}>
            <FontAwesome
              name={isFavorite ? "bookmark" : "bookmark-o"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <Container>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Todo List App</Text>

        {/* Add TODO Form */}
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Enter title..." />
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        {/* TODO List */}
        {isPending ? (
          <ActivityIndicator size="large" />
        ) : isError ? (
          <Text>Error: {error?.message}</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTodo}
          />
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "semibold",
    marginBottom: 16,
    textAlign: "center",
  },
  wrapper: {
    flex: 1,
    padding: 16,
    maxWidth: 500,
    alignSelf: "center",
    marginTop: 16,
  },
  form: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flexGrow: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    backgroundColor: "white",
  },
  addButton: {
    padding: 12,
    backgroundColor: "#3b82f6",
    borderRadius: 4,
    marginLeft: 8,
  },
  addButtonText: {
    color: "white",
  },
  todoItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 16,
    width: "100%",
  },
  todoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
