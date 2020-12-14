import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, BackHandler, View, Button } from 'react-native';
import styled from 'styled-components/native'
import CategoryList from '../components/category/CategoryList'
import axios from 'axios'

const SubcategoryScreen = ({ route, navigation }) => {
    const [data, setData] = useState([])
    const [prevPath, setPrevPath] = useState('')

    const getData = async () => {
        console.log(route.params)
        let res = await axios.get(`https://www.sima-land.ru/api/v3/category/?path=${route.params.path}&level=${route.params.level}`);
        let data = res.data.items
        console.log(data)
        if (!data.length) {
            let path = route.params.path.split('.');
            let id = path[path.length - 1];
            console.log('to product')
            navigation.navigate('Products', { id: id, getBack: () => getBack() })
        } else {
            setData(data)
        }

    }

    useEffect(() => {
        console.log('useEffect')
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
            let path = route.params.path.split('.');

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
        console.log(route.params.level)
    }


    return (
        <Container>
            <Button title='Go back' onPress={handleBackButtonClick} />
            {!data.length ? (
                <Text style={styles.text}>Loading...</Text>
            ) :
                <View>
                    <CategoryList data={data} handleNavigation={handleNavigation} />
                </View>
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
