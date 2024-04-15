import { ImageSourcePropType } from 'react-native';

export interface User {
    id: number;
    username: string;
    password: string;
    photo?: ImageSourcePropType;
  }
  