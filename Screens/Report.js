import React from 'react'
import {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, TouchableOpacity, ImageBackground, TextInput, Image} from 'react-native';
import {Card, Title, FAB} from "react-native-paper"; 

function Report(props) {
  const postid = props.route.params.postid;
  console.log("hi")
  console.log(postid) 

  return (
    <View>
        <Text>Thanks for looking out for yourself and other users of Schoolyard. Please select a category to continue.</Text>
        <Button
                    mode = "contained"
                    onPress={()=> {promptAsync({ showInRecents: true})}}
                    style={{margin:10, marginTop:195}}>Find your school
                </Button>
    </View>
  )
}

export default Report