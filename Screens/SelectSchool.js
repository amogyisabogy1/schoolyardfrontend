import React from 'react';
import { StyleSheet, View, Text, Image, Button, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Card, Title, FAB} from "react-native-paper";
import { NavigationHelpersContext } from '@react-navigation/native';

export default function SelectSchool(props) {
  const school = props.route.params.school;
  console.log(school)
  const email = props.route.params.email;
  console.log(email)
  console.log(school)
  console.log(school)
  console.log(school)
  

  
 const openItem = (data)=>{
   props.navigation.navigate('Register',{school:data.name,email:email})
 }

  

  const renderdata = ( item ) => {
   

    return (
        <Card onPress={()=> openItem(item)} style={{marginTop:15}}>
            <Text>{item.name}</Text>
        </Card>
    )
      
  };



    return (
        <View style={{height:'100%'}}>
          <Text>Select your school from the list below:</Text>
           <FlatList
             
             data = {school}
             renderItem={({item})=>{
                 return renderdata(item)
             }}
             keyExtractor={item=>`${item.id}`}
         />



        </View>
    );
}
