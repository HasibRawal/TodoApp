import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
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

import {useSelector, useDispatch} from 'react-redux';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
} from '../redux/actions/todoAction';
import {logOut} from '../redux/actions/authAction';

const LocalTodoScreen = ({navigation}) => {
  const todoData = useSelector(state => state.todoReducer);
  const dispatch = useDispatch();
  const [task, setTask] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [edittask, setEditTask] = useState('');
  const [editId, setEditId] = useState('');

  //opening the Modal
  const onPressEdit = item => {
    setIsModalVisible(true);
    setEditTask(item.task);
    setEditId(item.id);
  };

  //add logout button
  useLayoutEffect(() => {
    navigation.setOptions({
      showLabel: false,
      headerRight: () => (
        <TouchableOpacity
          style={styles.logoutCOntainer}
          onPress={() => {
            dispatch(logOut(), navigation.replace('login'));
          }}>
          <Text style={styles.signoutTxt}>SignOut</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    //parent view
    <SafeAreaView style={styles.ParentContainer}>
      {/* top view */}
      <View style={styles.topViewContainer}>
        <View style={styles.topChildView}>
          <AntDesign
            name="user"
            size={30}
            style={{color: colors.white, marginTop: 5}}
          />
          <Text style={{color: colors.white, fontSize: 30, marginLeft: 15}}>
            {'Hello,\nHasib Rawal'}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="grey"
            placeholder="Add Task"
            style={styles.input}
            value={task}
            onChangeText={text => setTask(text)}
          />
          <TouchableOpacity
            // testID="to"
            onPress={() => dispatch(addTodo(task), setTask(''))}>
            <AntDesign
              name="pluscircle"
              size={40}
              style={{color: colors.white}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* task conainer View */}
      <View style={styles.taskContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todoData}
          keyExtractor={todoData => todoData.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('details', {
                    id: item.id,
                    status: item.status,
                    task: item.task,
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
                    <Text style={styles.txtStyle}>{item.task}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => dispatch(toggleTodo(item.id))}>
                      <FontAwesome
                        name={item.status ? 'check-circle' : 'hourglass-2'}
                        size={23}
                        style={{
                          color: item.status ? 'green' : 'black',
                          marginRight: 1,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dispatch(deleteTodo(item.id))}>
                      <MaterialCommunityIcons
                        name="delete"
                        size={30}
                        style={{color: 'black', marginRight: 1}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPressEdit(item)}>
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
      {/* //Modal */}
      <Modal
        animationType="fade"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.editBoxModal}>
            <Text style={styles.editLabel}>Edit Task:</Text>
            <TextInput
              style={styles.modalTxtInp}
              defaultValue={edittask}
              editable={true}
              multiline={false}
              maxLength={200}
              onChangeText={txt => {
                setEditTask(txt);
              }}
            />

            <View style={styles.btnContain}>
              <TouchableOpacity
                style={styles.saveOpView}
                onPress={() => {
                  dispatch(editTodo(editId, edittask)),
                    setIsModalVisible(false);
                }}>
                <Text style={styles.btntxtStyle}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveOpView, {backgroundColor: 'grey'}]}
                onPress={() => {
                  setIsModalVisible(false);
                }}>
                <Text style={styles.btntxtStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ParentContainer: {flex: 1, backgroundColor: colors.themeColor},
  topChildView: {flexDirection: 'row', padding: 16},
  signoutTxt: {
    fontSize: 18,
    fontWeight: '500',
    padding: 4,
    color: 'white',
  },
  topViewContainer: {backgroundColor: colors.themeColor, height: dheight * 0.3},
  logoutCOntainer: {
    borderRadius: 25,
    backgroundColor: '#740b45',
    height: 40,
    width: 80,
  },
  modalTxtInp: {
    width: '90%',
    height: '30%',
    fontSize: 20,
    backgroundColor: '#B2BEB5',
    borderRadius: 20,
    padding: 10,
    color: 'black',
    fontWeight: '500',
  },
  editLabel: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
    paddingBottom: 20,
  },
  editBoxModal: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: colors.themeColor,
    borderRadius: 25,
  },
  btntxtStyle: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    color: 'white',
    fontWeight: '500',
    padding: 5,
  },

  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#B29CA2',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  btnContain: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  saveOpView: {
    width: dwidth * 0.4,
    height: dheight * 0.07,
    backgroundColor: 'grey',
    marginHorizontal: 4,
    borderRadius: 22,
    borderWidth: 1,
    padding: 5,
  },
  cancel: {
    width: dwidth * 0.4,
    height: dheight * 0.1,
    backgroundColor: 'rgba(0,0,0.2,0.8)',
  },
  txtStyle: {
    fontSize: 19,
    fontWeight: '400',
    color: 'black',
  },
  taskContainer: {
    flex: 1,
    backgroundColor: colors.background,
    height: dheight * 0.8,
    paddingTop: 12,
    paddingHorizontal: 15,
    borderTopLeftRadius: 50,
  },
  input: {
    width: dwidth * 0.7,
    height: dheight * 0.07,
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    height: dheight * 0.13,
    marginVertical: 4,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.tint,
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
});

export default LocalTodoScreen;
