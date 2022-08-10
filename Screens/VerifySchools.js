import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import  {AuthContext}  from '../App'
import * as SecureStore from 'expo-secure-store';



WebBrowser.maybeCompleteAuthSession(); 

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();
  const [school, setSchool] = React.useState();
  const [{setToken}, state] = React.useContext(AuthContext);
  const localimage = require("../assets/Verify.png")
  const localimage1 = require("../assets/schoolyard.png")

  const navigation = useNavigation();
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result
    } else {
      return none
    }
  }
  React.useEffect(()=>{
  var refreshtoken = getValueFor("refreshtoken")
  var accesstoken = getValueFor("accesstoken")
  console.loe(refreshtoken)
  console.log(accesstoken)
  setToken({refreshtoken,accesstoken})})
  
  


  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "327267302325-c6entis7ms45pc3jul2l57rj9psovhft.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  React.useEffect(()=>{

  })
  
  async function Verify(email){
   async function VerifySchool1(emaillol){
        
    return fetch("http:/192.168.29.189/verifyschool/",{
      method:"POST",
      headers:{ 
        'Content-Type':"application/json"
      },
      body: JSON.stringify({'email':emaillol})
      
    }).then(response => response.json());
  }
  const schoolverified = await VerifySchool1(email);
  console.log(schoolverified)
  if (schoolverified.length === 0){
    console.log("does no exist ser")
    Alert.alert("Seems like a school with that email does not exist")
  }else{
  setSchool(schoolverified)
  navigateSchool(schoolverified, email)
}
} 
  
function navigateSchool(schools, email1){
   if (schools.length >=2){
    navigation.navigate('SelectSchool',{email:email1, school:schools})

   }else{
   
   navigation.navigate('Age',{email:email1, school:schools})
   }
   
}
 

  React.useEffect(() => {
      if (accessToken){
        
        getUserData()
      }
    }, [accessToken]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    })

    userInfoResponse.json().then(data => {
  
      setUserInfo(data)
     
      Verify(data.email)
    })

    
  }



  return (
    <ImageBackground  source = {localimage} style={{ backgroundColor: '#FFFFFF', height:'100%'}}>
      
    <Image style={{marginTop:160,marginLeft:50}}source={localimage1}/>
      <Text style={{marginLeft:70, marginTop:35, fontWeight: 'bold' }}>Sign in with your school email below ↓</Text>
     
                <TouchableOpacity 
        style={{alignItems: "center",
    backgroundColor: "#5780FA",
    borderRadius:10,
    padding: 10,
    height:52, margin:10}}
        onPress={()=> {promptAsync({ showInRecents: true})}}
      >
        <Text style={{marginTop:8, color:"white"}}>Find your School</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={{alignItems: "center",
    backgroundColor: "#5780FA",
    borderRadius:10,
    padding: 10,
    height:52, 
  margin:10}}
        onPress={()=> {navigation.navigate("SignInScreen")}}
      >
        <Text style={{marginTop:8, color:"white"}}>Already have an account? Log In</Text>
      </TouchableOpacity>
     
      <StatusBar style="auto" />
    </ImageBackground>
  );

  
}
