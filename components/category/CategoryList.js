import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const CategoryList = ({ level, data, handleNavigation }) => {
    let index = 0;
    let newLevel = level;
    // Поиск дочерней категории
    while (!index) {
        for (let i = 0; i < data.length; i++) {
            let el = data[i];
            if (el.level === newLevel) {
                index++
                console.log('Нашел на уровне ', newLevel)
                break;
            }
        }
        if (!index) {
            newLevel++
        }
    }
    return data.map((item) => {
        if (item.level === newLevel) {
            index += 1;
            let slug = item.full_slug.split('/')[level - 1]
            return (
                <TouchableOpacity key={item.id} onPress={() => handleNavigation('Subcategory', data, item.full_slug, slug, level)}>
                    <ListItem backgroundColor='blue' bottomDivider>
                        <Avatar source={{ uri: item.icon }} />
                        <ListItem.Content>
                            <ListItem.Title><Text>{item.name}</Text></ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>

            )
        }
    })




}


export default React.memo(CategoryList)

