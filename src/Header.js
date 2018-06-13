import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// home button does nothing for now
let Header = () => (
  <View style={styles.container}>
    <Text style={styles.headerText}>Recipe finder</Text>
    <Text style={styles.linkText}>Home</Text>
  </View>
);

let styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: '16px',
    marginRight: 30,
    color: 'white',
  },
  linkText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Header;
