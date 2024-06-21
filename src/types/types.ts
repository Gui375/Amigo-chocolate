import { ImageSourcePropType } from 'react-native';

export interface User {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    photo?: string;
  }
  

  export interface Grupo {
    id?: string;
    nome: string;
    quantidadePessoas: number;
    valor: number;
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