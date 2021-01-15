import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Authentication from '../../pages/Authentication';
import Home from '../../pages/Home';
import Inspection from '../../pages/Inspection';

import {
  Container,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderVersion,
  MenuContainer,
  MenuItemContainer,
  MenuItemText,
} from './styles';

const Drawer = createDrawerNavigator();

const CustomDrawer: React.FC = () => (
  <Drawer.Navigator
    initialRouteName="Authentication"
    drawerContent={({ navigation }) => (
      <Container>
        <ScrollView>
          <DrawerHeader>
            <DrawerHeaderTitle>MENU PRINCIPAL</DrawerHeaderTitle>
            <DrawerHeaderVersion>Versão 1.0.0</DrawerHeaderVersion>
          </DrawerHeader>

          <MenuContainer>
            <MenuItemContainer onPress={() => navigation.navigate('Home')}>
              <MenuItemText>Início</MenuItemText>
            </MenuItemContainer>

            <MenuItemContainer
              onPress={() => navigation.navigate('Inspection')}
            >
              <MenuItemText>Vistoria</MenuItemText>
            </MenuItemContainer>
          </MenuContainer>
        </ScrollView>
      </Container>
    )}
  >
    <Drawer.Screen name="Authentication" component={Authentication} />
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Inspection" component={Inspection} />
  </Drawer.Navigator>
);

export default CustomDrawer;
