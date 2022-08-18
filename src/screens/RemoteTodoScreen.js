import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const dheight = Dimensions.get('window').height;
const dwidth = Dimensions.get('window').width;

const colors = {
  themeColor: '#740b45',
  white: '#fff',
  background: '#f4f6fc',
  greyish: '#a4a4a4',
  tint: '#540832',
  green: '#c78aab',
  yellow: '#e3c0d5',
};

const RemoteTodoScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const getTodos = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
      );
      setData(response.data);
    } catch (err) {
      console.log(err);
      console.log('Somthing wrong');
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* heade */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTxt}>{`Remote Todo's\nFrom Api`}</Text>
      </View>
      {/* Bottm container */}
      <View
        style={{
          flex: 6,
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          padding: 10,
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={todoData => todoData.id}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={30}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('details', {
                    id: item.id,
                    status: item.completed,
                    task: item.title,
                  })
                }>
                <View
                  style={[
                    styles.row,
                    {
                      backgroundColor:
                        index % 2 === 0 ? colors.green : colors.yellow,
                    },
                  ]}>
                  <View style={{flex: 1, alignSelf: 'center'}}>
                    <Text style={styles.txtStyle}>{item.title}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                      <FontAwesome
                        name={item.completed ? 'check-circle' : 'hourglass-2'}
                        size={23}
                        style={{
                          color: item.completed ? 'green' : 'black',
                          marginRight: 1,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="delete"
                        size={30}
                        style={{color: 'black', marginRight: 1}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <FontAwesome5
                        name="edit"
                        size={25}
                        style={{color: 'black'}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#740b45',
  },

  headerContainer: {
    flex: 1,
    backgroundColor: '#740b45',
  },

  headerTxt: {
    color: 'white',
    fontSize: 30,
    marginLeft: 15,
    padding: 10,
  },
  txtStyle: {
    fontSize: 100,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    height: dheight * 0.13,
    marginVertical: 4,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  txtStyle: {
    fontSize: 19,
    fontWeight: '400',
    color: 'black',
  },
});

export default RemoteTodoScreen;
