
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, SafeAreaView, ActivityIndicator, FlatList, Text } from 'react-native'
import * as contacts from 'expo-contacts'

export default function App() {
  const [contactsData, setContactsData] = useState(null)

  useEffect(() => {
    const getContact = async () => {
      const { status } = await contacts.requestPermissionsAsync();

      if (status == "granted") {
        const { data } = await contacts.getContactsAsync({
          // fields: [Fields.Name, Fields.PhoneNumbers]
        })

        // console.log('data = ', data);
        setContactsData(data)
        return;
      } else {
        console.log("no permission");
      }
    }

    try {
      getContact()
    }
    catch (e) {
      console.log(e)
    }

  }, [])

  renderContactItem = ({ item }) => { // item is the contact object
    return (
      <View style={styles.contactItem}>
        <Text style={styles.contactItemText}> {item.name}</Text>
        <Text style={styles.contactItemText}> {item.phoneNumbers ? item.phoneNumbers[0].number : ''}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      {/* <View style={styles.containerTwo}> */}
        <View style={styles.viewStyleOne} >

          <Text style={styles.textStyle}> 99 </Text>
        </View>
        <View style={styles.viewStyleOne} >

          <Text style={styles.textStyle}>  </Text>
        </View>
      {/* </View> */}

      {/* <View style={styles.containerThree}> */}
        <View style={styles.viewStyleOne}>
          <Text style={styles.textStyle}> 1 </Text>
        </View>
        <View style={styles.viewStyleTwo}>
          <Text style={styles.textStyle}> 2 </Text>
        </View>
        <View style={styles.viewStyleThree}>
          <Text style={styles.textStyle}> 3 </Text>
        </View>

      {/* </View> */}


    </View>

    // <View style={styles.container}>
    //   <SafeAreaView style={styles.safeArea} />
    //   <TextInput placeholder={'Search contact'} style={styles.search} />
    //   <View style={styles.content}>
    //     {contactsData === null ? (
    //       <View styles={styles.indicator}>
    //         <ActivityIndicator size={'large'} color={'#2fcccc'} />
    //       </View>
    //     ) : (<FlatList
    //       data={contactsData}
    //       renderItem={renderContactItem}
    //       keyExtractor={item => item.id}
    //     />
    //       )}
    //   </View>
    // </View>
  )
}

// margins be in items most of the time, not in container.
let styles = StyleSheet.create({
  container: {
    backgroundColor: '#4286f4',
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",  // sides of each item, the space between them, 
    alignItems: "center",   // up and down respecting to the whole screen, the all items 

    // flexWrap : "wrap", // if there is item too large, this option make the other item be under him, FUCKS 'alignItems'

    alignContent: "stretch"
  },
  containerTwo: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",  // sides of each item, the space between them, 
    alignItems: "center",   // up and down respecting to the whole screen, the all items 
    alignContent: 'space-around',
    // flexWrap : "wrap", // if there is item too large, this option make the other item be under him, FUCKS 'alignItems'

    alignContent: "center"
  },


  containerThree: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",  // sides of each item, the space between them, 
    alignItems: "center",   // up and down respecting to the whole screen, the all items 
    alignContent: 'space-around',
    // flexWrap : "wrap", // if there is item too large, this option make the other item be under him, FUCKS 'alignItems'

    alignContent: "center",
  },

  viewStyleOne: {
    marginTop: 60,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b642f4',

    // alignSelf: "flex-start", // making one item act different from all

    // flexGrow: 1,            // filling the width of item to the rest of the screen relatively to the other items 

    // flexBasis: 20           //  control the size of the item with percentage , can use or this or flexGrow

  },
  viewStyleTwo: {
    marginTop: 60,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    // flexGrow: 1,
    flexBasis: 'auto',
  },
  viewStyleThree: {
    marginTop: 60,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  textStyle: {
    textAlign: 'center'
  }
})


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//   },
//   content: {
//     flex: 1,
//     // backgroundColor: 'red'
//   },
//   safeArea: {
//     backgroundColor: '#2f363c'
//   },
//   search: {
//     borderColor: '#2f363c',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     height: 40,
//     fontSize: 28,
//     padding: 10
//   },
//   indicator: {
//     ...StyleSheet.absoluteFill,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#2f363c'
//   },
//   contactItem: {
//     flex: 1,
//     justifyContent:  "flex-end",
//     height: 70,
//     padding: 6,
//     borderColor: '#2f363c',
//     borderStyle: 'solid',
//     borderWidth: 1,
//   },
//   contactItemText: {
//     fontSize: 15,
//   },
// })