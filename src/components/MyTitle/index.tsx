import { TextInputProps, Text } from 'react-native';
import { Div, Titulo} from './style'; // Supondo que este seja o arquivo onde você definiu os componentes estilizados Input e Title
import React, { useState } from 'react';



interface MyTitleProps  extends TextInputProps {
    textoTitulo : string
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
