import React from 'react'
import { SearchBar, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.setSearchQuery = props.setSearchQuery
    this.state = {
      search: ''
    }
  }

  handleUpdateSearch = (search) => {
    this.setState({ search })
  }

  handleSendSearchQuery = () => {
    this.setSearchQuery(this.state.search)
  }

  render() {
    const { search } = this.state
    return (
      <>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.handleUpdateSearch}
          value={search}
          lightTheme
          searchIcon={
            <Button
              color="#000000"
              buttonStyle={{ backgroundColor: 'transparent' }}
              icon={<Icon name="image-search" size={30} />}
              title=""
              iconContainerStyle
              onPress={this.handleSendSearchQuery}
            />
          }
        />
      </>
    )
  }
}
