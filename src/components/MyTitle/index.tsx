import { TextInputProps, Text } from 'react-native';
import styled from 'styled-components/native'; // Usando styled-components para estilos
import React, { useState } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { Div, Titulo} from './style'; // Supondo que este seja o arquivo onde você definiu os componentes estilizados Input e Title

// Supondo que você esteja usando styled-components para estilização


interface MyTitleProps extends TextInputProps {
  textoTitulo: string;
}

const MyTitle: React.FC<MyTitleProps> = ({ textoTitulo }) => {
  return (
    <Div>
      <Titulo>
        {textoTitulo}
      </Titulo>
    </Div>
  );
};

export default MyTitle;
