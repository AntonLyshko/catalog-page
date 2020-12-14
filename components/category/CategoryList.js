import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const CategoryList = ({ data, handleNavigation }) => {

    if (data.length) {
        return data.map((item) => {
            return (
                <TouchableOpacity key={Math.random()} onPress={() => handleNavigation(item.path, item.level + 1)}>
                    <ListItem backgroundColor='blue' bottomDivider>
                        <Avatar source={{ uri: item.photo }} />
                        <ListItem.Content>
                            <ListItem.Title><Text>{item.name}</Text></ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
            )
        })
    }

    return <Text>Loading...</Text>

}


export default CategoryList

