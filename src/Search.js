import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const BASEURL = 'http://www.recipepuppy.com/api/';

// use the debounce function to limit api calls and ensure the last
// string entered is used for the query
let debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export default class Search extends Component {
  state = {
    searchResults: [],
  };

  /*
    Note that I have implemented the search button as the mockup shows
    but the button is redundant since the search is already running after
    every text change. Pressing the button runs the same search that has 
    already been run when the search text changed, so results will not change.
  */
  onSearchBtnPress = () => this.search(this.state.searchText);

  search = async searchText => {
    let query = searchText.trim();
    if (query.length > 0) {
      query = encodeURIComponent(query);
      let urlp1 = `${BASEURL}?q=${query}&p=1`;
      let urlp2 = `${BASEURL}?q=${query}&p=2`;
      try {
        // asked for 20 results, by default it gives 10, so combining two requests
        let res1 = await fetch(urlp1);
        let res2 = await fetch(urlp2);
        let json1 = await res1.json();
        let json2 = await res2.json();
        let searchResults = json1.results.concat(json2.results);
        console.log(searchResults[0]);
        this.setState({ searchResults });
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState({ searchResults: [] });
    }
  };

  onChangeText = debounce(searchText => {
    this.setState({ searchText });
    this.search(searchText);
  }, 100);

  render() {
    return (
      <React.Fragment>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for..."
            onChangeText={this.onChangeText}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.onSearchBtnPress}
          >
            <Text style={{ textAlign: 'center' }}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resultsContainer}>
          {this.state.searchResults.map(({ title, href }, i) => (
            <View
              key={`result-${i}`}
              style={[styles.resultRow, i % 2 ? styles.evenRow : styles.oddRow]}
            >
              <Text style={styles.resultText} onPress={() => window.open(href)}>
                {title.trim()}
              </Text>
            </View>
          ))}
        </View>
      </React.Fragment>
    );
  }
}

let styles = StyleSheet.create({
  searchBarContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    borderRadius: 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    padding: 10,
    flex: 1,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'lightgray',
  },
  searchButton: {
    padding: 10,
    width: 80,
    justifyContent: 'center',
  },
  resultsContainer: {
    marginTop: 30,
  },
  resultRow: {
    padding: 10,
  },
  oddRow: {
    backgroundColor: '#eee',
  },
  resultText: {
    color: 'steelblue',
  },
});
