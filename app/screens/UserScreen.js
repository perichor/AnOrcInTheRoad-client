import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { Font } from 'exponent';
import UserProfile from '../components/UserProfile'
import users from '../constants/users';
import stats from '../constants/stats';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <UserProfile users={users} stats={stats} />
        </ScrollView>
      </View>
    )
  }
}

