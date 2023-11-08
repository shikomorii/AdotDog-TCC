import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Platform, SafeAreaView, Linking } from 'react-native';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import ChatScreen from './ChatScreen';
import Icon from 'react-native-vector-icons/Feather';
import { firebase } from '../config';

const Dashboard = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatUserEmail, setChatUserEmail] = useState(null);

  const fetchDataFromFirestore = async () => {
    setIsRefreshing(true);

    const db = getFirestore();
    const dataCollection = collection(db, 'idrmp43D1TEUCWZWEHci');
    try {
      const querySnapshot = await getDocs(dataCollection);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
    } catch (error) {
      console.error('Erro ao buscar dados do Firestore:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDataFromFirestore();
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const goToRegistration = () => {
    navigation.navigate('Registration');
  };

  const goToChat = (userEmail) => {
    navigation.navigate('ChatScreen', { userEmail });
  };

  const handleRefresh = () => {
    fetchDataFromFirestore();
  };

  const handleDelete = async (id, postUserEmail) => {
    const currentUser = firebase.auth().currentUser;
  
    if (!currentUser) {
      console.log('Você precisa estar autenticado para excluir esta postagem.');
      return;
    }
  
    if (currentUser.email === postUserEmail) {
      const db = getFirestore();
      const dataDoc = doc(db, 'idrmp43D1TEUCWZWEHci', id);
  
      try {
        await deleteDoc(dataDoc);
        console.log('Postagem excluída com sucesso!');
        fetchDataFromFirestore();
      } catch (error) {
        console.error('Erro ao excluir postagem:', error);
      }
    } else {
      console.log('Você não tem permissão para excluir esta postagem.');
    }
  };

  const abrirWhatsApp = (telefone, nomePet) => {
    const mensagem = `Olá, estou interessado em adotar seu cachorro ${nomePet}.`;
  
    const whatsappURI = `whatsapp://send?phone=${telefone}&text=${mensagem}`;
  
    Linking.openURL(whatsappURI)
      .then((data) => {
        console.log('WhatsApp aberto com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao abrir o WhatsApp:', error);
      });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
  <TouchableOpacity onPress={goToRegistration} style={styles.iconContainer}>
    <Icon name="plus" size={30} color="#fff" />
  </TouchableOpacity>
  <Text style={styles.title}>AdotDog</Text>
  <TouchableOpacity
    style={styles.refreshButton}
    onPress={handleRefresh}
    disabled={isRefreshing}
  >
    {isRefreshing ? (
      <ActivityIndicator color="#fff" size="small" />
    ) : (
      <Icon name="refresh-cw" size={20} color="#fff" />
    )}
  </TouchableOpacity>
</View>


      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <View style={styles.feedHeader}>
              <Text style={styles.username}>{item.userEmail}</Text>
              {userEmail === item.userEmail && (
                <TouchableOpacity onPress={() => handleDelete(item.id, item.userEmail)}>
                  <Icon name="trash-2" size={20} color="#fff" />
                </TouchableOpacity>
              )}

              {userEmail !== item.userEmail && (
                <TouchableOpacity onPress={() => goToChat(item.userEmail)}>
                  <Icon name="message-circle" size={20} color="#000" />
                </TouchableOpacity>
              )}
            </View>

            <Image source={{ uri: item.imagemUrl }} style={styles.itemImage} />
            <Text style={styles.itemText}>
              <Icon name="map-pin" size={20} color="#fff" style={styles.locationIcon} /> {item.cidade}
            </Text>
            <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
            <View>
              <Text style={styles.itemText}>Nome do Pet: {item.nomePet}</Text>
              
            </View>
            <TouchableOpacity
  style={styles.button}
  onPress={() => abrirWhatsApp(item.telefone, item.nomePet)}
>
  <Text style={styles.buttonText}>Abrir WhatsApp</Text>
</TouchableOpacity>
          </View>
        )}
      />

      {chatVisible && (
        <ChatScreen userEmail={chatUserEmail} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? 10 : 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  iconContainer: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  refreshButton: {
    padding: 5,
  },
  feedItem: {
    backgroundColor: '#111', // Cor de fundo do feed
    borderBottomWidth: 2,
    borderColor: '#333',
    padding: 16,
    marginBottom: 20,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemText: {
    fontSize: 16,
    marginVertical: 8,
    color: '#fff',
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: '#009688', // Cor de fundo do botão
    borderRadius: 25,
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff', // Cor do texto do botão
  },
});

export default Dashboard;
