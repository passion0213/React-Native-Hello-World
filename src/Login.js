//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage, TouchableOpacity, TextInput, ImageBackground, Alert, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ApiObject from './Api';
// create a component
export default class MyClass extends Component {

  constructor() {
    super()
    this.state = {
      tabState: true,
      phone:"",
      sms_code:"",
      user_code:"",
      pwd:"",
    }
  }

  async sendSmsCode(){
    var submitData = {phone: this.state.phone}
    const result  = await ApiObject.sendSmsCodeApi(submitData);
    if(result == null){
      Alert.alert(
        [
            { text: 'Ok', onPress: () => console.log('Ok Pressed') }
        ],
        { cancelable: false },
      );
    }else{

    }
  }

  async verification(){
    var submitData = {
      phone: this.state.phone,
      sms_code: this.state.sms_code
    }
    const result  = await ApiObject.verificationSmsCodeApi(submitData);
    if(result == null){
      Alert.alert(
        [
            { text: 'Ok', onPress: () => console.log('Ok Pressed') }
        ],
        { cancelable: false },
      );
    }else{

    }
  }

  async Login(){
    if(this.state.phone == ''){
      alert("请输入手机号码")
    } else if(this.state.pwd == ''){
      alert("请输入密码")
    } else{
      var submitData = {
        user_code: this.state.user_code,
        pwd: this.state.pwd
      }
      const result  = await ApiObject.LoginApi(submitData);
      if(result == null){
        Alert.alert(
          [
              { text: 'Ok', onPress: () => console.log('Ok Pressed') }
          ],
          { cancelable: false },
        );
      }else{
        if (result.code == "20"){
          alert(result.msg);
          alert("服务器错误 "+result.code);
        }
      }
    }
  }

  render() {
    return (
      <View>
        <Image source={require('./Images/bgdImage.png')} style={{width: '100%', height:'100%', resizeMode:'stretch'}} />
        <View style={styles.container}>
          <View style={styles.logoArea}>
            <Image source={require('./Images/logo.png')} style={styles.logo} />
          </View>
          <View style={styles.inputForm}>
            <View style={styles.tabBarArea}>
              <TouchableOpacity style={styles.tabArea} activeOpacity={0.5} onPress={() => { this.setState({ tabState: true }) }}>
                <Text style={this.state.tabState ? styles.tab1 : styles.tab2}>登录</Text>
                {
                  this.state.tabState && (
                    <View>
                      <View style={styles.underline}></View>
                      <Image source={require('./Images/piece1.png')} style={{width:"100%"}} />
                    </View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabArea} activeOpacity={0.5} onPress={() => { this.setState({ tabState: false }) }}>
                <Text style={this.state.tabState ? styles.tab2 : styles.tab1}>快捷登录</Text>
                {
                  !this.state.tabState && (
                    <View>
                      <View style={styles.underline}></View>
                      <Image source={require('./Images/piece1.png')} style={{width:"100%"}}/>
                    </View>
                  )
                }
              </TouchableOpacity>
            </View>


            <View style={styles.inputArea}>
              {
                this.state.tabState ? (
                  <View>
                    <TextInput keyboardType='number-pad' placeholder="手机号码" placeholderTextColor="#A4AEBA" style={styles.inputTxt} onChangeText={(text)=>{this.setState({phone: text})}}/>
                    <TextInput placeholder="密码" placeholderTextColor="#A4AEBA" style={styles.inputTxt} onChangeText={(text)=>{this.setState({pwd: text})}}/>
                  </View>
                )
                  :
                  (
                    <View>
                      <View style={{flexDirection: 'row', alignItems: "center"}}>
                        <TextInput keyboardType='number-pad' placeholder="手机号码" placeholderTextColor="#A4AEBA" style={styles.inputTxt2} onChangeText={(text)=>{this.setState({phone: text})}} />
                        <TouchableOpacity onPress={()=>{this.sendSmsCode()}}>
                          <Text style={{color: '#FF9559'}}>发送验证码</Text>
                        </TouchableOpacity>
                      </View>
                      <TextInput placeholder="短信验证码" placeholderTextColor="#A4AEBA" style={styles.inputTxt} onChangeText={(text)=>{this.setState({sms_code: text})}}/>
                    </View>
                  )
              }
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={()=>{this.state.tabState? this.Login(): this.verification()}}>
              <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#3298FE', '#146EF5']}
                style={styles.linearGradient}>
                <View>
                  <Text style={styles.buttonText}>登录</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.forgotArea}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Registration')}}>
                <Text style={styles.forgot}>注册账号</Text>
              </TouchableOpacity>
              <Text style={styles.forgot}>|</Text>
              <TouchableOpacity>
                <Text style={styles.forgot}>忘记密码</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    width:'100%',
    flex: 1,
  },
  logo: {
    left: 26.5,
    top: 26
  },
  logoArea: {
    height: 130
  },
  inputForm: {
    width: '88%',
    marginLeft: '6%',
    // height: 300
  },
  tabBarArea: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  tabArea: {
    alignItems: "center",
  },
  tab1: {
    fontSize: 22.67,
    color: '#0096FF',
    fontWeight: '700',
    fontFamily: 'SourceHanSansCN-Medium'
  },
  tab2: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 20,
    fontFamily: 'SourceHanSansCN-Medium',
  },
  underline: {
    width: 9.95,
    height: 3,
    backgroundColor: '#0096FF',
    borderRadius: 1.5,
    marginTop: 5,
    marginBottom: 1
  },
  inputArea: {
    width: '100%',
    height: 184.5,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 20,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {
      width: 1,
      height: 1
    },
    marginBottom: 20
  },
  inputTxt: {
    width: '88%',
    marginLeft: '6%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
    marginVertical: 10
  },
  inputTxt2: {
    width: '60%',
    marginLeft: '6%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
    marginVertical: 10
  },
  linearGradient: {
    height: 42.5,
    borderRadius: 22,
    width: '88%',
    marginLeft: '6%',
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: '#3298FE',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
  btn: {
    marginTop: -40,
    elevation: 21
  },
  forgot: {
    color: '#0096FF',
    fontSize: 16,
    fontWeight: '700'
  },
  forgotArea: {
    flexDirection: 'row',
    margin: 21.5,
    alignItems: "center",
    justifyContent: "space-around",
    width: '50%',
    alignSelf: "center"
  },

});