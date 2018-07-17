import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Wheel from './components/Wheel'
import styles from './Styles'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.App}>
        <Wheel />
      </View>
    );
  }
}
