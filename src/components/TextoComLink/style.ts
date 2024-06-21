import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface TituloProps {
  isHovered: boolean;
}

export const Div = styled.View`
  height: 20px;
  flex-direction: row;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  padding: 10px;
`;

export const Titulo = styled.Text`
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 10px; 
  color: ${({ isHovered }) => (isHovered ? 'blue' : '#333')};
  font-family: DancingScript;
`;
