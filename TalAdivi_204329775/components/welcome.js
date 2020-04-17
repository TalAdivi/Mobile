import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome! </Text>
      <Image resizeMode="cover" source={require('../assets/SaYmoW6.gif')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  welcomeText: {
    margin: 15,
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
