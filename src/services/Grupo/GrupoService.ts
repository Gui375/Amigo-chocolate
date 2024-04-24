import axios, { AxiosResponse, AxiosError } from 'axios';
import { Grupo, INewGrupo } from '../../types/types';

const BASE_URL = 'http://localhost:3000/Grupo';//'https://localhost:7217/api/User/'

class GrupoService {

        constructor() {
        // Se necessário, adicione inicializações aqui
      }


      async removeGrupo(GrupoId: number): Promise<boolean> {
        try {
          // Verifica se o usuário existe na API
          const existingGrupo = await this.getGrupoById(GrupoId);
          if (!existingGrupo) {
            console.error('Erro ao excluir Grupo: Grupo não encontrado');
            return false; // Retorna false se o usuário não for encontrado
          }
      
          // Se o usuário existe, faz a requisição para excluí-lo
          const response = await axios.delete(`${BASE_URL}/${GrupoId}`);
          return response.status === 200; // Retorna true se o usuário foi excluído com sucesso
      
        } catch (error) {
          console.error('Erro ao excluir Grupo:', error);
          return false; // Retorna false em caso de erro
        }
      }




      async addGrupo(grupo: Grupo): Promise<boolean> {
        try {
          // Verifica se o ID já existe na API
          const existingUser = await this.getGrupoById(grupo.id);
          if (existingUser) {
            console.error('Erro ao adicionar Grupo: ID já existe');
            return false; // Retorna false se o ID já existir
          }
    
          // Se o ID não existe, adiciona o usuário
          const response = await axios.post(BASE_URL, grupo);
          return response.status === 201; // Retorna true se o usuário foi adicionado com sucesso
    
        } catch (error) {
          console.error('Erro ao adicionar Grupo:', error);
          return false; // Retorna false em caso de erro
        }
      }



  async validaGrupo(nome: string, quantidade: string): Promise<boolean> {
    try {
        const response: AxiosResponse<Grupo[]> = await axios.get(`${BASE_URL}?nome=${nome}&password=${quantidade}`);
        if (response.data.length === 0) {
          return false;
        }
  
        return response.status === 200; 
    } catch (error) {
      console.error('Erro ao validar Grupo:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async getGrupoById(grupoId: number): Promise<Grupo | null> {
    try {
      const response: AxiosResponse<Grupo> = await axios.get(`${BASE_URL}/${grupoId}`);
      return response.data; // Retorna o usuário se encontrado

    } catch (error: AxiosError | any) { 
      if (error.response && error.response.status === 404) {
        return null; // Retorna null se o usuário não existir
      } else {
        throw error; // Lança qualquer outro erro que ocorrer
      }
    }}

  async getAllGrupo(): Promise<Grupo[] | null> {
    try {
      const response: AxiosResponse<Grupo[]> = await axios.get(`${BASE_URL}`);
      return response.data;
      
    } catch (error) {
        console.error('Erro ao buscar grupo pelo ID:', error);
        return null;
    }

  }

}

export default  GrupoService;
