// CustomList.tsx
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

interface CustomListProps {
    data: { title: string; description: string }[];
}

interface CardProps {
    title: string;
    description: string;
}

export const CustomList: React.FC<CustomListProps> = ({ data }) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <Card title={item.title} description={item.description} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};