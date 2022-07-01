import react from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, TouchableOpacity, TextInput } from 'react-native';
import {Card, Title, FAB} from "react-native-paper";
import postdetails from './Postdetails';
import * as SecureStore from 'expo-secure-store';
import  {AuthContext}  from '../App'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';




function GroupDetails({route, navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("");
    const [{signUp}, state] = React.useContext(AuthContext);
    console.log(state.username)
    console.log(state.school)   
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(true)
    const name = route.params.name
    
    function loadData1(){
      console.log(state.school)
      fetch(`http:/192.168.86.141/postsfromgroup`,{
          method:"POST",
          headers:{  
              'Content-Type':"application/json",
            },
          body: JSON.stringify({'name':name,'school':state.school})
      })
      .then(resp => resp.json())
      .then(data =>{
          setData(data)
          setLoading(false)
       })
      
      .catch(error => Alert.alert("error"))

  }


    const loadData = () => {
      console.log(state.school)
      fetch(`http:/192.168.86.141/postsfromgroup`,{
          method:"POST",
          headers:{  
              'Content-Type':"application/json",
            },
          body: JSON.stringify({'name':name,'school':state.school})
      })
      .then(resp => resp.json())
      .then(data =>{
          setData(data)
          setLoading(false)
       })
      
      .catch(error => Alert.alert("error"))

  }
    const insertData = () =>{
        setModalVisible(!modalVisible)
        fetch("http:/192.168.86.141/addposttogroup/",{
            method:"POST",
            headers : { 
                "Content-Type":"application/json",
            }, 
            body: JSON.stringify({title:text, username:state.username, school:state.school, name:name})
            

        })
        
         loadData1()
     }
  
   
    const openItem = (data) => {
        navigation.navigate("detail", {data:data, group:name})
    }
    useEffect(()=>{
       fetch(`http:/192.168.86.141/postsfromgroup`,{
            method:"POST",
            headers:{  
                'Content-Type':"application/json",
              },
            body: JSON.stringify({'name':name,'school':state.school})
        })
        .then(resp => resp.json())
        .then(data =>{
            setData(data)
            setLoading(false)
         })
     },[])
     const renderdata = (item) =>{
      console.log(item.id)
      console.log(item.id)
      const IconButton = ({ title, icon, item }) => (
        <TouchableOpacity style={styles.button} onPress={()=>{onPress(item.id)}}>
          <View justifyContent="row">
           <Text>{title}</Text>
           <Ionicons name={icon}  color="red"  />
          </View>
        </TouchableOpacity>
      );
      return (  
      
      <Card style={styles.cardStyle}  onPress={()=> openItem(item)}>
      <Text style = {{fontSize:8}}>{item.username}</Text>
      <Text style = {{fontSize:25}}>{item.title}</Text> 
      <Text style = {{fontSize:8, justifyContent:'center', paddingLeft:85}}>{item.numberofcomments==1 ? <Text style = {{fontSize:12}}>{item.numberofcomments} comment</Text>  : <Text style = {{fontSize:12}}>{item.numberofcomments} comments</Text> }</Text> 
      
      <IconButton title="Report" item={item} icon="flag" />
      </Card>
      
      )}
    return (
        <View style={{flex:1}}>
         <FlatList
            data = {data}
            renderItem={({item})=>{
                return renderdata(item)
            }}
            onRefresh={() => loadData()}
            refreshing = {loading}
            keyExtractor={item=>`${item.id}`}
        />

        <FAB
            style = {styles.fab}
            small = {false}
            icon = "plus"

            onPress={() => {setModalVisible(!modalVisible)}}
        />
  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles1.centeredView}>
        
          
          <View style={styles1.modalView}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
  <Text style={{marginTop:5,padding:5}}>X</Text>
</Pressable> 
              <TextInput
              maxLength={500}
              multiline
              numberOfLines={4}
              placeholder="Enter your post"
         style={{margin:5,
            paddingHorizontal:20,
            justifyContent: 'center',
            borderWidth: 1,             
        }}

        onChangeText={onChangeText}
        value={text}
      />  
          
              <Pressable
              style={[styles1.button, styles1.buttonClose]}
              onPress={() => { insertData() }}
            >
              <Text style={styles1.textStyle}> New post</Text>
            </Pressable> 
            
          </View>

        </View>
        
           

      </Modal>
        </View>
        
       
    )
}

const styles = StyleSheet.create({
    cardStyle: {
      margin: 10,
      padding: 10,
      
    },  
    fab: {
        position:"absolute",
        margin:16,
        right:0,
        bottom:0,
        backgroundColor:"blue"
    }
  });
  const styles1 = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });







export default GroupDetails
