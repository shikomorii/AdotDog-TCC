import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import logo from '../assets/logo.png';
import 'firebase/auth';
import 'firebase/database';

const CadastroUsuario = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setEmailVerified(user.emailVerified);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCadastro = () => {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        userCredential.user.sendEmailVerification()
          .then(() => {
            showMessage('Cadastro realizado com sucesso! Um email de verificação foi enviado.');
          })
          .catch((error) => {
            console.error("Erro ao enviar email de verificação:", error);
          });
      })
      .catch((error) => {
       
        showMessage('Cadastro realizado com sucesso! Um email de verificação foi enviado.');
        navigation.navigate('Login');
      });
  };

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const handleLogin = () => {
    if (emailVerified) {
      navigation.navigate('Login');
    } else {
      showMessage('Erro', 'O email ainda não foi verificado.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.txt}>Crie uma conta</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome"
          onChangeText={setNome}
          value={nome}
          style={styles.textInput}
          placeholderTextColor="#000"
        />
        <View style={styles.separator} />
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          style={styles.textInput}
          keyboardType="email-address"
          placeholderTextColor="#000"
        />
        <View style={styles.separator} />
        <TextInput
          placeholder="Senha"
          onChangeText={setSenha}
          value={senha}
          style={styles.textInput}
          secureTextEntry={true}
          placeholderTextColor="#000"
        />
      </View>
      
      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Já tem uma conta?</Text>
        <Text style={styles.signUpLink}>Faça login agora</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroUsuario;

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
  logo: {
    width: '50%',
    height: '25%',
    left: '1%',
    top: '-35%',
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#b8b8b8',
  },
  signUpLink: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  txt: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
