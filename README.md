#React-native-swiper
适用iOS、Android

## 有问题反馈
在使用中有任何问题，欢迎反馈给我，也可以用以下联系方式跟我交流

* 邮件(Netxy#vip.qq.com, 把#换成@)
* QQ: 850265689

## 使用

```javascript
 class App extends Component {
  render() {
    return (
      <Swiper height={180} showButton={true} loopTime={4}>
        <View style={{flex:1,backgroundColor:'#f00'}}></View>
        <View style={{flex:1,backgroundColor:'#0f0'}}></View>
        <View style={{flex:1,backgroundColor:'#00f'}}></View>
      </Swiper>
    );
  }
}
```