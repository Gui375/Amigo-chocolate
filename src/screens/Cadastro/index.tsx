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
  const [NewEmail, setNewEmail] = useState<string>('');
  const [NewPassword, setNewPassword] = useState<string>('');
  const [NewConfPassword, setNewConfPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);


  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };



  const userService = new UserService();
const teste = async() =>{
console.log(NovoUsuario)
}




const handleCadastroUsuario = async (usuario: User) => {
  if (Newlogin === '' || NewEmail === '' || NewPassword === '') {
    alert('Erro ao criar usuário!');
    return false;
  }

  if (!validateEmail(NewEmail)) {
    setEmailError(true);
    return false;
  } else {
    setEmailError(false);
  }

  if (NewPassword !== NewConfPassword) {
    alert('Senha divergente!');
    return false;
  }

  try {
    const success = await userService.addUser(usuario);
    if (success) {
      alert('Usuário Cadastrado com sucesso!');
      navigation.navigate('Login');
    } else {
      alert('Erro ao cadastrar!');
      return false;
    }
  } catch (error) {
    alert('Erro ao criar Usuário!');
  }
};


const NovoUsuario : User={
  nome: Newlogin,
  email: NewEmail,
  senha: NewPassword
}


console.log(NovoUsuario)
//O que será mostrado no site
  return (
    <View style={styles.container}>
      <div style={styles.div}>
        <h1 style={styles.title}>Cadastro</h1>
        <br />
        <br />

        <TextInput
          style={[styles.input, usernameError && styles.errorInput]} // Aplicar estilo de erro se usernameError for true
          placeholder="Usuário"
          onChangeText={setNewLogin}
          value={Newlogin}
        />
        <TextInput
          style={[styles.input, emailError && styles.errorInput]} // Aplicar estilo de erro se emailError for true
          placeholder="E-mail"
          onChangeText={setNewEmail}
          value={NewEmail}
        />
        {emailError && <Text style={styles.errorText}>Email inválido</Text>}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={setNewPassword}
          value={NewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          onChangeText={setNewConfPassword}
          value={NewConfPassword}
        />

        <View style={styles.container}>
          <CustomButton title='Cadastrar' onPress={() => handleCadastroUsuario(NovoUsuario)}></CustomButton>
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
    errorInput: {
      borderColor: 'red', // Alterar a cor da borda para vermelho se houver erro
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
      borderRadius: 12,
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