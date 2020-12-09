import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native'
import CategoryList from '../components/category/CategoryList'

const SubcategoryScreen = ({ route, navigation }) => {

    const [data, setData] = useState([])

    let level = route.params.level
    let prevData = route.params.data
    let slug = route.params.slug


    const getData = async () => {
        let result = []
        for (let i = 0; i < prevData.length; i++) {
            // Получаем все дочерние элементы нужной категории
            let target = prevData[i].full_slug.split('/')[level - 2];
            if (target == slug) {
                result.push(prevData[i])
            }
        }
        // Если дочерних элементов больше нет, то переходим в товары
        if (result.length <= 1) {
            navigation.navigate('Products', { id: result[0].id })
        } else {
            setData(result)
        }
    }

    useEffect(() => {
        if (data.length === 0) getData()
    })

    const handleNavigation = (path, data, full_slug, slug, level) => {
        // Отчистка данных прошлого уровня и переход на новый
        setData([])
        navigation.navigate(path, { data: data, full_slug: full_slug, slug: slug, level: level + 1 })
    }



    return (
        < Container >
            {!data.length ? (
                <Text style={styles.text}>Loading...</Text>
            ) :
                <CategoryList level={level} data={data} handleNavigation={handleNavigation} />
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
