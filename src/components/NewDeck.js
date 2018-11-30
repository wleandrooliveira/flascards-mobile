import React from 'react';
import {Platform,Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {createDeck} from '../utils/QuestionsApi';
import {connect} from 'react-redux';
import {addDeck} from '../actions/index';
import { white, gray, orange, red, lightgreen, tomato, dodgerblue } from '../constants/Colors';
import TextButton from "../components/TextButton";
import { FontAwesome } from "@expo/vector-icons";
import commonStyles from "../utils/commonStyles";

class AddDeck extends React.Component {
    componentWillMount() {
        this.setState({
            text: ''
        })
    }
    addNewDeck = () => {
        const entry = this.state;
        const {decks} = this.props;

        if (!entry.text) {
            Alert.alert(
                'Campo Obrigatório',
                'O Nome do Deck está vazio'
            );
        } else {
            if (decks[entry.text]) {
                Alert.alert(
                    'Error!',
                    'O Deck já existe!'
                );
            } else {
                const newDeck = {[entry.text]: {title: entry.text, questions: []}};

                this.props.dispatch(addDeck(newDeck));
                createDeck(newDeck);

                Alert.alert(
                    'Successo', 'Deck Adicionado',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('UniqueDeck', {
                            title: entry.text,
                            questions : []
                        })},
                    ],
                );

                this.setState({text: ''});
            }
        }
    };

    backToDeck = () => {
        this.props.navigation.goBack();

    }

    render() {
        return (
            <View style={style.deckCard}>
                <Text style={{fontSize: 28}}>Digite o nome do Deck ?</Text>

                <TextInput
                    value={this.state.text}
                    style={style.input}
                    onChangeText={text => this.setState({text})}/>

                <TextButton style={[commonStyles.button, style.submitButton]}
                    onPress={this.addNewDeck}>Enviar
                </TextButton>
                <TextButton style={[commonStyles.button, style.backButton]} onPress={this.backToDeck}>
                    Voltar para o Deck
                </TextButton>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: gray,
        backgroundColor: gray,
        margin: 24,
    },
    deckCard: {
        flex: 3,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: white,
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        backfaceVisibility: "hidden"
      },
      deckCardBack: {
        position: "absolute",
        top: 0
      },
    backButton: {
        borderWidth: 1,
        borderColor: dodgerblue,
        backgroundColor: dodgerblue,
        width: 200,
        margin: 30,
        padding: 25,
        height: 80,

     },
     submitButton: {
        borderWidth: 1,
        borderColor: orange,
        backgroundColor: orange,
        width: 200,
        margin: 30,
        padding: 25,
        height: 80,

     }
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(AddDeck);