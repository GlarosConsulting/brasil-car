import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Authentication from '../../pages/Authentication';
import Home from '../../pages/Home';
import Inspection from '../../pages/Inspection';

import {
  Container,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderVersion,
  UserNameText,
  MenuContainer,
  MenuItemContainer,
  MenuItemLabelContainer,
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

          <UserNameText>João Pedro da Silva</UserNameText>

          <MenuContainer>
            <MenuItemContainer>
              <MenuItemLabelContainer
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="home" size={16} />
                <MenuItemText>Início</MenuItemText>
              </MenuItemLabelContainer>
            </MenuItemContainer>

            <MenuItemContainer>
              <MenuItemLabelContainer
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="edit" size={16} />
                <MenuItemText>Meus dados</MenuItemText>
              </MenuItemLabelContainer>
            </MenuItemContainer>

            <MenuItemContainer>
              <MenuItemLabelContainer
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="mail" size={16} />
                <MenuItemText>Mensagens</MenuItemText>
              </MenuItemLabelContainer>
            </MenuItemContainer>

            <MenuItemContainer>
              <MenuItemLabelContainer
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="dollar-sign" size={16} />
                <MenuItemText>Financeiro</MenuItemText>
              </MenuItemLabelContainer>
            </MenuItemContainer>

            <MenuItemContainer>
              <MenuItemLabelContainer
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Inspection')}
              >
                <Icon name="image" size={16} />
                <MenuItemText>Vistoria</MenuItemText>
              </MenuItemLabelContainer>
            </MenuItemContainer>

            <MenuItemContainer>
              <MenuItemLabelContainer
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="align-left" size={16} />
                <MenuItemText>Termos e condições</MenuItemText>
              </MenuItemLabelContainer>
            </MenuItemContainer>

            <MenuItemContainer>
              <MenuItemLabelContainer
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="log-out" size={16} />
                <MenuItemText>Sair</MenuItemText>
              </MenuItemLabelContainer>
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
