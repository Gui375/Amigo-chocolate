import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity , Alert} from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService   from '../../services/UserService/UserService';
import CustomButton from '../../components/Button';
import { User } from '../../types/types';


const Cadastro = () => {
    
   //Variavel que não pode ser excluida
   const navigation = useNavigation<StackTypes>();
   //

   
  //Declaração de variaveis
  const [Newlogin, setNewLogin] = useState<string>('');
  const [NewId, setNewId] = useState<number>(0);
  const [NewIdade, setNewIdade] = useState<string>('');
  const [NewPassword, setNewPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);

  const userService = new UserService();

 const handleCadastroUsuario = async (user: User) => {
    const userService = new UserService();
    try {
        const success = await userService.addUser(user);
        if (success) {
          alert('Usuário Cadastrado com sucesso!')
           navigation.navigate('Login')
        } else {
          alert('Não foi possivel gravar usuário')
        }
    } catch (error) {
        // Tratar erro de requisição ou outros erros
    }
};


//O que será mostrado no site
  return (
    <View style={styles.container}>
        <div style={styles.div}>
        {/* <Text style={styles.title}>Login</Text> */}
        <h1 style={styles.title}>Cadastro</h1>
        <br />
        <br />
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]} // Aplicar estilo de erro se usernameError for true
        placeholder="Id"
        onChangeText={setNewId}
        value={NewId}
      />
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]} // Aplicar estilo de erro se usernameError for true
        placeholder="Login"
        onChangeText={setNewLogin}
        value={Newlogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setNewPassword}
        value={NewPassword}
      />

      <View style={styles.container}>
       <CustomButton title='Cadastrar' onPress={() => handleCadastroUsuario({ id: NewId, username: Newlogin, password: NewPassword,photo: ''})}></CustomButton>
       </View>
    </div>
    </View>
   
  );
};

// CSS
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     
    },
    div: {
      backgroundColor: '#FFFFFF',
      position: 'absolute',
      padding: '2%',
      borderRadius: 16,
      alignItems: 'center', // Centraliza os itens horizontalmente
      flexDirection: 'column', // Empilha os itens verticalmente
    },
    title: {
      fontSize: 26, 
      marginBottom: 20,     
      color:'#000000',
      height: 10, 
      alignItems: 'center',      
      textAlign:'center'
    },
    FGTSenha:{
      fontSize: 15,
      marginBottom: 12,
      color:'white',
      alignItems: 'center',      
      textAlign:'center'
    },
    input: {
      width: '100%', // Ocupa toda a largura disponível na div
      height: 40, // Ajuste a altura conforme necessário
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 2,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: '#000000',
    },
    errorInput: {
      borderColor: 'red', // Alterar a cor da borda para vermelho se houver erro
    },
    button: {
      width: '100%', // Ocupa toda a largura disponível na div
      height: 40, // Ajuste a altura conforme necessário
      borderRadius: 8,
      backgroundColor: '#fe5f55',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#fe5f55',
      color: '#FFFFFF',
    },
      buttonText: {
        color:'#000000',
        fontSize: 16,
      },
      corTextoIN:{
        color:'#FFFFFF',
      },
      corTextoOut:{
        color:'#FFFFFF',
      }
  });
  

export default Cadastro;