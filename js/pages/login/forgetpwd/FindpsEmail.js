import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import CusBaseText from "../../../component/CusBaseText";
export default class FindpsEmail extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
        }
    }

    //接收上一个页面传过来的titl  e显示出来
    static navigationOptions = ({navigation}) => ({

        header: (
            <CustomNavBar
                centerText = {navigation.state.params.title}
                leftClick={() =>  navigation.goBack() }
            />
        ),

    });

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{flex:1,flexDirection:'column',backgroundColor:'#F3F3F3'}}>
                <View style={styles.item_bottom}>
                    <View style={styles.item_left}>
                        <CusBaseText style={{fontSize:17,color:'black'}}>{'密保邮箱:'}</CusBaseText>
                    </View>

                    <View style={styles.container_text}>
                        <TextInput  onChangeText={(text) => this.setState({email:text})} placeholder='密保邮箱' underlineColorAndroid='transparent' style={{ fontSize:16,flex:3}} />

                    </View>
                </View>

                <TouchableOpacity   onPress={() => this._changePsd(navigate)}>
                    <View style={{height:45,backgroundColor:COLORS.appColor,marginLeft:20,marginRight:20, borderRadius:5,marginTop:30,justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:17}}>{'确定'}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    _changePsd(navigate){

        if (this.state.email.length == 0) {
            this._showInfo('密保邮箱不能为空');
            return;
        } else {

            this._fetchData(navigate);

        }
    }


    _fetchData(navigate){
        let params = new FormData();
        params.append("ac", "FPcheckEmail");
        params.append("user", this.props.navigation.state.params.username);
        params.append("email", this.state.email);
        var promise = GlobalBaseNetwork.sendNetworkRequest (params);

        promise
            .then(response => {
                //请求成功
                if (response.msg == 0){
                    navigate('PasswordSetting', {title:'密码找回',data:response.data,username:this.props.navigation.state.params.username});
                } else {
                    this._showInfo(response.param);
                }
            })
            .catch(err => { });

    }

    _showInfo(title){
        Alert.alert(
            '提示',
            title,
            [
                {text:'确定', onPress: () => {}},
            ]
        )
    }

}
const  styles = StyleSheet.create({

    item_top:{
        flexDirection:'row',justifyContent:'center', alignItems:'center',height:40
    },

    item_left:{
        width:115,paddingLeft:15,justifyContent:'center', alignItems:'center'

    },

    item_bottom:{
        flexDirection:'row',justifyContent:'center', alignItems:'center',height:40, backgroundColor:'white',marginTop:30
    },

    container_text:{
        flexDirection:'row',
        flex:1,
        marginRight:15,
        justifyContent:'center',
        alignItems:'center'

    },

})
