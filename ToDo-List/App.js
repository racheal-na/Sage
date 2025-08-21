
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
;
import TodoScreen from './src/Screen/TodoScreen';

export default function App() {
  return (

<SafeAreaProvider>

    
            <SafeAreaView>

    <View >
     <TodoScreen/>
    </View>
</SafeAreaView>
  
</SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
