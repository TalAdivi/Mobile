import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  View,
  Dimensions,
  AsyncStorage
} from 'react-native'

const { height, width } = Dimensions.get('window')

function GridImg ({ smallImgURL, bigImgURL, navigation }) {
  return (
    <View style={styles.gridBtn}>

      <TouchableOpacity
        onPress={() => navigation.navigate('BigPic', {
          bigImgURL: bigImgURL,
          smallImgURL: smallImgURL
        })}
        style={styles.item}
      >
        <Image
          style={styles.gridImg}
          source={{ uri: smallImgURL }}
        />
      </TouchableOpacity>
    </View>
  )
}
let id = 0
export default function App ({ navigation }) {
  const [favoritesArr, setFavoritesArr] = useState(null)
  const [noFav, setNoFav] = useState(false) // false == there is res

  useEffect(() => {
    const fetchFav = async () => {
      const { favArr } = await AsyncStorage.getItem('favPics').then(res => JSON.parse(res))
      if (favArr.length > 0) {
        setFavoritesArr(favArr)
      } else {
        setNoFav(true)
      }
    }
    try {
      fetchFav()
    } catch (e) {
      console.log(e.message)
    }
  }, [])

  return (
    noFav ? (
      <View style={styles.noFav}>
        <Text style={styles.title}> No Favoriets! </Text>
        <Image resizeMode="cover" source={require('../assets/sekscr2ez.gif')} />
      </View>
    )
      : favoritesArr === null ? (<ActivityIndicator size={100} color="#000000" />)
        : (
          <SafeAreaView style={styles.container} >
            <FlatList
              horizontal={false}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              data={favoritesArr}
              renderItem={({ item }) => (
                <GridImg
                  id={id++}
                  smallImgURL={item.smallImgURL}
                  bigImgURL = {item.bigImgURL}
                  navigation={navigation}
                />
              )}
              keyExtractor={() => id++}
            />
          </SafeAreaView>)
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'center'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    marginBottom: 6
  },
  flatList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  noFav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridBtn: {
    flex: 1,
    flexDirection: 'column',
    margin: 3
  },
  gridImg: {
    flexBasis: 100,
    width: (width / 3) - 5,
    height: height / 4
  }
})
