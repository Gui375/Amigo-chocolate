import axios, { AxiosResponse } from 'axios';
import { Grupo } from '../../types/types';

const BASE_URL = 'http://localhost:3001/Grupo';//'https://localhost:7217/api/User/'

class GrupoService {

        constructor() {
        // Se necessário, adicione inicializações aqui
      }

  async addGrupo(grupo: Grupo): Promise<boolean> {
    try {
    //  const response = await axios.post(`${BASE_URL}`, Grupo);
    
    const formData = new FormData();
    formData.append('nome', grupo.nome);
    formData.append('quantidade', grupo.quantidade);

    const responsePhoto = await fetch(grupo.photo);

    const blob = await responsePhoto.blob();

    formData.append('photo', blob, 'photo.jpg');

    const uploadResponse = await axios.post(BASE_URL+'addGrupo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
      return uploadResponse.status === 201; // Retorna true se o usuário foi adicionado com sucesso
    
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async validaGrupo(nome: string, quantidade: string): Promise<boolean> {
    try {
        const response: AxiosResponse<Grupo[]> = await axios.get(`${BASE_URL}?nome=${nome}&password=${quantidade}`);
        //na aplicação de vocês não retorna array não e o metodo sera um post que retorna um unico usuario.
        if (response.data.length === 0) {
          return false;
        }
  
        return response.status === 200; 
    } catch (error) {
      console.error('Erro ao validar Grupo:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async getGrupoById(GrupoId: number): Promise<Grupo> {
    try {
        const response: AxiosResponse<Grupo> = await axios.get(`${BASE_URL}?id=${GrupoId}`);             
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Grupo pelo ID:', error);
        return { id: 0, nome: '', quantidade: '' } ;
    }

}

  async getAllGrupo(): Promise<Grupo[] | null> {
    try {
      const response: AxiosResponse<Grupo[]> = await axios.get(`${BASE_URL}`);
      return response.data;
      
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error);
        return null;
    }

  }

}

export default  GrupoService;
