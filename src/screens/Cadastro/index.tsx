import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity , Alert} from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService   from '../../services/UserService/UserService';


const Cadastro = () => {
    
   //Variavel que não pode ser excluida
   const navigation = useNavigation<StackTypes>();
   //

   
  //Declaração de variaveis
  const [Newlogin, setNewLogin] = useState<string>('');
  const [NewEmail, setNewEmail] = useState<string>('');
  const [NewIdade, setNewIdade] = useState<string>('');
  const [NewPassword, setNewPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);

  const userService = new UserService();
 

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
        placeholder="E-mail"
        onChangeText={setNewEmail}
        value={NewEmail}
      />
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]} // Aplicar estilo de erro se usernameError for true
        placeholder="Nome Completo"
        onChangeText={setNewLogin}
        value={Newlogin}
      />
       <TextInput
        style={[styles.input, usernameError && styles.errorInput]} // Aplicar estilo de erro se usernameError for true
        placeholder="Idade"
        onChangeText={setNewIdade}
        value={NewIdade}
      />
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]} // Aplicar estilo de erro se usernameError for true
        placeholder="Usuário"
        onChangeText={setNewLogin}
        value={Newlogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setNewPassword}
        value={NewPassword}
      />


       <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={styles.button} activeOpacity={0.1}>
      <Text style={styles.buttonText} id=''>Criar Conta</Text>
    </TouchableOpacity>
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
      backgroundColor: '#6495ED',
     
    },
    div:{
      backgroundColor : '#191970',
      position : 'absolute',
      padding : '1%',
      borderRadius : 16,
      alignItems: 'center',
    
    },
    title: {
      fontSize: 26, 
      marginBottom: 20,     
      color:'#FFFFFF',
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
      width: '100%',
      height: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 2,
      marginBottom: 10,
      paddingHorizontal: 10,
      color:'#FFFFFF',
      padding: '2%',
    //   textAlign:'center'
      
      
    },
    errorInput: {
      borderColor: 'red', // Alterar a cor da borda para vermelho se houver erro
    },
    button: {
        width: '100%',
        height: 40,
        borderRadius: 8,
        backgroundColor: '#836FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#836FFF',
        color:'#836FFF',
      },
      buttonText: {
        color:'#FFFFFF',
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