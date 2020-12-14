import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, BackHandler, View, Button } from 'react-native';
import styled from 'styled-components/native'
import CategoryList from '../components/category/CategoryList'
import axios from 'axios'

const SubcategoryScreen = ({ route, navigation }) => {
    const [data, setData] = useState([])
    const [prevPath, setPrevPath] = useState('')

    const getData = async () => {
        let res = await axios.get(`https://www.sima-land.ru/api/v3/category/?path=${route.params.path}&level=${route.params.level}`);
        let data = res.data.items
        if (!data.length) {
            let path = route.params.path.split('.');
            let id = path[path.length - 1];
            navigation.navigate('Products', { id: id, getBack: () => getBack() })
        } else {
            setData(data)
        }
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        if (!data.length) getData()
    })

    const handleNavigation = (path, level) => {
        setPrevPath(route.params.path)
        setData([])
        navigation.navigate('Subcategory', { path: path, level: level })
    }

    const handleBackButtonClick = () => {
        if (route.params.level <= 2) {
            console.log('To catalig')
            navigation.navigate('Catalog')
        } else {
            handleNavigation(prevPath, route.params.level - 1)
        }
    }

    const getBack = () => {
        route.params.level -= 1
        route.params.path = prevPath
        //Current path
        let path = route.params.path.split('.');
        path = path.slice(0, path.length - 1)
        setPrevPath(path)
        //New previus path
    }

    return (
        <Container>
            <Button title='Go back' onPress={handleBackButtonClick} />
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
  color: #ffffff;
  font-family: 'OpenSans-Regular'
  padding: 5%;
  padding-top: 10%;
`;

var styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 32
    }
});



export default SubcategoryScreen;
