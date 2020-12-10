import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import axios from 'axios'
import styled from 'styled-components/native'
import CategoryList from '../components/category/CategoryList'

const CatalogScreen = ({ route, navigation }) => {

    const [data, setData] = useState([])

    const getData = async () => {
        let res = await axios.get('https://www.sima-land.ru/api/v3/category/');
        setData(res.data.items)
    }

    useEffect(() => {
        if (data.length === 0) getData()
    }, [])


    const handleNavigation = (path, data, full_slug, slug, level) => {
        // Переходим в дочернию категорию
        navigation.navigate(path, { data: data, full_slug: full_slug, slug: slug, level: level + 1, direction: true })
    }

    return (
        <Container>
            {!data.length ? (
                <Text style={styles.text}>Loading...</Text>
            ) :
                <View>
                    <CategoryList level={1} data={data} handleNavigation={handleNavigation} />
                </View>
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
