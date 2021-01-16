
import React, { Component } from 'react';
import { FlatList, Text, View, Image } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
  }

  render() {
    const { data } = this.state;
    return (
      <View style={{ flex: 1, marginTop: 45 }}>
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (<View style={{ marginBottom: 20, borderWidth: 1, borderColor: 'black', alignItems: 'center', padding: 5, marginLeft: 5, marginRight: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
            <Image source={{ uri: item.thumbnailUrl }} style={{ width: 150, height: 150 }} />
          </View>
          )}
        />
      </View>
    );
  }
};