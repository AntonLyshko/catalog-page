import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, BackHandler, View, Button } from 'react-native';
import styled from 'styled-components/native'
import CategoryList from '../components/category/CategoryList'

const SubcategoryScreen = ({ route, navigation }) => {
    let data = route.params.data
    let id = route.params.id
    // История перемещения, чтобы двигаться вперед и назад по категориям
    const [history, setHistory] = useState([])
    const [deep, setDeep] = useState(0)
    const [loading, setLoading] = useState(false)

    if (!data.length) {
        navigation.navigate('Products', { id: id, getBack: () => getBack() })
    }



    useEffect(() => {
        // Слушатель на кнопку "назад" на телефоне
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        if (!loading) getData()
    })

    const getData = () => {

        let keys = Object.keys(data);
        if (keys.length === 1) {
            navigation.navigate('Products', { id: id, getBack: () => getBack() })
        }
        // Если категория одиночна, то перебрасывает на товары
        if (data.length) {
            history.unshift(data);
            setHistory(history);
        }
        // Запись истории
        setDeep(deep + 1)
        // Глубина погружения в категории помогает понять как близко пользователь находится с главным каталогом
        setLoading(true)
    }


    const handleBackButtonClick = () => {
        if (deep <= 1) {
            // Если от главного каталого один шаг, то перебрасывает на каталог
            setDeep(0)
            navigation.navigate('Catalog')
        } else {
            // Перезаписывает категории изходя из истории 
            let newParams = history[history.length - 1]
            console.log('History length ', history.length)
            console.log('New params ', newParams)
            route.params.data = newParams;
            setDeep(deep - 2)
            setLoading(false)
        }

    }

    const getBack = () => {
        // Callback из экрана товаров
        // Если от главного каталого один шаг, то перебрасывает на каталог
        if (deep <= 1) {
            setDeep(0)
            navigation.navigate('Catalog')
        } else {
            // Перезаписывает категории изходя из истории 
            let newParams = history[0]
            console.log('History length ', history.length)
            console.log('New params ', newParams)
            route.params.data = newParams;
            setDeep(deep - 2)
            setLoading(false)
        }
    }

    const handleNavigation = (path, data, index, id) => {

        setLoading(false)
        navigation.navigate(path, { data: data, index: index, id: id })
    }

    return (
        <Container>
            <Button title='Go back' onPress={handleBackButtonClick} />
            {!loading ? (
                <Text style={styles.text}>Loading1...</Text>
            ) :
                <View>
                    <CategoryList subcategory={true} data={data} handleNavigation={handleNavigation} />
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
