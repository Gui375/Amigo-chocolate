import { ImageSourcePropType } from 'react-native';

export interface User {
    id: number;
    username: string;
    password: string;
    photo?: ImageSourcePropType;
  }
  

  export interface Grupo {
    id: number;
    nome: string;
    quantidade: string;
    photo?: ImageSourcePropType;
    //Usuários[array de usuários]
    //interface para busca
  }

  export interface INewGrupo {
    
    nome: string;
    quantidade: string;
    photo?: ImageSourcePropType;
    //Usuários[array de usuários]
    //Cadastro de Grupo
  }