import axios, { AxiosResponse, AxiosError } from 'axios';
import { User } from '../../types/types';

const BASE_URL = 'http://localhost:3000/User';//'https://localhost:7217/api/User/'

class UserService {

    constructor() {
        // Se necessário, adicione inicializações aqui
      }

  // async addUser(user: User): Promise<boolean> {
  //   try {
  //   //  const response = await axios.post(`${BASE_URL}`, user);
    
  //   const formData = new FormData();
  //   formData.append('id', user.id);
  //   formData.append('username', user.username);
  //   formData.append('password', user.password);

  //   const responsePhoto = await fetch(user.photo);

  //   const blob = await responsePhoto.blob();

  //   formData.append('photo', blob, 'photo.jpg');

  //   // const uploadResponse = await axios.post(BASE_URL+'addUser', formData, {
  //     const uploadResponse = await axios.post(`${BASE_URL}`, formData, {
  //       headers: {
  //           'Content-Type': 'multipart/form-data',
  //       },
  //   });
    
  //     return uploadResponse.status === 201; // Retorna true se o usuário foi adicionado com sucesso
    
  //   } catch (error) {
  //     console.error('Erro ao adicionar usuário:', error);
  //     return false; // Retorna false em caso de erro
  //   }
  // }

  async addUser(user: User): Promise<boolean> {
    try {
      // Verifica se o ID já existe na API
      const existingUser = await this.getUserById(user.id);
      if (existingUser) {
        console.error('Erro ao adicionar usuário: ID já existe');
        return false; // Retorna false se o ID já existir
      }

      // Se o ID não existe, adiciona o usuário
      const response = await axios.post(BASE_URL, user);
      return response.status === 201; // Retorna true se o usuário foi adicionado com sucesso

    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    try {
        const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}?username=${username}&password=${password}`);
        //na aplicação de vocês não retorna array não e o metodo sera um post que retorna um unico usuario.
        if (response.data.length === 0) {
          return false;
        }
  
        return response.status === 200; 
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  
  
  async getUserById(userId: number): Promise<User | null> {
    try {
      const response: AxiosResponse<User> = await axios.get(`${BASE_URL}/${userId}`);
      return response.data; // Retorna o usuário se encontrado

    } catch (error: AxiosError | any) { // Especifica o tipo de erro como AxiosError ou qualquer outro tipo
      if (error.response && error.response.status === 404) {
        return null; // Retorna null se o usuário não existir
      } else {
        throw error; // Lança qualquer outro erro que ocorrer
      }
    }}


  async getAllUsers(): Promise<User[] | null> {
    try {
      const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}`);
      return response.data;
      
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error);
        return null;
    }

  }

}

export default  UserService;
