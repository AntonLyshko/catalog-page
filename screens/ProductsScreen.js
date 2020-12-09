import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native'
import axios from 'axios'
import ProductList from '../components/category/ProductList'

const ProductsScreen = ({ route, navigation }) => {

    const [data, setData] = useState([])
    let category_id = route.params.id


    const getData = async () => {
        let res = await axios.get(`https://www.sima-land.ru/api/v3/item/?category_id=${category_id}`);
        setData(res.data.items)
    }

    useEffect(() => {
        if (data.length === 0) getData()
    })


    return (
        < Container >
            {!data.length ? (
                <>
                    Loading...
                </>
            ) :
                <ProductList data={data} />
            }
        </Container>
    );
}


const Container = styled.ScrollView`
  display: flex;
  flex: 1;
  background: #181A20;
  font-family: 'SFPRO-Regular'
  padding: 5%;
  padding-top: 10%;
`;



export default ProductsScreen;
