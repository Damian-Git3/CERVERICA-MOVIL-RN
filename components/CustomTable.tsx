import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface TableProps {
  headers: string[];
  data: string[][];
}

const CustomTable: React.FC<TableProps> = ({ headers, data }) => {
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
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  headerCell: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f1f1",
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
});

export default CustomTable;
