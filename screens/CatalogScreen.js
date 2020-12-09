import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
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
        navigation.navigate(path, { data: data, full_slug: full_slug, slug: slug, level: level + 1 })
    }

    return (
        <Container>
            {!data.length ? (
                <>
                    Loading...
                </>
            ) :
                <CategoryList level={1} data={data} handleNavigation={handleNavigation} />
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




export default CatalogScreen;
