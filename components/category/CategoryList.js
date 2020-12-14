import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const CategoryList = ({ data, handleNavigation }) => {


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleNavigation(item.path, item.level + 1)}>
            <ListItem backgroundColor='blue' bottomDivider>
                <Avatar source={{ uri: item.photo }} />
                <ListItem.Content>
                    <ListItem.Title><Text>{item.name}</Text></ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );

    if (data.length) {
        return (
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        )
    }

    return <Text>Loading...</Text>

}

export default CategoryList

