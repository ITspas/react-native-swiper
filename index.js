'use strict'
import React, {
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    View,
    Image,
    TouchableOpacity
}
from 'react-native';

let {
    width, height
} = Dimensions.get('window');

export default class Swiper extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            marginLeftAnim: new Animated.Value(0)
        };
        this._index = 0;
        this._marginLeft = 0;
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: e => true,
            onMoveShouldSetPanResponder: e => true,
            onPanResponderMove: (e, g) => {
                this._isMove = true;
                this._marginLeft = g.dx + (-this._index * width);
                this._marginLeft > 0 && (this._marginLeft = 0);
                this._marginLeft < (-this._maxMarginLeft) && (this._marginLeft = -this._maxMarginLeft);
                this.setState({
                    marginLeftAnim: this._marginLeft
                });
            },
            onPanResponderRelease: (e, g) => {
                if (!this._isMove) return;
                this._index = Math.abs(Math.round(this._marginLeft / width));
                this.setState({
                    marginLeftAnim: new Animated.Value(this._marginLeft)
                });
                Animated.spring(
                    this.state.marginLeftAnim, {
                        toValue: -this._index * width
                    },
                ).start();
                this._isMove = false;
            }
        })
    }
    componentWillUnmount() {
        clearInterval(this._intervalHandle);
    }
    autoPlay() {
        clearInterval(this._intervalHandle);
        this.props && this.props.children && (this._intervalHandle = setInterval(() => {
            let idx = this._index + 1;
            idx >= this.props.children.length && (idx = 0);
            this.scrollTo(idx);
        }, this.props.loopTime * 1000));
    }
    scrollTo(idx) {
        let marginLeftAnim = new Animated.Value(this._index * -width);
        this._index = idx;
        this.setState({
            marginLeftAnim: marginLeftAnim
        });
        Animated.spring(
            this.state.marginLeftAnim, {
                toValue: -this._index * width
            },
        ).start();
    }
    renderButton(){
        let btns = [],
            childrenLen = this.props.children && this.props.children.length || 0;
        for (let i = 0; i < childrenLen; i++) {
            btns.push(
                <TouchableOpacity key={i} onPress={e=>this.scrollTo(i)}>
                    <View style={[styles.btn,this.props.buttonStyle,this._index == i && styles.abtn,this._index == i && this.props.activeStyle]}>
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.btn_box}>{btns}</View>
        );
    }
    render() {
        this._maxWidth = this.props.children && this.props.children.length * width || width;
        this._maxMarginLeft = this._maxWidth - width;
        this.props.loopTime && this.autoPlay();
        return (
            <View 
                {...this._panResponder.panHandlers}
                style={{}}>
                <Animated.View
                    ref={e=>this._view = e}
                    style={[{height:this.props.height,width:this._maxWidth,flexDirection:'row',marginLeft:this.state.marginLeftAnim}]}>
                    {this.props.children && this.props.children.map((v,k)=>{
                        return <View key={k} style={{flex:1}}>{v}</View>
                    })}
                </Animated.View>
                {this.props.showButton && this.renderButton()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    btn_box: {
        height: 20,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
    },
    abtn: {
        backgroundColor: '#FFFD'
    },
    btn: {
        backgroundColor: '#FFF9',
        width: 10,
        height: 10,
        borderRadius: 10,
        margin: 2
    }
});