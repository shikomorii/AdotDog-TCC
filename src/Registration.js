import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import * as ImagePicker from 'expo-image-picker';

const Registration = () => {
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [imagemUrl, setImagemUrl] = useState(null);
  const [nomePet, setNomePet] = useState('');
  const navigation = useNavigation();

  const handleImageUpload = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync();

    if (!cancelled) {
      setImagemUrl(uri);
    }
  };

  const handleCadastro = async () => {
    const db = getFirestore();
    try {
      await addDoc(collection(db, 'idrmp43D1TEUCWZWEHci'), {
        cidade,
        descricao,
        telefone,
        imagemUrl,
        nomePet,
        userEmail: firebase.auth().currentUser.email,
      });
      console.log('Documento adicionado com sucesso!');
      setCidade('');
      setDescricao('');
      setTelefone('');
      setImagemUrl(null);
      setNomePet('');
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Erro ao adicionar documento: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Dê um Lar aos Peludos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Pet"
        placeholderTextColor="#fff"
        value={nomePet}
        onChangeText={setNomePet}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        placeholderTextColor="#fff"
        value={cidade}
        onChangeText={setCidade}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#fff"
        value={descricao}
        onChangeText={setDescricao}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#fff"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="numeric"
        returnKeyType="done"
      />
      {imagemUrl && (
        <Image
          source={{ uri: imagemUrl }}
          style={styles.image}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
});

export default Registration;
