import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList , SectionList,SafeAreaView} from 'react-native';
import {Button, Card} from "react-native-paper"
import  {AuthContext}  from '../App'
import { useNavigation } from '@react-navigation/native';
import Comment from './comment';



function Bio(props) {
  const biop = props.route.params.bioprop
  const [bioprop, setprop] = React.useState(biop)
  const [{signOut}, state] = React.useContext(AuthContext); 
  console.log(bioprop)
  function EditBio(){
    fetch(`http:/192.168.86.141/bio/`,{
      method:"POST",
      headers : { 
          "Content-Type":"application/json",
      },     
      body: JSON.stringify({ school:state.school,title:bioprop, username:state.username})
  })
  .then(()=>{props.navigation.navigate("Profile")});
  }
    
  return (
  <View style={{height:"100%"}}>
    <View>
    <TextInput
    maxLength={140}
    style={{margin:5,
      paddingHorizontal:20,
      justifyContent: 'center',
      borderWidth: 1,             
  }}
    
    value={bioprop}
    onChangeText = { (text) => {
      setprop(text)
      
      }}
    multiline={true}
    numberOfLines={10} 
    />

    <Button 
    style = {{marginTop:29}}
      icon = "pencil"
      mode = "contained"
      onPress={()=>{ EditBio()}}>edit bio
   </Button>
   </View>

   <View>
   <Button 
    style = {{marginTop:29}}
      icon = "pencil"
      mode = "contained"
      onPress={()=>{ signOut()}}>Sign out
   </Button>
   </View>
  </View>
  )
}

export default Bio