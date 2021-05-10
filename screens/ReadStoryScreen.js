import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Image, TouchableHighlightBase, FlatList} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import db from '../config.js';

export default class ReadStoryScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allStories:[],
        }
    }

    RetrieveStories=()=>{
        try{
            var allStories= [],
            var stories= db.collection('stories').get().then((queriesSnapshot)=>
            {
                queriesSnapshot.forEach((doc)=>
                {
                    allStories.push(doc.data())
                })
                this.setState({
                    allStories
                })
            })
            
        }
        catch(error){
            console.log(error)
        }
    }
    render(){
        return(
            <View>
                <FlatList>
                    data={this.state.allStories}
                    renderItem={({item})=>(
                        <View style={Styles.itemContainer}>
                            <Text>
                                Title:{item.Title}
                            </Text>
                            <Text>
                                Author:{item.Author}
                            </Text>


                        </View>
                    )}
                     keyExtractor={(item,index)=>index.toString()}
                </FlatList>
            </View>
        )
    }
}

const Styles= StyleSheet.create({
    itemContainer:{
        flex:1,
        align:'center',
        height:80,
        width:'100%',
        borderWidth:2,
        borderColor:'black',
        justifyContent:'center'
    }
})