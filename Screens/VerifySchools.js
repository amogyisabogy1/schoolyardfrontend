import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';


WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();
  const [school, setSchool] = React.useState();
  const localimage = require("../assets/schoolyardbg1.png")

  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "327267302325-c6entis7ms45pc3jul2l57rj9psovhft.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);
  
  async function Verify(email){
   async function VerifySchool1(emaillol){
        
    return fetch("http:/192.168.86.141/verifyschool/",{
      method:"POST",
      headers:{ 
        'Content-Type':"application/json"
      },
      body: JSON.stringify({'email':emaillol})
      
    }).then(response => response.json());
  }
  const schoolverified = await VerifySchool1(email);
  console.log(schoolverified)

  setSchool(schoolverified)
  navigateSchool(schoolverified, email)
} 
  
function navigateSchool(schools, email1){
   if (schools.length >=2){
    navigation.navigate('SelectSchool',{email:email1, school:schools})

   }else{
    const schools1 = school.slice(2, length);
   
   navigation.navigate('Register',{email:email1, school:schools})
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
      
      <Image
      style={{justifyContent:'center', marginLeft:60, marginTop:105}}
        source={  require("../assets/schoolyard.png")}
      />
      
      <Button
                    mode = "contained"
                    onPress={()=> {promptAsync({ showInRecents: true})}}
                    style={{margin:10, marginTop:195}}>Find your school
                </Button>
      <Button
                    mode = "contained"
                    onPress={()=> {navigation.navigate("SignInScreen")}}
                    style={{margin:2 ,marginTop:5}}>Already have an account?Sign in 
                </Button>
     
      <StatusBar style="auto" />
    </ImageBackground>
  );

  
}
