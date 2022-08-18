import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const TodoDetailScreen = ({route}) => {
  const {task, id, status} = route.params;
  return (
    <View style={styles.parentView}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Id:</Text>
          <Text style={styles.valueStyle}>{id}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Status:</Text>
          <Text style={styles.valueStyle}>
            {status ? 'complete' : 'pending'}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Task:</Text>
          <Text style={styles.valueStyle}>{task}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5c082b',
    // opacity: 0.9,
  },
  rowContainer: {
    padding: 5,
    marginBottom: 10,
  },

  txtStyle: {
    marginLeft: 10,
    fontSize: 35,
    fontWeight: '750',
    color: 'black',
  },

  valueStyle: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: '750',
    color: 'white',
    fontFamily: 'monospace',
  },

  container: {
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '75%',
    height: '70%',
    backgroundColor: '#740b45',
    borderRadius: 25,
    marginBottom: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 10,
    elevation: 13,
  },
});

export default TodoDetailScreen;
