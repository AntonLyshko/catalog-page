import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, BackHandler } from 'react-native';
import styled from 'styled-components/native'
import CategoryList from '../components/category/CategoryList'

const SubcategoryScreen = ({ route, navigation }) => {

    // Навигация дочерних категорий по slug

    const [data, setData] = useState([])
    const [level, setLevel] = useState()
    const [deepness, setDeepness] = useState(0)
    let prevData = route.params.data

    const getData = async () => {
        let slug = route.params.slug
        let newLevel = level;
        let result = []

        if (level < route.params.level || !level) setLevel(route.params.level)
        // Обновление level если направление вперед

        // Получаем все дочерние элементы нужной категории
        for (let i = 0; i < prevData.length; i++) {
            let target = prevData[i].full_slug.split('/')[newLevel - 2];
            if (!route.params.direction) target = prevData[i].full_slug.split('/')[deepness];
            // Если направление назад, то взять предыдущий slug, используя глубину вхождения в подкатегории
            if (target == slug) result.push(prevData[i])
            // Поиск нужных категорий, путем перебор массива категорий
        }
        // Если дочерних элементов больше нет, и осталась лишь выбранная категория, то переходим в товары
        if (result.length === 1) {
            navigation.navigate('Products', { id: result[0].id, getBack: () => getBack() })
        } else {
            setData(result)
        }
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        if (data.length === 0) getData()
    })

    const handleBackButtonClick = () => {
        // Функция на кнопку назад на android в каталоге
        route.params.level = null;
        route.params.direction = false;
        if (level - 1 == 1) {
            navigation.navigate('Catalog')
        } else {
            setLevel(level - 1)
            route.params.slug = route.params.prevSlug;
            setData([])
        }
        return true;
    }

    const getBack = () => {
        // Функция на кнопку назад из продуктов
        route.params.level = null;
        route.params.direction = false;
        if (level - 1 == 1) {
            navigation.navigate('Catalog')
        } else {
            setLevel(level - 1)
            setDeepness(deepness + 1)
            route.params.slug = route.params.prevSlug;
            setData([])
        }
    }

    const handleNavigation = (path, data, full_slug, slug, level, prevSlug) => {
        // Отчистка данных прошлого уровня и переход на новый
        setData([])
        navigation.navigate(path, { data: data, full_slug: full_slug, slug: slug, level: level + 1, direction: true, prevSlug: prevSlug })
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
