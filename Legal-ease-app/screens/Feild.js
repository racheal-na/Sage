import { TextInput, View } from "react-native";
import { darkBlue } from "./cl";


export default function Field(props){

    return(
       <TextInput{...props} style={{borderRadius:100,
        color: darkBlue,paddingHorizontal:10
       }} placeholderTextColor={darkBlue}>

       </TextInput>
    );
}