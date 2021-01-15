import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 12px 14px;
  padding-top: 16px;
`;

export const DrawerHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #080e33;
  padding-bottom: 4px;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const DrawerHeaderTitle = styled.Text`
  font-size: 22px;
  color: #080e33;
  font-weight: bold;
`;

export const DrawerHeaderVersion = styled.Text`
  font-size: 10px;
  color: #080e33;
  margin-bottom: 2px;
`;

export const MenuContainer = styled.View`
  margin-top: 8px;
`;

export const MenuItemContainer = styled.TouchableOpacity``;

export const MenuItemText = styled.Text``;
