import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';


const FontTeste = require('../../assets/DancingScript-VariableFont_wght.ttf');


export const Div = styled.View`
  margin-bottom: 16px;
  height: 40px;
  width: 30%;
  flex-direction: row;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  padding: 10px;
`;

export const Titulo = styled.Text`
fontSize: 40px;
margin-top: 8px;
margin-bottom: 8px; 
color: '#333';
font-family: DancingScript;
`;

