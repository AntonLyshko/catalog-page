import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import axios from 'axios'
import styled from 'styled-components/native'
import CategoryList from '../components/category/CategoryList'

const CatalogScreen = ({ route, navigation }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    function Content(name, full_slug, level, image, id) {
        this.name = name
        this.image = image
        this.id = id
        this.full_slug = full_slug
        this.level = level
    }

    function Category(slug, parent, content) {
        this.slug = slug;
        this.parent = parent;
        this.content = content;
    }

    const getData = async () => {
        let res = await axios.get('https://www.sima-land.ru/api/v3/category/');
        // API выводить всего 50 позиций, и кажется рандомных 
        let rawData = res.data.items
        console.log(rawData)
        let result = [];
        let main = [];
        let mainContent = [];
        let level = 1;
        let max = 3;
        // Конвертирую данные с API в более удобную форму
        var recursiveSort = function (categories, parent) {
            let node = [];
            categories
                .filter(function (c) { return c.parent === parent })
                .forEach(function (c) {
                    var cc = c;
                    cc.child = recursiveSort(categories, c.slug);
                    return node.push(cc);
                })
            return node;
        }

        while (level <= max) {
            for (let i = 0; i < rawData.length; i++) {
                let item = rawData[i]
                if (item.level > max) max = item.level
                if (item.level === level) {
                    if (level <= 2) {
                        let slug = item.full_slug.split('/')[0]
                        let content = new Content(item.name, item.full_slug, item.level, item.icon, item.id);
                        if (!main[slug]) main[slug] = []
                        if (!mainContent[slug]) mainContent[slug] = []
                        if (item.full_slug == slug) mainContent[slug].content = content
                    }
                    let full_slug = item.full_slug.split('/');
                    let content = new Content(item.name, item.full_slug, item.level, item.icon, item.id);
                    let category;
                    let parent = full_slug[full_slug.length - 2];
                    if (!parent) {
                        let slug = item.full_slug.split('/')[0]
                        category = new Category(slug, null, content)
                    } else {
                        let slug = full_slug[full_slug.length - 1];
                        category = new Category(slug, parent, content)
                    }
                    result.push(category)
                }
            }
            level++
        }
        for (let key in main) {
            main[key] = recursiveSort(result, key)
            main[key].unshift(mainContent[key])
        }
        setLoading(true)
        setData(main)
    }

    useEffect(() => {
        if (!loading) getData()
    }, [])


    const handleNavigation = (path, data, index, id) => {
        // Переходим в дочернию категорию
        console.log('Вы нажали на - ', index)
        console.log('ID ', id)
        navigation.navigate(path, { data: data, index: index, id: id })
    }

    console.log(data)

    return (
        <Container>
            {!loading ? (
                <Text style={styles.text}>Loading...</Text>
            ) :
                <View>
                    <CategoryList subcategory={false} data={data} handleNavigation={handleNavigation} />
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
