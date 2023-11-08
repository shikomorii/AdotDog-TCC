import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
    };
  }

  handleInputChange = (text) => {
    this.setState({ newMessage: text });
  };

  handleSubmit = () => {
    const { messages, newMessage } = this.state;
    if (newMessage.trim() !== '') {
      const { userEmail } = this.props.route.params;
      const updatedMessages = [...messages, { text: newMessage, isUser: true, sender: userEmail }];
      this.setState({ messages: updatedMessages, newMessage: '' });
    }
  };

  render() {
    const { messages, newMessage } = this.state;
    const { route } = this.props;
    const { userEmail } = route.params; // Recebe o email do usuário com quem está conversando da rota

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Conversando com:</Text>
          <Text style={styles.username}>{userEmail}</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.message,
                { backgroundColor: '#007AFF' },
                index % 2 === 0 ? styles.evenMessage : styles.oddMessage,
              ]}
            >
              <Text style={[styles.messageText, { color: '#fff' }]}>
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            value={newMessage}
            onChangeText={this.handleInputChange}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={this.handleSubmit}
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '70%',
    alignSelf: 'flex-end',
  },
  evenMessage: {
    alignSelf: 'flex-end', // Alterado para "flex-end"
  },
  oddMessage: {
    alignSelf: 'flex-end', // Alterado para "flex-end"
  },
  messageText: {
    fontSize: 16,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 19,
    marginTop: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
