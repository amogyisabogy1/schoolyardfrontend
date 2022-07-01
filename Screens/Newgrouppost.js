import React , {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from "../App"

function Newgrouppost({navigation, route}) {
 const [{signUp}, state] = React.useContext(AuthContext);
 const name = route.params.name
 console.log(state.username)
 console.log(state.username)
 console.log(state.username)
 console.log(state.username)
 const [title,setTitle] = useState()
 

    
 const insertData = () =>{
    fetch("http:/192.168.86.141/addposttogroup/",{
        method:"POST",
        headers : { 
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({title:title, username:state.username, school:state.school, name:name})
    })
    
    
 }
    return (
        <View>
            <TextInput style = {styles.inputStyle}
                    label="New Post"
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
                    onPress={()=> insertData()}>Post
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
export default Newgrouppost
