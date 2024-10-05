import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

export default function MeditationScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Back,</Text>
        <Text style={styles.nameText}>Chai</Text>
      </View> */}

      <Image 
        source={require('@/assets/Pharmacy.png')} 
        style={styles.screen} 
        resizeMode='contain'
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
