import React from 'react'
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'react-native-elements'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setSearchQuery = props.setSearchQuery
    this.state = {
      search: '',
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  sendSearchQuery = () => {
    this.setSearchQuery(this.state.search)
  };


  render() {
    const { search } = this.state;
    return (
      <>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        lightTheme={true}
        searchIcon = {
          <Button
          color="#000000"
          buttonStyle={{backgroundColor: 'transparent'}}
            icon={
              <Icon
                name="image-search"
                size={30}
              />
            }
            title=""
            iconContainerStyle
            onPress={this.sendSearchQuery }
          />
      }
      />
      </>
    );
  }
}

