import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import Dashboard from './Dashboard';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const auth = getAuth();

  const loginUser = () => {
    signInWithEmailAndPassword(auth,email, senha)
      .then((userCredential) => {
        // Exibir mensagem de sucesso
        showMessage('Login realizado com sucesso!');
        navigation.navigate('Dashboard'); // Redirecionar para a tela "Dashboard"
      })
      .catch((error) => {
        // Exibir mensagem de erro
        showMessage('Erro', 'Usuário e senha incorretos. Por favor, tente novamente.');
        setEmail(''); // Limpa o campo de email
        setPassword(''); // Limpa o campo de senha
      });
  };

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Acesse</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Usuário"
          placeholderTextColor="#000"
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.textInput}
          placeholder="Senha"
          placeholderTextColor="#000"
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={senha}
        />
      </View>
      <TouchableOpacity onPress={loginUser} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')} style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Não tem uma conta?</Text>
        <Text style={styles.signUpLink}>Cadastre-se já</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
  },
  button: {
    height: 50,
    width: '60%',
     marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  txt: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  signUpContainer: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    marginTop: 40,
    color: '#b8b8b8',
  },
  signUpLink: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default Login;
   