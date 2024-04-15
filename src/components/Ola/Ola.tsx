import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

interface OlaProps {
    nomeProps:string
}

const Ola : React.FC<OlaProps> = ({nomeProps}) => {

    const [contadorLikes, setContadorLikes] = useState<number>(0);

    const incrementarContador = () =>  setContadorLikes(contadorLikes + 1);

    return (
    <View style={styles.container}>
          <Text style={styles.greeting}>
            Olá {nomeProps}
            seu total de é Likes {contadorLikes}
            </Text>
      
        <Button
          title="Like"         
          onPress={incrementarContador}
          color="blue"
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    greeting: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 16,
    },
  });
  
  export default Ola;