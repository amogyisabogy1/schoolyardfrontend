import react from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, TouchableOpacity, ImageBackground, TextInput} from 'react-native';
import {Card, Title, FAB} from "react-native-paper"; 
import postdetails from './Postdetails';
import * as SecureStore from 'expo-secure-store';
import  {AuthContext}  from '../App'
import { useNavigation } from '@react-navigation/native';
import { MaterialHeaderButtons } from './MyHeaderbutton';
import { Item } from 'react-navigation-header-buttons';
import { useIsFocused } from '@react-navigation/native'



function Home({props, navigation}) {
    const isFocused = useIsFocused()
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("");
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(true)
    const [{signUp}, state] = React.useContext(AuthContext);
    const localimage = require("../assets/schoolyardbg.png")

    
    React.useLayoutEffect(() => {
      navigation.setOptions({
        // use MaterialHeaderButtons with consistent styling across your app
        headerRight: () => ( 
          <MaterialHeaderButtons>
            <Item title="add" iconName="search" onPress={() => console.warn('add')} />
            <Item title="profile" onPress={() => navigation.navigate("Profile")} />
          </MaterialHeaderButtons>
        ),
      });
    }, [navigation]);
    const loadData = () => {
      
      console.log(state.school)
      fetch(`http:/192.168.86.141/vent/`,{
        method:"POST",
        headers : { 
            "Content-Type":"application/json",
        },     
        body: JSON.stringify({school:state.school})
    })
    .then(resp => resp.json())
    .then(data =>{
        setData(data)
     })
    

  }
    const insertData = () =>{
        
        setModalVisible(!modalVisible)
        fetch(`http:/192.168.86.141/addposttovent/`,{
            method:"POST",
            headers : { 
                "Content-Type":"application/json",
            },     
            body: JSON.stringify({title:text, username:state.username, school:state.school})
        })
        
         loadData()
     }
  
   
    const openItem = (data) => {
        navigation.navigate("detail", {data:data, anonymous:true})
    }
    useEffect(()=>{

      fetch(`http:/192.168.86.141/vent/`,{
        method:"POST",
        headers : { 
            "Content-Type":"application/json",
        },     
        body: JSON.stringify({school:state.school})
    })
    .then(resp => resp.json())
    .then(data =>{
        setData(data)
        setLoading(false)
     })
     },[]) 
    
    const renderdata = (item) =>{
        return (  
        <Card style={styles.cardStyle}  onPress={()=> openItem(item)}>
        <Text style = {{fontSize:25}}>{item.title}</Text> 
        </Card>
        )}
    return (
        <ImageBackground source={localimage} style={{flex:1}}>
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
            theme = {{colors:{accent:"blue"}}}
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
  <Text style={{margin:5,padding:5}}>X</Text>
</Pressable> 
              <TextInput
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
              <Text style={styles1.textStyle}>  Post</Text>
            </Pressable> 
            
          </View>

        </View>
        
           

      </Modal>
        </ImageBackground>
        
       
    )
}

const styles = StyleSheet.create({
    cardStyle: {
      margin: 10,
      padding: 10,
      backgroundColor: "#ffe4c4"
      
    },  
    fab: {
        position:"absolute",
        margin:16,
        right:0,
        bottom:0,
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



export default Home
