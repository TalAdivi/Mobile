import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, AsyncStorage, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import MySearchBar from './searchBar'
import ImageRender from './imageRender'
import Welcome from './welcome'

const { width } = Dimensions.get('window')

const initData = async () => {
  try {
    await AsyncStorage.setItem('favPics', JSON.stringify({ favArr: [] }))
  } catch (e) {
    console.log(e.message)
  }
}

export default function App({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('Grid')
  useEffect(() => {
    initData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}> Images Browser </Text>
        <Button
          color="#000000"
          buttonStyle={styles.favoritesButton}
          icon={<Icon name="heart-multiple" size={30} />}
          title=""
          iconContainerStyle
          onPress={() => navigation.navigate('Favorite')}
        />
      </View>
      <MySearchBar setSearchQuery={setSearchQuery} />
      <View style={styles.flexRow}>
        <Button
          title="Grid View"
          titleStyle={[styles.btnTitle, { color: viewMode === 'Grid' ? 'white' : 'black' }]}
          buttonStyle={{
            backgroundColor: viewMode === 'Grid' ? '#1e88e5' : 'transparent',
            width: width / 2
          }}
          onPress={() => setViewMode('Grid')}
        />
        <Button
          title="List View"
          titleStyle={[styles.btnTitle, { color: viewMode === 'List' ? 'white' : 'black' }]}
          buttonStyle={{
            backgroundColor: viewMode === 'List' ? '#1e88e5' : 'transparent',
            width: width / 2
          }}
          onPress={() => setViewMode('List')}
        />
      </View>

      <View style={styles.imagePlace}>
        {searchQuery === '' ? (
          <Welcome />
        ) : (
          <ImageRender searchQuery={searchQuery} navigation={navigation} mode={viewMode} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center'
  },
  header: {
    height: 50,
    backgroundColor: '#1565c0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  imagePlace: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    alignItems: 'center' 
  },
  favoritesButton: {
    backgroundColor: 'transparent'
  },
  btnTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  flexRow: {
    flexDirection: 'row'
  }
})
