import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native'

const ProductScreen = ({ route, navigation }) => {
    return (
        <Container>
            <Text>ProductScreen</Text>
        </Container>
    );
}

const Container = styled.ScrollView`
  display: flex;
  flex: 1;
  background: #181A20;
  font-family: 'OpenSans-Regular'
  padding: 5%;
  padding-top: 10%;
`;



export default ProductScreen;
