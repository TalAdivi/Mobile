import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, AsyncStorage, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const { width } = Dimensions.get('window')

export default function MyStack ({ route, navigation }) {
  const { bigImgURL, smallImgURL } = route.params
  const [loading, setLoading] = useState(false)
  const [isFav, setIsFav] = useState(true)

  const addToFav = async () => {
    try {
      const { favArr } = await AsyncStorage.getItem('favPics').then(res => JSON.parse(res))

      favArr.push({ bigImgURL, smallImgURL })

      await AsyncStorage.setItem('favPics', JSON.stringify({ favArr: favArr }))
      setIsFav(true)
    } catch (e) {
      console.log(e.message)
    }
  }

  const checkPicIsFav = async () => {
    try {
      const { favArr } = await AsyncStorage.getItem('favPics').then(res => JSON.parse(res))
      console.log('value === ', favArr)
      if (favArr.length > 0) {
        for (const url of favArr) {
          if (url.bigImgURL === bigImgURL) {
            setIsFav(true)
            return
          }
        }
      }
      setIsFav(false)
    } catch (e) {
      // error reading value
      console.log(e.message)
    }
  }

  useEffect(() => {
    checkPicIsFav()
  }, [])

  return (
    <>
      {loading && <View style={styles.container}>

        <Image style={{ alignSelf: 'center' }} source={require('../assets/ajax-loader.gif')} />
      </View>}
      <View style={styles.container}>
        <View style={styles.content}>

          <Image
            style={{
              flex: 1,
              alignSelf: 'center',
              width: width,
              height: 1,
              resizeMode: 'contain'
            }}
            resizeMethod= "resize"
            source={{ uri: bigImgURL }}
            onLoadStart = {() => setLoading(true)}
            onLoadEnd = {() => setLoading(false)}
          />
        </View>

        <View style={{ minHeight: 70 }}>
          { !isFav && (<Button
            color="#000000"
            buttonStyle={styles.favoritesButton}

            icon={
              <Icon
                name="heart"
                size={45}
              />
            }
            title=""
            iconContainerStyle
            onPress={addToFav}
          />) }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column',
    alignContent: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  safeArea: {
    backgroundColor: '#2f363c'
  },
  search: {
    borderColor: '#2f363c',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    fontSize: 28
  },
  indicator: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f363c'
  },
  contactItem: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 70,
    padding: 6,
    borderColor: '#2f363c',
    borderStyle: 'solid',
    borderWidth: 1
  },
  contactItemText: {
    fontSize: 15
  },
  header: {
    height: 50,
    backgroundColor: 'blue',
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
  }
})
