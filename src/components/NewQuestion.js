import React from 'react';
import { Platform, Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {addQuestion} from '../actions';
import {connect} from 'react-redux';
import {addQuestionForDeck} from '../utils/QuestionsApi';
import { white, gray, orange, red, lightgreen, tomato, dodgerblue } from '../constants/Colors';
import TextButton from "../components/TextButton";
import { FontAwesome } from "@expo/vector-icons";
import commonStyles from "../utils/commonStyles";

class NewQuestion extends React.Component {

    state = {
        question: '', answer: ''
    };

    submitQuestion = () => {
        let alert = {};
        const {question, answer} = this.state;
        const {title, questions} = this.props.navigation.state.params;

        if (question === '') {
            Alert.alert('Campo Obrigatório', 'O campo está em branco');
            return;
        }
        if (answer === '') {
            Alert.alert('Campo Obrigatório', 'O campo está em branco');
            return;
        }

        const params = {title, questions, question, answer};

        this.props.dispatch(addQuestion(params));

        addQuestionForDeck({
            card: {question, answer},
            deckName: title
        });

        Alert.alert('Successo', 'Pergunta adicionada com sucesso',
            [
                {
                    text: 'OK', onPress: () =>
                    this.props.navigation.goBack()
                }
            ],);
    };

    render() {
        const {question, answer} = this.state;

        return (
            <View style={style.deckCard}>
                <Text>A Pergunta é </Text>
                <TextInput
                    defaultValue="Pergunta"
                    value={question}
                    style={style.input}
                    onChangeText={question => this.setState({question})}/>
                <Text>A Resposta é</Text>
                <TextInput
                    defaultValue="Resposta"
                    value={answer}
                    style={style.input}
                    onChangeText={answer => this.setState({answer})}/>

                <TextButton style={[commonStyles.button, style.submitButton]}
                    onPress={this.submitQuestion}>Enviar
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
        height: 56,
        padding: 12,
        borderWidth: 1,
        borderColor: '#7f7f7f',
        margin: 16
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

export default connect(mapStateToProps)(NewQuestion);