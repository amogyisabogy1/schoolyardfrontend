import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList,Button } from 'react-native';
import { Card} from "react-native-paper"
import  {AuthContext}  from '../App' 
import { useNavigation } from '@react-navigation/native';


function Commentdetail(props) {
    const id = props.route.params.id;
    const comment = props.route.params.comment
    const groupname = props.route.params.comment 
    const [data, setData] = React.useState("")
    const [{signUp}, state] = React.useContext(AuthContext);
    const [text, changeText] = React.useState(null);

    useEffect(()=>{
      fetch(`http:/192.168.86.141/snippets/${comment.postid}/`,{
        method:"GET"
      })
      .then(resp => resp.json())
      .then(data => {
        setData(data)
        console.log(data)   
      })    

    },[])
  
    const deletedData = (data) => {
      fetch(`http:/192.168.86.141/snippets/${comment.postid}/`,{
        method:"DELETE",
        headers: { 
          "Content-type":"application/json"
        }
      })
      .then(
        data =>{
          if (groupname){
          props.navigation.navigate('Postdetails',{name:data})
          }else{
          props.navigation.navigate("Home")
          }
        }
      )
    
    }
    const loadData = () =>{
      fetch(`http:/192.168.86.141/comment/${data.id}/`,{
        method:"GET"
      })
      .then(resp => resp.json())
      .then(data => {
        changeComment(data)
        console.log(comment)   
      })    

   }
    const addComment = () =>{
      fetch("http:/192.168.29.189omment/",{
          method:"POST",
          headers : {   
              "Content-Type":"application/json"
          },  
          body: JSON.stringify({text:text, postid:id, username:state.username, school:state.school})
      })
      .then(resp => resp.json())
      .then(()=>{loadData()})
      
      
   }
   const renderdata = (item) =>{
    return (  
    <Card style={styles.cardStyle} >
    <Text>{item.username}</Text>   
    <Text>{item.text}</Text> 
    </Card>
    )}

   return ( 
  
   <View>
    <View style = {styles.detailStyle}>
       <Card>
        <Text style = {{fontSize:10}}>{data.username}</Text>
        <Text style = {{fontSize:25}}>
          
          {data.title}
        </Text>
       </Card>
       <Button onPress={()=>{props.navigation.navigate("detail",{data:data})}}
  title="View All comments"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/>
    </View>
    <View>
    <Card style={styles.cardStyle} >
    <Text>{comment.username}</Text>   
    <Text>{comment.text}</Text> 
    </Card>
    </View>
   </View>
      
     
    )
}  

const styles = StyleSheet.create({ 

    detailStyle: {
        margin:10,
        padding:10,

    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      flex:3
    },
  commentStyle:{
    flexDirection:"row"
  },
  inputStyle:{
    height: 40,
    marginTop:12,
    flex:1
  },
  cardStyle:{
    margin:10,
    padding:10
  }

}) 



export default Commentdetail
