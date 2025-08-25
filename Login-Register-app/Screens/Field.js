import { TextInput, View } from "react-native";
import { darkGreen } from "./Welcome";


export default function Field(props){

    return(
       <TextInput{...props} style={{borderRadius:100,
        color: darkGreen,paddingHorizontal:10,backgroundColor:"rgb(220,220,220)",width:"80%"
       }} placeholderTextColor={darkGreen}>

       </TextInput>
    );
}