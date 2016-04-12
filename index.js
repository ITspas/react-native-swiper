'use strict'
import React, {
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    View,
    Image
}
from 'react-native';

let {
    width, height
} = Dimensions.get('window');

export default class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginLeftAnim: 0
        };
        this._index = 0;
        this._childrenLen = this.props.children && this.props.children.length || 1;
        this._maxWidth = this._childrenLen * width;
        this._maxMarginLeft = this._maxWidth - width;
        this._marginLeft = 0;
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: e => true,
            onMoveShouldSetPanResponder: e => true,
            onPanResponderMove: (e, g) => {
                this._marginLeft = g.dx + (-this._index * width);
                this._marginLeft > 0 && (this._marginLeft = 0);
                this._marginLeft < (-this._maxMarginLeft) && (this._marginLeft = -this._maxMarginLeft);
                this.setState({
                    marginLeftAnim: this._marginLeft
                });
            },
            onPanResponderRelease: (e, g) => {
                this._index = Math.abs(Math.round(this._marginLeft / width));
                this.setState({
                    marginLeftAnim: new Animated.Value(this._marginLeft)
                });
                Animated.spring(
                    this.state.marginLeftAnim,
                    {
                        toValue: -this._index * width
                    },
                ).start();
            }
        })
    }
    render() {
        return (
            <Animated.View
                {...this._panResponder.panHandlers}
                ref={e=>this._view = e}
                style={[{height:this.props.height,width:this._maxWidth,flexDirection:'row',marginLeft:this.state.marginLeftAnim}]}>
                {this.props.children.map((v,k)=>{
                    return <View key={k} style={{flex:1}}>{v}</View>
                })}
            </Animated.View>
        );
    }
}