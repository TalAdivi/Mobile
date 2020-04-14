// import React, {useState, useEffect} from 'react';
// import { StyleSheet, Text, View, TextInput,  } from 'react-native';
// // import * as Contacts from 'expo-contacts';
// // import MyContacts from './components/myContacts'
// // import ActivityIndicator from './components/ActivityIndicator'
// // import FlastList from './components/FlastList'

// export default function App() {
//   const [isLoading, setIsLoading] = useState(false)
//   return (
//     <>
//     {/* <View style={styles.container}>
//       <TextInput
//         style={styles.search}
//         // onChangeText={text => onChangeText(text)}
//         // value={""}sd
//       />
//      <ActivityIndicator />
//     </View> */}
//     {/* <View style={styles.container}>
//       {
//         // isLoading ? (<ActivityIndicator />) :  <MyContacts />

//       }
//       <ActivityIndicator />
       
//     </View> */}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   search: {
//     marginTop: 60,
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//   }
// });
// Pixel_3_XL_API_28


import React from 'react'
import { StyleSheet, View, TextInput, SafeAreaView, ActivityIndicator, FlatList ,Text} from 'react-native'
import { requestPermissionsAsync, getContactsAsync, Fields } from 'expo-contacts'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      contacts: []
    }       
  }
  async componentDidMount() {
    const { status } = await requestPermissionsAsync()
    if (status === 'granted') {
      const { data } = await getContactsAsync({
        fields: [Fields.Name, Fields.PhoneNumbers]
      })
      this.setState({ isLoading: false, contacts: data })
    } else {
      console.log('no permissions')
    }
    // loadContacts...
  }

  renderContactItem = ({ item }) => { // item is the contact object
    return (
      <View style={styles.contactItem}>
        <Text style={styles.contactItemText}> {item.name}</Text>
        <Text style={styles.contactItemText}> {item.phoneNumbers? item.phoneNumbers[0].number : ''}</Text>
      </View>
    )
  }

  render() {
    const { isLoading,contacts } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} />
        <TextInput placeholder={'Search contact'} style={styles.search} />
        <View style={styles.content}>
          {isLoading ? (
            <View styles={styles.indicator}>
              <ActivityIndicator size={'large'} color={'#2fcccc'} />
            </View>
          ) : (<FlatList
            data={contacts}
            renderItem={this.renderContactItem}
            keyExtractor={item => item.id}
          />
            )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  content: {
    flex: 1,
    // backgroundColor: 'red'
  },
  safeArea: {
    backgroundColor: '#2f363c'
  },
  search: {
    borderColor: '#2f363c',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    fontSize: 28,
    padding: 10
  },
  indicator: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f363c'
  },
  contactItem: {
    flex: 1,
    justifyContent: 'space-around',
    height: 70,
    padding: 6,
    borderColor: '#2f363c',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  contactItemText: {
    fontSize: 15,
  },
})