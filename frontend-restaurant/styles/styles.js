import { StyleSheet, Dimensions } from "react-native";

const window = Dimensions.get("window");

export const styles = StyleSheet.create({
  preparingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#DCDCDC",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  preparedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#DCDCDC",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#96cdff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 10,
  },
  description: {
    height: 0,
    flexWrap: "wrap",
    color: "transparent",
  },
  title: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 10,
  },
  column: {
    flexDirection: "column",
    borderColor: "#DCDCDC",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#DCDCDC",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
    borderColor: "#DCDCDC",
    borderRadius: 10,
    borderWidth: 1,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  active: {
    backgroundColor: "white",
  },
  inactive: {
    backgroundColor: "#f8f8f8",
    paddingBottom: 20,
  },
  available: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
    color: "#29cf53",
  },
  unavailable: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
    color: "#d93030",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 20,
  },
  itemPropText: {
    fontSize: 17.5,
  },
});
