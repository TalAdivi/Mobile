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
  Dimensions
} from 'react-native'

import axios from 'axios'

const { height, width } = Dimensions.get('window')

// Grid Based
function GridImg ({ smallImgURL, bigImgURL, navigation }) {
  return (
    <View style={styles.gridBtn}>

      <TouchableOpacity
        onPress={() => navigation.navigate('BigPic', {
          bigImgURL: bigImgURL,
          smallImgURL: smallImgURL
        })}
        style={ styles.item }
      >
        <Image
          style={styles.gridImg}
          source={{ uri: smallImgURL }}
        />
      </TouchableOpacity>
    </View>
  )
}

// List Based

function ListImg ({ smallImgURL, bigImgURL, navigation, views, likes }) {
  return (
    <View style={{ margin: 3, marginVertical: 6 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('BigPic', {
          bigImgURL: bigImgURL,
          smallImgURL: smallImgURL
        })}
        style={ styles.item }
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.listImg}
            source={{ uri: smallImgURL }}
          />
          <View
            style={styles.listText}
          >
            <Text style={styles.titleText}> Views: {views} </Text>
            <Text style={styles.titleText} > Likes: {likes} </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default function App ({ searchQuery, navigation, mode }) {
  const [photos, setPhotos] = useState(null)
  const [noRes, setNoRes] = useState(false) // false == there is res

  const APIKey = '15915873-d72824a83d0bc6d915ef0da5b'
  const pixabayURL = `https://pixabay.com/api/?key=${APIKey}&q=${searchQuery}`

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios({
        method: 'get',
        url: `${pixabayURL}`
      }).then(res => res.data)
      if (res.totalHits > 0) {
        setNoRes(false)
        setPhotos(res.hits)
      } else {
        setNoRes(true)
      }
    }
    try {
      fetchData()
    } catch (e) {
      console.log(e.message)
    }
  }, [searchQuery])

  function GridView () {
    return (
      <FlatList
        horizontal={false}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        data={photos}
        renderItem={({ item }) => (
          <GridImg
            id={item.id}
            title={'item.title'}
            smallImgURL={item.previewURL}
            bigImgURL = {item.largeImageURL}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    )
  }

  function ListView () {
    return (
      <FlatList
        data={photos}
        renderItem={
          ({ item }) =>
            <ListImg
              title={item.previewURL}
              title={'item.title'}
              smallImgURL={item.previewURL}
              bigImgURL = {item.largeImageURL}
              navigation={navigation}
              views = {item.views}
              likes = {item.likes}
            />}

        keyExtractor={item => item.id.toString()}
      />
    )
  }

  return (
    noRes ? (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.title} > No Results  </Text>
        <Text style={styles.title} > Were found!  </Text>
      
        <Image resizeMode="cover" source={require('../assets/sekscr2ez.gif')} />
      </View>
    )
      : photos === null ? (<ActivityIndicator size={100} color="#000000" />)

        : (
          <SafeAreaView style={styles.container} >
            {
              mode === 'Grid' ? <GridView /> : <ListView/>
            }
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
  gridBtn: {
    flex: 1,
    flexDirection: 'column',
    margin: 3
  },
  gridImg: {
    flexBasis: 100,
    width: (width / 3) - 5,
    height: height / 4
  },
  listText: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: height / 8
  },
  listImg: {
    flexBasis: 100,
    width: (width / 5) - 5,
    height: height / 8
  }
})
