import React from "react";
import LottieView from "lottie-react-native";
import { Text,View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Splash(){
    const navigation = useNavigation()
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <LottieView
             source={require("../../assets/Animation.json")}
             style={{width: "100%", height: "100%"}}
             autoPlay
             loop={false}
             speed={0.5}
             onAnimationFinish={()=> navigation.navigate('Login')}
            />
        </View>
    )

}
