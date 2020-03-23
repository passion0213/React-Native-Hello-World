import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet, AsyncStorage, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ApiObject from './Api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:"",
        id_card:"",
        phone:"",
        sms_code:"",
        pwd:"",
        confirm_pwd:"",
    };
  }

  async Registeration(){
    if(this.state.name==""){
        alert("请输入真实姓名")
    } else if(this.state.id_card ==""){
        alert("请输入18位身份证号码")
    } else if(this.state.phone ==""){
        alert("请输入手机号")
    } else if(this.state.sms_code ==""){
        alert("请输入手机验证码")
    }else if(this.state.pwd ==""){
        alert("请输入密码")
    }else if(this.state.confirm_pwd ==""){
        alert("请输入确认密码")
    } else if(this.state.pwd != this.state.confirm_pwd){
        alert("密码和确认密码不同")
    } else{
        var submitData = {
            name: this.state.name,
            id_card: this.state.id_card,
            phone: this.state.phone,
            sms_code: this.state.sms_code,
            pwd: this.state.pwd,
            confirm_pwd: this.state.confirm_pwd
        }
        const result  = await ApiObject.registerationApi(submitData);
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
        <ImageBackground source={require('./Images/bgdImage.png')} resizeMode={"stretch"} style={{width: '100%', height:'100%'}}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity style={{position:'absolute', left:15, width:25, height:25, justifyContent:'center'}} onPress={()=>{this.props.navigation.navigate("Login")}}>
                            <Image source={require('./Images/back.png')} resizeMode='stretch' style ={styles.backIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerTxt}>注册</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.contentItem}>
                            <Image source={require('./Images/nameIcon.png')} resizeMode='stretch' style ={{height:18.5, width:16.5}} />
                            <TextInput placeholder="填写真实姓名" placeholderTextColor='#B6C2CE' style={styles.inputArea} onChangeText={(txt)=>{this.setState({name:txt})}}></TextInput>
                        </View>
                        <View style={styles.contentItem}>
                            <Image source={require('./Images/bodyIcon.png')} resizeMode='stretch' style ={{height:16, width:19}} />
                            <TextInput placeholder="18位身份证号码" placeholderTextColor='#B6C2CE' style={{width:'100%', marginLeft:10, fontSize:14}} onChangeText={(txt)=>{this.setState({id_card:txt})}}></TextInput>
                        </View>
                        <View style={styles.contentItem}>
                            <Image source={require('./Images/phoneIcon.png')} resizeMode='stretch' style ={{height:21, width:15}} />
                            <TextInput keyboardType='number-pad' placeholder="填写手机号" placeholderTextColor='#B6C2CE' style={styles.inputArea} onChangeText={(txt)=>{this.setState({phone:txt})}}></TextInput>
                        </View>
                        <View style={styles.contentItem}>
                            <Image source={require('./Images/numberIcon.png')} resizeMode='stretch' style ={{height:16, width:25, marginLeft:-4}} />
                            <TextInput placeholder="手机验证码" placeholderTextColor='#B6C2CE' style={{width:'70%', marginLeft:10, fontSize:14}} onChangeText={(txt)=>{this.setState({sms_code:txt})}}></TextInput>
                            <TouchableOpacity style={styles.sendBtn}>
                                <Text style={{color:'#FF9559', fontSize:12}}>发送验证码</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentItem}>
                            <Image source={require('./Images/pwdIcon.png')} resizeMode='stretch' style ={{height:18, width:16}} />
                            <TextInput placeholder="6-20位登录密码" placeholderTextColor='#B6C2CE' style={styles.inputArea} onChangeText={(txt)=>{this.setState({pwd:txt})}}></TextInput>
                        </View>
                        <View style={styles.contentItem}>
                            <Image source={require('./Images/pwdIcon.png')} resizeMode='stretch' style ={{height:18, width:16}} />
                            <TextInput placeholder="再次确认密码" placeholderTextColor='#B6C2CE' style={styles.inputArea} onChangeText={(txt)=>{this.setState({confirm_pwd:txt})}}></TextInput>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <LinearGradient
                        style={styles.LinearGradient}
                        colors={['#3298FE', '#146EF5']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                            <TouchableOpacity style={styles.bottomBtn} onPress={()=>{this.Registeration()}}>
                                <Text style={{fontSize:18, color:'#fff'}}>立即注册</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <Text style={styles.bottomTxt}> 注册即代表您同意<Text style={{color:'#424D56'}}>《英才伴学注册协议》</Text></Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        width:'100%',
        marginTop:20
    },
    backIcon:{
        width:10.5, 
        height:20
    },
    headerTxt:{
        color:'#424D56',
        fontSize:19,
        fontWeight:'bold'
    },
    content:{
        width:'85%',
        marginTop:48.5,
    },
    contentItem:{
        flexDirection:'row', 
        width:'100%', 
        alignItems:"center", 
        borderBottomWidth:1, 
        borderBottomColor:'#D9E2E9',
        marginTop:10
    },
    sendBtn:{
        backgroundColor:'#FFF8EF',
        height:23,
        borderRadius:5,
        position:'absolute',
        right:5,
        justifyContent:'center'
    },
    bottom:{
        marginTop:45,
        width:'85%',
        justifyContent:'center',
        alignItems:'center'
    },
    bottomBtn:{
        width:'100%',
        height:44,
        borderRadius:22,
        justifyContent:'center',
        alignItems:'center',
        elevation: 20,
        shadowOpacity: 0.2,
        shadowRadius: 20,
        shadowOffset: {
        width: 1,
        height: 1
        }
    },
    LinearGradient:{
        width:'100%',
        height:44,
        borderRadius:22,
    },
    bottomTxt:{
        marginTop:41.5,
        color:'#B6C2CE',
        fontSize:13
    },
    inputArea:{
        width:'100%', 
        marginLeft:15, 
        fontSize:14
    },
    bottomImage:{
        position:'absolute',
        bottom:0,
        width:'100%',
        height:52.85
    }
});
