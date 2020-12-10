import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const CategoryList = ({ subcategory, data, handleNavigation }) => {

    const list = [];

    function ListItemObject(content, data) {
        this.content = content;
        this.data = data;
    }

    Object.keys(data).map(function (key, index) {
        let item = data[key];
        let id
        let content;
        let child;
        let newListItem;


        if (subcategory) {
            if (index > 0) {
                content = item.content;
                child = item.child
                newListItem = new ListItemObject(content, item)
                list.push(newListItem)
            }
        } else {
            let image;
            let name;
            content = item[0].content;
            if (content) {
                name = content.name
                image = content.image
                id = content.id
            } else {
                name = key
                image = 'https://via.placeholder.com/150'
            }
            content = {}
            content.name = name
            content.image = image
            content.id = id
            newListItem = new ListItemObject(content, item)
            list.push(newListItem)
        }


    });

    console.log(list)

    if (list.length) {
        return list.map((item, index) => {
            if (item && item.content) {
                let id = item.content.id;
                let data = item.data.child ? item.data.child : item.data
                return (
                    <TouchableOpacity key={Math.random()} onPress={() => handleNavigation('Subcategory', data, index, id)}>
                        <ListItem backgroundColor='blue' bottomDivider>
                            <Avatar source={{ uri: item.content.image }} />
                            <ListItem.Content>
                                <ListItem.Title><Text>{item.content.name}</Text></ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                )
            }

        })
    }


    return <Text>Loading</Text>

}


export default CategoryList

