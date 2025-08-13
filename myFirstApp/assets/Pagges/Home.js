import { Button, Text, View } from "react-native";

export default function Home({navigation}){

    return(
        <View style={{}}>
            <Text>Home Page</Text>
            <Button title="About" onPress={()=>navigation.navigate("About")}>About</Button>
        </View>
    );
}