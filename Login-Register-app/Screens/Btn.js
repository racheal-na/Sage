import { useLinkProps,navigate } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Btn({ bgColor, btnLabel, textColor,Press}) {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center',marginVertical: 10,gap:20}}>
            <TouchableOpacity 
               onPress={Press}
                style={{
                    backgroundColor: bgColor,
                    borderRadius: 100,
                    justifyContent:'center',
                    alignItems: 'center',
                    width: 250,
                    paddingVertical: 12,
                    paddingHorizontal: 20
                }}
            >
                <Text style={{
                    color: textColor,
                    fontSize: 22, 
                    fontWeight: 'bold'
                }}>
                    {btnLabel}
                </Text>
            </TouchableOpacity>

            
        </View>
    );
} 