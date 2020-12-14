import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, BackHandler, Button } from 'react-native';
import styled from 'styled-components/native'
import axios from 'axios'
import ProductList from '../components/category/ProductList'


const ProductsScreen = ({ route, navigation }) => {

    const [data, setData] = useState([])

    const getData = async () => {
        let res = await axios.get(`https://www.sima-land.ru/api/v3/item/?category_id=${route.params.id}`);
        setData(res.data.items)
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        if (!data.length) getData()
    }, [])



    const handleBackButtonClick = () => {
        route.params.getBack()
        navigation.goBack();
    }


    return (
        < Container >
            <Button title='Go back' onPress={handleBackButtonClick} />
            {data.length ? (
                <ProductList data={data} />
            ) :
                <Text style={styles.text}>Loading...</Text>
            }
        </Container>
    );
}


const Container = styled.ScrollView`
  display: flex;
  flex: 1;
  background: #181A20;
  font-family: 'OpenSans-Regular'
  color: #111111;
  padding: 5%;
  padding-top: 10%;
`;

var styles = StyleSheet.create({
    text: {
        color: '#ffffff',
    }
});


export default ProductsScreen;
