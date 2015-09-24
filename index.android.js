/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var REQUEST_URL = 'https://venuu.fi/venues.json';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var VenuuVenuesProto = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderVenue}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading venues...
        </Text>
      </View>
    );
  },

  renderVenue: function(venue) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: venue.thumbnail_url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={1}>{venue.title}</Text>
          <Text style={styles.subtext}>{venue.city}</Text>
        </View>
      </View>
    );
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.venues),
          loaded: true,
        });
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 1,
    marginTop: 1
  },
  rightContainer: {
    flex: 1
  },
  thumbnail: {
    width: 100,
    height: 66
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
    marginLeft: 10,
    textAlign: 'left'
  },
  subtext: {
    marginLeft: 10,
    textAlign: 'left',
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('VenuuVenuesProto', () => VenuuVenuesProto);
