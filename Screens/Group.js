import React from 'react'
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {useState, useEffect, useContext} from 'react';
import {Card, Title, FAB} from "react-native-paper";
import postdetails from './Postdetails';
import * as SecureStore from 'expo-secure-store';
import  {AuthContext}  from '../App'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialHeaderButtons } from './MyHeaderbutton';
import { Item } from 'react-navigation-header-buttons';

const Tab = createMaterialTopTabNavigator();
export default function MyTabs({navigation}) {
    const [{signUp}, state] = React.useContext(AuthContext);
    
    console.log(state.username)
    console.log(state.school)

function Group() {
    
    const [data,setData] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("");
    function createGroup(){
        setModalVisible(!modalVisible) 
        fetch(`http:/192.168.86.141/creategroup`,{
            method:"POST",
            headers:{  
                'Content-Type':"application/json",
              },
              body: JSON.stringify({'name':text,'school':state.school,'username':state.username})
        })
        navigation.navigate('Groupdetails',{'name':text})
    }
    React.useLayoutEffect(() => {
      navigation.setOptions({
        // use MaterialHeaderButtons with consistent styling across your app
        headerRight: () => ( 
          <MaterialHeaderButtons>
            <Item title="..." onPress={() => onPress()} />
            <Item title="profile" onPress={() => navigation.navigate("Profile")} />
          </MaterialHeaderButtons>
        ),
      });
    }, [navigation]);

    function addusertogroup(name){
        fetch(`http:/192.168.86.141/addusertogroup`,{
            method:"POST",
            headers:{  
                'Content-Type':"application/json",
              },
              body: JSON.stringify({'username':state.username,'school':state.school,'name':name})
        })
        
        console.log(name)
    }
    const loadData = ()=>{
        fetch(`http:/192.168.86.141/getgroups`,{
            method:"POST",
            headers:{  
                'Content-Type':"application/json",
              },
              body: JSON.stringify({'username':state.username,'school':state.school})
        })
        
        .then(data =>{
            setData(data)
            console.log(data)
         })
        .catch(error => Alert.alert("error"))
    }
    useEffect(()=>{
        fetch(`http:/192.168.86.141/getgroups`,{
            method:"POST",
            headers:{  
                'Content-Type':"application/json",
              },
              body: JSON.stringify({'username':state.username,'school':state.school})
        })
        .then(resp=>resp.json())
        .then(data =>{
            setData(data)
            console.log(data)
         })
        .catch(error => Alert.alert("error"))
     },[])
     const renderdata = (item) =>{
         
        return (  
        <Card style={styles.cardStyle}>
          <View style={{flexDirection:'row', margin:15}}>
        
        <Text style = {{fontSize:25, marginRight:75}}>{item.name}</Text> 
        <Button
        title="Join group"
       
        onPress={()=>{
           addusertogroup(item.name)
           navigation.navigate('Groupdetails',{'name':item.name})
        }}
        />
        </View>
        </Card>
        )}
    if(data){
    return (
        <View style={{flex:1}}>
         <FlatList
            data = {data}
            renderItem={({item})=>{
                return renderdata(item)
            }}
           

            keyExtractor={item=>`${item.id}`}
        />
        

        <FAB
            style = {styles.fab}
            small = {false}
            icon = "plus"
            onPress={() => setModalVisible(!modalVisible)}  
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
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
  <Text style={{margin:5,padding:5}}>X</Text>
</Pressable> 
          <View style={styles1.modalView}>
              <TextInput
            maxLength={40}
         placeholder="Create Group"
         multiline
         numberOfLines={4}
    style={{margin:50,
       paddingHorizontal:20,
       justifyContent: 'center',
       borderWidth: 1,             
   }}

   onChangeText={onChangeText}
   value={text}
      />  
          
              <Pressable
              style={[styles1.button, styles1.buttonClose]}
              onPress={() => { createGroup()}}
            >
              <Text style={styles1.textStyle}> Create Group</Text>
            </Pressable>
            
          </View>

        </View>
        
           

      </Modal>
      
        </View>
    )
        }else{
            return(

                <View><Text>There are not any groups in this school, try creating one :)</Text></View>
            )
        }   

         
}
function AllGroup() {
    const [data,setData] = useState("")
    const loadData = ()=>{
        fetch(`http:/192.168.86.141/groupsfromuser`,{
            method:"POST",
            headers:{  
                'Content-Type':"application/json",
              },
              body: JSON.stringify({'username':state.username,'school':state.school})
        })
        
        .then(data =>{
            setData(data)
            console.log(data)
         })
        .catch(error => Alert.alert("error"))
    }
    useEffect(()=>{
        fetch(`http:/192.168.86.141/groupsfromuser`,{
            method:"POST",
            headers:{  
                'Content-Type':"application/json",
              },
              body: JSON.stringify({'username':state.username,'school':state.school})
        })
        .then(resp=>resp.json())
        .then(data =>{
            setData(data)
            console.log(data)
         })
        .catch(error => Alert.alert("error"))
     },[])
     const renderdata = (item) =>{
        return (  
        <Card style={styles.cardStyle}  onPress={()=> {navigation.navigate('Groupdetails',{'name':item.name})}}>
        <Text style = {{fontSize:8}}>{item.username}</Text>
        <Text style = {{fontSize:25}}>{item.name}</Text> 
        </Card>
        )}
    if(data){
    return (
        <View style={{flex:1}}>
         <FlatList
            data = {data}
            renderItem={({item})=>{
                return renderdata(item)
            }}
           

            keyExtractor={item=>`${item.id}`}
        />

       
        </View>
    )
        }else{
            return(

                <View><Text>There are no groups in this school :( how about you creat eone</Text></View>
            )
        }   
}
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

const styles = StyleSheet.create({
    cardStyle: {
      margin: 10,
      padding: 10,
      borderRadius:25
      
    },  
    fab: {
        position:"absolute",
        margin:16,
        right:0,
        bottom:0,
        backgroundColor:"blue"
    }
  }); 
  

    return (
      <Tab.Navigator>
        <Tab.Screen name="All" component={Group} />
        <Tab.Screen name="Joined" component={AllGroup} />
        
      </Tab.Navigator>
    );
    }

