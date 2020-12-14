import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import axios from 'axios'
import styled from 'styled-components/native'
import CategoryList from '../components/category/CategoryList'

const CatalogScreen = ({ route, navigation }) => {

    const [data, setData] = useState([])

    const getData = async () => {
        let res = await axios.get('https://www.sima-land.ru/api/v3/category/?per_page=100&level=1');
        let data = res.data.items
        setData(data)
    }

    useEffect(() => {
        if (!data.length) getData()
    }, [])

    const handleNavigation = (path, level) => {
        navigation.navigate('Subcategory', { path: path, level: level })
    }

    return (
        <Container>
            {data.length ? (
                <CategoryList data={data} handleNavigation={handleNavigation} />
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
        fontSize: 32
    }
});



export default CatalogScreen;
