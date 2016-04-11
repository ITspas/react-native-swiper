'use strict'
import React, {
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    View,
    Image
} from 'react-native';

let {width,height} =  Dimensions.get('window');

export default class Swiper extends React.Component {
    componentWillMount() {
        console.log('test');
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: e => true,
            onMoveShouldSetPanResponder: e => true,
            onPanResponderGrant: (e, g) => {

            },
            onPanResponderMove: (e, g) => {},
            onPanResponderRelease: (e, g) => {

            }
        })
    }
    render() {
        return (
            <Animated.View
                style={[{height:150,width:width * 2,backgroundColor:'red',flexDirection:'row'}]}>
                <View style={{flex:1}}>
                    <Image
                      style={{flex:1}}
                      source={{uri: 'http://www.iconpng.com/png/flaticon_user-set/woman48.png'}} />
                    
                </View>
                <View style={{flex:1}}>
                    <Image
                      style={{flex:1}}
                      source={{uri: 'http://www.iconpng.com/png/flaticon_user-set/woman48.png'}} />
                    
                </View>
            </Animated.View>
        );
    }
}