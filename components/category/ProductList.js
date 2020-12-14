import React from 'react';
import { TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Card } from 'react-native-paper';
import styled from 'styled-components/native'

const ProductList = ({ data, handleNavigation }) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.id}>
            <Container>
                <Card>
                    <Card.Title title={item.name} subtitle={item.price + ' руб.'} />
                    <Card.Cover source={{ uri: item.photoUrl }} />
                    <Card.Actions>
                        <Button><Text>Купить</Text></Button>
                        <Button><Text>Добавить корзину</Text></Button>
                    </Card.Actions>
                </Card>
            </ Container>
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

const Container = styled.ScrollView`
  display: flex;
  background: #181A20;
    color: #111111;
  font-family: 'OpenSans-Regular'
  margin: 5%;
`;

var styles = StyleSheet.create({
    text: {
        color: '#ffffff',
    }
});



export default React.memo(ProductList)

