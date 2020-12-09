import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const CategoryList = ({ level, data, handleNavigation }) => {
    let index = 0;
    return data.map((item) => {
        if (item.level === level) {
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
        if (index === 0) {
            if (item.level === level + 1) {
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
        }

    })
}

export default React.memo(CategoryList)

