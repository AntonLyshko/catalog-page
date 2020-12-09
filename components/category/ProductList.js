import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import styled from 'styled-components/native'

const ProductList = ({ data, handleNavigation }) => {
    return data.map((item) => {
        return (
            <TouchableOpacity key={item.id}>
                <Container>
                    <Card>
                        <Card.Title title={item.name} subtitle={item.price + ' руб.'} />
                        <Card.Cover source={{ uri: item.photoUrl }} />
                        <Card.Actions>
                            <Button>Купить</Button>
                            <Button>Добавить в корзину</Button>
                        </Card.Actions>
                    </Card>
                </ Container>
            </TouchableOpacity>
        )
    })
}

const Container = styled.ScrollView`
  display: flex;
  background: #181A20;
  font-family: 'SFPRO-Regular'
  margin: 5%;
`;




export default React.memo(ProductList)

