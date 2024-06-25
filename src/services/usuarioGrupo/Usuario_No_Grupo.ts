import axios, { AxiosResponse, AxiosError } from 'axios';
import { User } from '../../types/types';
import { Grupo } from '../../types/types';
import { novoUSgrupo } from '../../types/types';
import UserService from '../UserService/UserService';
import GrupoService from '../Grupo/GrupoService';


const BASE_URL = 'http://localhost:3000/novoUSgrupo';//'https://localhost:7217/api/User/'
const BASE_URL_User = 'http://localhost:3000/usuarios'
const BASE_URL_Grupo = 'http://localhost:3000/grupos'

class NovoUSgrupoService {

    constructor() {
        // Se necessário, adicione inicializações aqui
      }

//   async removeUser(userId: string): Promise<boolean> {
//     try {
//       // Verifica se o usuário existe na API
//       const existingUser = await this.getUserById(userId);
//       if (!existingUser) {
//         console.error('Erro ao excluir usuário: Usuário não encontrado');
//         return false; // Retorna false se o usuário não for encontrado
//       }
  
//       // Se o usuário existe, faz a requisição para excluí-lo
//       const response = await axios.delete(`${BASE_URL}/${userId}`);
//       return response.status === 200; // Retorna true se o usuário foi excluído com sucesso
  
//     } catch (error) {
//       console.error('Erro ao excluir usuário:', error);
//       return false; // Retorna false em caso de erro
//     }
//   }




  async addUserGrupo(id_usuario: string, id_Grupo: string): Promise<boolean> {
    try {
       const repoUser = new UserService()
       const repoGrup = new GrupoService()
      const Usuario = repoUser.getUserById(id_usuario)
      const Grupo = repoGrup.getGrupoById(id_Grupo)
      const novoUSgrupo ={
            id_grupo: Grupo,
            id_usuario: Usuario,
            ADM: 1
      }
      const response = await axios.post(BASE_URL, novoUSgrupo );
      return response.status === 201; // Retorna true se o usuário foi adicionado com sucesso

    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async validateUserForGrupo(id: string ): Promise<boolean> {
    try {
      // Ajuste a URL para incluir os parâmetros de rota
      const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL_User}/${id}`);
      
      console.log(response);
      
      // Verifica se a resposta contém dados de usuário
      if (response.data.length === 0) {
        return false;
      } else {
        return response.status === 200;
      }
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }
  async ValidaGrupo(id: string ): Promise<boolean> {
    try {
      // Ajuste a URL para incluir os parâmetros de rota
      const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL_Grupo}/${id}`);
      
      console.log(response);
      
      // Verifica se a resposta contém dados de usuário
      if (response.data.length === 0) {
        return false;
      } else {
        return response.status === 200;
      }
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  
  
    // async getUserById(userId: string): Promise<User | null> {
    //   try {
    //     const response: AxiosResponse<User> = await axios.get(`${BASE_URL}/${userId}`);
    //     return response.data; // Retorna o usuário se encontrado

    //   } catch (error: AxiosError | any) { 
    //     if (error.response && error.response.status === 404) {
    //       return null; // Retorna null se o usuário não existir
    //     } else {
    //       throw error; // Lança qualquer outro erro que ocorrer
    //     }
    //   }}


//   async getAllUsers(): Promise<User[] | null> {
//     try {
//       const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}`);
//       return response.data;
      
//     } catch (error) {
//         console.error('Erro ao buscar usuário pelo ID:', error);
//         return null;
//     }

//   }

}

export default  NovoUSgrupoService;
