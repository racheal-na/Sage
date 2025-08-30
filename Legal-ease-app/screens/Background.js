import { ImageBackground, View } from "react-native";

export default function Background({ children }) {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground 
                source={require("../assets/lw.jpg")} 
                style={{ 
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    {children}
                </View>
            </ImageBackground>
        </View>
    );
}