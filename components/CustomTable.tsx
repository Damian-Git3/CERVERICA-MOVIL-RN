import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface TableProps {
  headers: string[];
  data: string[][];
}

export const CustomTable: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          <View style={styles.row}>
            {headers.map((header, index) => (
              <Text key={index} style={styles.headerCell}>
                {header}
              </Text>
            ))}
          </View>
          {data.map((rowData, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Text key={cellIndex} style={styles.cell}>
                  {cellData}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  headerCell: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    fontWeight: "bold",
  },

  cell: {
    padding: 10,
  },

  topImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  scrollContent: {
    flex: 1,
    paddingTop: 150,
    zIndex: 1,
  },
  helloContainer: {
    alignItems: "center",
  },
  helloText: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "500",
  },
  signInText: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    height: 50,
    elevation: 10,
    marginBottom: 20,
  },
  inputIcon: {
    color: "#ed9224",
    marginLeft: 20,
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 20,
  },
});
