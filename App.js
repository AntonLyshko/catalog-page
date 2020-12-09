import React from 'react';
import { useFonts } from 'expo-font';
import styled from 'styled-components/native'
import CatalogScreen from './screens/CatalogScreen';
import SubcategoryScreen from './screens/SubcategoryScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const App = () => {
  const Stack = createStackNavigator()
  const [loaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <Container>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Catalog" component={CatalogScreen} />
          <Stack.Screen name="Subcategory" component={SubcategoryScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Container>

  );
}

const Container = styled.View`
  display: flex;
  flex: 1;
  font-family: 'OpenSans-Regular'
  color: #ffffff;
  background: #181A20;
`;


export default App;
