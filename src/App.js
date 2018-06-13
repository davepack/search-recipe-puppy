import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './Header';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <View>
        <Header />
        <View style={styles.wrapper}>
          <View style={styles.contentContainer}>
            <Search />
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    width: '100%',
    maxWidth: 960,
  },
});

export default App;
