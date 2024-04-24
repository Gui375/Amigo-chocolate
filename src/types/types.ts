import { ImageSourcePropType } from 'react-native';

export interface User {
    id: number;
    username: string;
    password: string;
    photo?: string;
  }
  

  export interface Grupo {
    id: number;
    nome: string;
    quantidade: number;
    photo?: string;
    //Usuários[array de usuários]
    //interface para busca
  }

  export interface INewGrupo {
    
    nome: string;
    quantidade: string;
    photo?: string;
    //Usuários[array de usuários]
    //Cadastro de Grupo
  }