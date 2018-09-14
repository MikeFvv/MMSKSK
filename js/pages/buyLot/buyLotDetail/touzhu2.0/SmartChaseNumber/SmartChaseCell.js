import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    StatusBar,
    ScrollView,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    ImageBackground,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
import moment from 'moment';

export default  class SmartChaseCell extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:props.allenData,
            clickPlus:props.clickPlus,
            clickMinus:props.clickMinus
        }}



    render(){
        // console.log(this.state.date);
        return (<View key={this.state.date.index} style={[styles.cellSuperStyle,{backgroundColor:this.state.date.index%2?'white':'#f6f6f6'} ]}>

            <CusBaseText style={{flex:1.3,textAlign:'center',fontSize:((width == 320) ? (12) :(14))}}>{this.state.date.item.time}</CusBaseText>

            <View style={{flex:1, borderWidth:0.5,borderColor:'#9d9d9d',width:100,height:28,borderRadius:4,flexDirection: 'row',alignItems: 'center'}}>

                <View style={{flex:1 }}>
                    <TouchableOpacity onPress={()=>{this.state.clickMinus(this.state.date.item);this.setState({})}} >
                        <CusBaseText style={{textAlign:'center',color:"#676767"}} >一</CusBaseText>
                    </TouchableOpacity>
                </View>
                {/*分割线*/}
                <View style={{width:((width == 320) ? (1) :(0.5)),height:26,backgroundColor:'#9d9d9d'}} />

                <View style={{flex:1 }}>
                    <CusBaseText style={{textAlign:'center',color:'#535353'}} >{this.state.date.item.num}</CusBaseText>
                </View>

                <View style={{width:((width == 320) ? (1) :(0.5)),height:26,backgroundColor:'#9d9d9d'}} />

                <View style={{flex:1 }}>
                    <TouchableOpacity onPress={()=>{this.state.clickPlus(this.state.date.item);this.setState({})}} >
                        <CusBaseText style={{textAlign:'center',fontSize:20,color:"#676767"}} >+</CusBaseText>
                    </TouchableOpacity>
                </View>


            </View>

            <CusBaseText style={{flex:1,textAlign:'center',color:'#e33939',fontSize:((width == 320) ? (12) :(14))}}>{this.state.date.item.money}</CusBaseText>

            <View style={{flex:1}}>
                <CusBaseText style={{textAlign:'center',color:'#535353',fontSize:((width == 320) ? (12) :(14))}}>{moment.unix(this.state.date.item.openTime).format('YYYY-MM-DD HH:mm:ss')}</CusBaseText>
                {/*<CusBaseText style={{textAlign:'center',color:'#535353',fontSize:((width == 320) ? (12) :(14))}}>{moment.unix(this.state.date.item.openTime).format('YYYY-MM-DD HH:mm:ss')}</CusBaseText>*/}

            </View>

        </View>);

}

    componentWillReceiveProps(nextProps) {
        this.setState ({
            date:nextProps.allenData,

        })};


    componentWillUnmount() {
        // console.log("卸载");
    }

}



const styles = StyleSheet.create({



    cellSuperStyle:{
        height:58,
        flexDirection: 'row',
        backgroundColor:'white',
        justifyContent: 'space-around',
        alignItems: 'center',
        

    },

})