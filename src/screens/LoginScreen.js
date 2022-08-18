import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/actions/authAction';

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, SetPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={true}>
      <View style={{flex: 1, backgroundColor: '#740b45'}}>
        <View style={styles.head}>
          <Animatable.View animation="bounceIn" duration={3000}>
            <Foundation
              name="clipboard-pencil"
              size={100}
              style={{color: 'white'}}
            />
          </Animatable.View>
          <View>
            <Animatable.Text
              animation="bounceIn"
              duration={3000}
              style={styles.txtStyle}>
              TODO
            </Animatable.Text>
          </View>
        </View>
        <View style={styles.Bottom}>
          <View
            style={{flex: 4, marginTop: 30, padding: 10, alignItems: 'center'}}>
            <Text style={styles.TextLabel}>Email</Text>
            <View style={styles.inpContainer}>
              <FontAwesome name="user" size={30} style={styles.icon} />
              <TextInput
                placeholder="Email"
                value={name}
                onChangeText={txt => {
                  setName(txt);
                }}
                style={styles.txtInput}
              />
            </View>
            <Text style={styles.TextLabel}>Password</Text>
            <View style={styles.inpContainer}>
              <FontAwesome name="lock" size={30} style={styles.icon} />
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={txt => {
                  SetPassword(txt);
                }}
                style={styles.txtInput}
              />
            </View>

            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                height: '20%',
                justifyContent: 'flex-start',
              }}>
              <View style={{flex: 1, alignSelf: 'center', width: '70%'}}>
                <TouchableOpacity
                  onPress={() => {
                    if (name === 'hr@gmail.com' && password === '0000') {
                      dispatch(setUser(name, password)),
                        navigation.replace('main');
                    } else {
                      Alert.alert('Incorrect Credential');
                    }
                  }}
                  style={styles.btnStyle}>
                  <Text style={styles.txtStyle}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  txtInput: {fontSize: 20, fontWeight: '500'},

  btnStyle: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#740b45',
    marginHorizontal: 4,
    borderRadius: 22,
    borderWidth: 1,
    padding: 5,
  },
  txtStyle: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginRight: 10,
  },
  inpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ac7493',
    width: '90%',
    height: '10%',
    borderRadius: 20,
  },
  TextLabel: {
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: '500',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
  },
  icon: {color: 'black', marginLeft: '2%'},
  head: {
    flex: 1,
    backgroundColor: '#740b45',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    textAlignVertical: 'center',
  },
  Bottom: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
});

export default LoginScreen;
