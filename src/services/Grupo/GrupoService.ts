import axios, { AxiosResponse, AxiosError } from 'axios';
import { Grupo, INewGrupo } from '../../types/types';

const BASE_URL = 'http://localhost:3000/grupos';//'https://localhost:7217/api/User/'

class GrupoService {

        constructor() {
        // Se necessário, adicione inicializações aqui
      }

      

      async removeGrupo(grupoId: string): Promise<boolean> {
        try {
          // Verifica se o grupo existe na API
          const existingGrupo = await this.getGrupoById(grupoId);
          if (!existingGrupo) {
            console.error('Erro ao excluir Grupo: Grupo não encontrado');
            return false; // Retorna false se o grupo não for encontrado
          }
    
          // Se o grupo existe, faz a requisição para excluí-lo
          const response = await axios.delete(`${BASE_URL}/${grupoId}`);
          return response.status === 200; // Retorna true se o grupo foi excluído com sucesso
    
        } catch (error) {
          console.error('Erro ao excluir Grupo:', error);
          return false; // Retorna false em caso de erro
        }
      }



      async addGrupo(grupo: Grupo): Promise<boolean> {
        try {
          // Verifica se o ID já existe na API
    
          // Se o ID não existe, adiciona o usuário
          const response = await axios.post(BASE_URL, grupo);
          return response.status === 201; // Retorna true se o usuário foi adicionado com sucesso
    
        } catch (error) {
          console.error('Erro ao adicionar grupo:', error);
          return false; // Retorna false em caso de erro
        }
      }



  async validaGrupo(nome: string, quantidadePessoas: number, valor: number): Promise<boolean> {
    try {
        const response: AxiosResponse<Grupo[]> = await axios.get(`${BASE_URL}?nome=${nome}&quantidadePessoas=${quantidadePessoas}&valor=${valor}`);
        if (response.data.length === 0) {
          return false;
        }
  
        return response.status === 200; 
    } catch (error) {
      console.error('Erro ao validar Grupo:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async getGrupoById(grupoId: string): Promise<Grupo | null> {
    try {
      const response: AxiosResponse<Grupo> = await axios.get(`${BASE_URL}/${grupoId}`);
      return response.data; // Retorna o grupo se encontrado

    } catch (error: AxiosError | any) { 
      if (error.response && error.response.status === 404) {
        return null; // Retorna null se o grupo não existir
      } else {
        throw error; // Lança qualquer outro erro que ocorrer
      }
    }
  }
 async getAllGrupo(): Promise<Grupo[] | null> {
    try {
      const response: AxiosResponse<{ data: Grupo[] }> = await axios.get(`${BASE_URL}`);
      console.log('Response data:', response.data); // Adicione este log para ver os dados retornados
      return response.data.data; // Ajuste aqui para retornar a propriedade 'data' da resposta
    } catch (error) {
      console.error('Erro ao buscar grupos:', error);
      return null;
    }
  }

}

export default  GrupoService;
