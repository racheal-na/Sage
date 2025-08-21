import React from "react";
import { Text, View,Image } from "react-native";


export default function Fallback(){

    return(
        <View style={{alignItems: "center"}}>
           <Image 
           source={require("../../assets/todo.jpeg")} 
           style={{height: 200, width:300}}
           />
           <Text>Start Adding Your Task</Text>
        </View>


    );
}