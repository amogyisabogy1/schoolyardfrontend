import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList , SectionList,SafeAreaView} from 'react-native';
import {Button, Card, TextInput} from "react-native-paper"
import  {AuthContext}  from '../App'
import { useNavigation } from '@react-navigation/native';
import Comment from './comment';


function Edit(props) {
 const data = props.route.params.data
 const [{signUp}, state] = React.useContext(AuthContext);
 console.log(state.username)
 console.log(state.username)
 console.log(state.username)
 console.log(state.username)
 const [title,setTitle] = useState(data.title)
 
 const insertData = () =>{
        
    fetch(`http:/192.168.86.141/Edit/`,{
        method:"POST",
        headers : { 
            "Content-Type":"application/json",
        },     
        body: JSON.stringify({text:title, id:data.id})
    })
    .then(()=>{
        data.title = title
        props.navigation.navigate('detail',{data:data})
    
    })
    
 }

    

 
    return (
        <View>
            <TextInput style = {styles.inputStyle}
            maxLength={500}
                    label="Edit Post"
                    value = {title}
                    mode = "outlined"
                    multiline
                    numberOfLines={11}

                    onChangeText = { (text) => {
                    setTitle(text)
                    
                    }}

                />
                <Button
                    icon = "pencil"
                    mode = "contained"
                    onPress={()=> insertData()}>Edit
                </Button>
                
         </View>
        
    )
}
const styles = StyleSheet.create({
    inputStyle:{
        margin:50,
        paddingHorizontal:20,
        justifyContent: 'center',
    },
    cardStyle: {
        margin: 10,
        padding: 10,
        
      }
})
export default Edit
