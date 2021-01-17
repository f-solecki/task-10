
import React, { Component } from 'react';
import { FlatList, Text, View, Image, LogBox } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json, loading: false });
      })
      .catch((error) => console.error(error))
  }


  render() {
    LogBox.ignoreAllLogs("Warning: Can't perform a React state update on an unmounted component.This is a no - op, but it indicates a memory leak in your application.To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.")
    const { data, loading } = this.state;
    return (
      <View style={{ flex: 1, marginTop: 45, justifyContent: loading == true ? 'center' : 'flex-start' }}>
        {loading == true ? <Text style={{ alignSelf: 'center' }}>Please wait, data is loading.{'\n'}It can take a while.</Text> :

          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (<View style={{ marginBottom: 20, borderWidth: 1, borderColor: 'black', alignItems: 'center', padding: 5, marginLeft: 5, marginRight: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
              <Image source={{ uri: item.thumbnailUrl }} style={{ width: 150, height: 150 }} />
            </View>
            )}
          />
        }
      </View>
    );
  }
};