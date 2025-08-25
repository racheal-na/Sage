import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen, green } from "./Welcome";

export default function Home({ navigation }) {
    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.title}>Naba</Text>
                <Text style={styles.subtitle}>Fiber Glass Products</Text>
                <Btn 
                    bgColor={green} 
                    textColor="white" 
                    btnLabel="Login" 
                    Press={() => navigation.navigate("Login")}
                />
                <Btn 
                    bgColor="white" 
                    textColor={darkGreen} 
                    btnLabel="Signup" 
                    Press={() => navigation.navigate("Signup")}
                />
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40,
        marginVertical: 100,
        justifyContent: "center",
        flex: 1
    },
    title: {
        color: 'white', 
        fontSize: 45,
        marginBottom: 8
    },
    subtitle: {
        color: 'white', 
        fontSize: 40,
        marginBottom: 20
    }
});