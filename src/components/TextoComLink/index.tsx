import { TextInputProps, Text } from 'react-native';
import styled from 'styled-components/native'; // Usando styled-components para estilos
import React, { useState } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { Div, Titulo} from './style'; // Supondo que este seja o arquivo onde você definiu os componentes estilizados Input e Title

// Supondo que você esteja usando styled-components para estilização

interface MyTitleProps {
  textoTitulo: string;
  onPress: () => void;
}

const TextLink: React.FC<MyTitleProps> = ({ textoTitulo, onPress }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
    >
      <Div>
        <Titulo isHovered={isHovered}>
          {textoTitulo}
        </Titulo>
      </Div>
    </TouchableOpacity>
  );
};

export default TextLink;