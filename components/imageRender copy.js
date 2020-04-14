import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  View
} from 'react-native'
import Constants from 'expo-constants'
import { List, ListItem } from 'react-native-elements'
// import { APIKey } from '../constants'
import axios from 'axios'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item'
  }
]

function Item ({ id, title, selected, onSelect, imgURL }) {
  return (
  // <View style={styles.item}>

    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item
        // { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' }
      ]}
    >
      <Image
        style={{ width: 150, height: 150 }}
        source={{ uri: imgURL }}
      />
    </TouchableOpacity>
    // </View>
  )
}

export default function App ({ searchQuery }) {
  const [selected, setSelected] = useState(new Map())

  const [photos, setPhotos] = useState(null)
  const [noRes, setNoRes] = useState(false) // false == there is res

  const APIKey = '15915873-d72824a83d0bc6d915ef0da5b'
  const pixabayURL = `https://pixabay.com/api/?key=${APIKey}&q=${searchQuery}`

  useEffect(() => {
    const fetchData = async () => {
      // console.log('pixabayURL = ', pixabayURL)
      const res = await axios({
        method: 'get',
        url: `${pixabayURL}`

      }).then(res => res.data)

      if (res.totalHits > 0) {
        setNoRes(false)
        setPhotos(res.hits)
        console.log('res.hits', res.hits[1].id)
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

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected)
      newSelected.set(id, !selected.get(id))

      setSelected(newSelected)
    },
    [selected]
  )

  return (
    photos === null ? (<ActivityIndicator size={100} color="#000000" />)
      : noRes ? (<Text> No RES! </Text>)
        : (<SafeAreaView style={styles.container} >

          {/* <View style={styles.flatList} > */}

          <FlatList
            horizontal={false}
            numColumns={3}
            // ListHeaderComponentStyle={styles.flatList}
            // initialNumToRender={3}
            style={{ flex: 1 }}
            data={photos}
            renderItem={({ item }) => (
              <Item
                // style={styles.item}
                id={item.id}
                title={'item.title'}
                selected={!!selected.get(item.id)}
                onSelect={onSelect}
                imgURL={item.previewURL}
              />
            )}
            keyExtractor={item => item.id}
            extraData={selected}
          />
          {/* </View> */}
        </SafeAreaView>)

  )

  // <SafeAreaView style={styles.container}>
  //   <FlatList
  //     data={DATA}
  //     renderItem={({ item }) => (
  //       <Item
  //         id={item.id}
  //         title={item.title}
  //         selected={!!selected.get(item.id)}
  //         onSelect={onSelect}
  //       />
  //     )}
  //     keyExtractor={item => item.id}
  //     extraData={selected}
  //   />
  // </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
    // width: '100%'
    // flexBasis: 100
    // flexDirection: 'row',
    // justifyContent: 'flex-start'
  },
  item: {
    flex: 1,
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 8
    // width: 150,
    // height: 150
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // alignSelf: "flex-start"
  },
  title: {
    fontSize: 32
  },
  flatList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})
