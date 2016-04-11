'use strict'

import React, {
	StyleSheet,
	ScrollView,
	View
}
from 'react-native';

export default class Swiper extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		  	<ScrollView
		  		ref={'sv'}
		  		onScroll={e=>console.log(this,e)}
				style={[this.props.style,styles.swiper]}
				horizontal={true}>
				{this.props.children.map((v,k)=>{
					return <View key={k} style={{}}>{v}</View>
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	swiper: {
		width:100,
		backgroundColor:'red'
	}
});