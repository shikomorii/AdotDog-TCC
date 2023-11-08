import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo.png';
import desenho from '../assets/desenho.png';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Por que adotar?</Text>
      <Text style={styles.description}>
        Nesse exato momento, existem milhares de doguinhos e gatinhos esperando um humano para chamar de seu.
      </Text>
     

      <Image
        source={{
          uri:
            'https://i.pinimg.com/originals/d2/99/40/d2994005233783287041f6b90980546b.gif',
        }}
        style={styles.background}
      />

      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Encontrar Meu Novo Amigo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => navigation.navigate('DenunciaCachorro')}
      >
        <Feather name="phone" size={24} color="white" style={styles.reportIcon} />
        <Text style={styles.reportButtonText}>Denunciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  background: {
    position: 'absolute',
    top: 180,
    left: 30,
    width: '100%',
    height: '50%',
    opacity: 0.7, // Adicione um pouco de transparência ao fundo
  },
  logo: {
    width: 220,
    height: 150,
    top: -200,
    marginBottom: 20,
  },
  title: {
    top: -200,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    top: -190,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  subDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  reportButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  reportIcon: {
    marginRight: 10,
  },
  reportButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Home;
