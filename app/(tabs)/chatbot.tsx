import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hi! How can I assist you today?', isUser: false },
  ]);
  const [input, setInput] = useState('');

  // Function to handle sending the message
  const sendMessage = async () => {
    if (input.trim() === '') return;

    // Add user's message to the chat
    setMessages([...messages, { text: input, isUser: true }]);
    const userMessage = input;
    setInput('');

    try {
      // Send request to OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Add ChatGPT's response to the chat
      const botMessage = response.data.choices[0].message.content;
      setMessages((prevMessages) => [...prevMessages, { text: botMessage, isUser: false }]);
    } catch (error) {
      console.error('Error communicating with ChatGPT:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Something went wrong. Please try again later.', isUser: false }]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Chatbot</Text>
        </View>

        <ScrollView style={styles.chatContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text style={message.isUser ? styles.userText : styles.botText}>
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <Ionicons name="mic-outline" size={24} color="black" />
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center' ,
    alignItems: 'center',
    
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
  },
  userText: {
    color: '#FFF',
  },
  botText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  sendButton: {
    padding: 10,
  },
});
