import React from 'react';
import {Platform, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { white, gray, orange, red, lightgreen, tomato, dodgerblue } from '../constants/Colors';
import TextButton from "../components/TextButton";
import { FontAwesome } from "@expo/vector-icons";
import commonStyles from "../utils/commonStyles";


export default class Quiz extends React.Component {

    state = {
        questionIndex: 0,
        correctAnswers: 0,
        shouldShowAnswer: false,
    };

    onCorrect = () => {
        const {questionIndex, correctAnswers} = this.state;
        this.setState({questionIndex: questionIndex + 1, correctAnswers: correctAnswers + 1, shouldShowAnswer: false});
    };

    startQuiz = () => {
        this.setState({questionIndex: 0, correctAnswers: 0, shouldShowAnswer: false});
    };

    backToDeck = () => {
        this.props.navigation.goBack();

    }

    onIncorrect = () => {
        this.setState({questionIndex: this.state.questionIndex + 1});
    };

    showAnswer = () => {
        this.setState({shouldShowAnswer: !this.state.shouldShowAnswer});
    };

    render() {
        const {questionIndex, correctAnswers, shouldShowAnswer} = this.state;
        const {questions} = this.props.navigation.state.params;
        const isQuestionAvailable = questionIndex < questions.length;
        const questionLeft = questions.length - questionIndex;

        return (
            <View style={{flex: 1}}>
                {isQuestionAvailable ? (
                    <View style={styles.deckCard}>

                        <View style={[styles.group, {justifyContent: 'flex-start', flex: 1}]}>
                            <View>
                                <Text>{questionLeft} / {questions.length}</Text>
                            </View>
                        </View>

                        <View style={[styles.group, {flex: 4}]}>
                            <View>
                                {shouldShowAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36, color:'#000000'}}>{questions[questionIndex].answer}</Text>

                                        <TextButton style={[commonStyles.button, styles.questionButton]}onPress={this.showAnswer}>
                                            Perguntas
                                        </TextButton>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[questionIndex].question}</Text>

                                        <TextButton style={[commonStyles.button, styles.answerButton]}  onPress={this.showAnswer}>
                                            Respostas
                                        </TextButton>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={styles.answerButtonsContainer}>
                              <TextButton style={[commonStyles.button, styles.correctButton]} onPress={this.onCorrect}>
                                    Correto
                                </TextButton>
                                <TextButton style={[commonStyles.button, styles.incorrectButton]} onPress={this.onIncorrect}>
                                    Incorreto  
                                </TextButton>
                            </View>

                        </View>

                ) : (
                    <View style={styles.deckCard}>
                        <TextButton style={[commonStyles.button, styles.scoreButton]}>Pontuação: {correctAnswers}</TextButton>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>

                                <TextButton style={[commonStyles.button, styles.quizButton]} onPress={this.startQuiz}>
                                    Iniciar o Quiz
                                </TextButton>
                                <TextButton style={[commonStyles.button, styles.backButton]} onPress={this.backToDeck}>
                                    Voltar para o Deck
                                </TextButton>

                            </View>

                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#395b5b',
    },
    score: {
        borderWidth: 5,
        backgroundColor: '#f7c851',
        borderColor: '#f1f751',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 24,
        padding: 10,
        height: 80,
        fontSize: 36,
        color:'#000000'
        
    },
    startQuiz: {
        borderWidth: 5,
        backgroundColor: '#e537ef',
        borderColor: '#f1f751',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 24,
        padding: 10,
        height: 45,
        
    },
    back: {
        borderWidth: 5,
        backgroundColor: '#ef9337',
        borderColor: '#f1f751',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 10,
        padding: 10,
        height: 45,
        
    },
    correto: {
        borderWidth: 5,
        backgroundColor: '#1e9613',
        borderColor: '#f1f751',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 10,
        padding: 10,
        height: 45,
        
    },
    incorreto: {
        borderWidth: 5,
        backgroundColor: '#e50606',
        borderColor: '#f1f751',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 24,
        padding: 10,
        height: 45,
        
    },
    deckCard: {
      flex: 3,
      justifyContent: "center",
      backgroundColor: white,
      borderRadius: Platform.OS === "ios" ? 16 : 2,
      padding: 20,
      marginLeft: 20,
      marginRight: 20,
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
    resultsContainer: {
      borderWidth: 1,
      borderRadius: 6,
      borderColor: gray,
      padding: 20,
      margin: 10
    },
    resultsTitle: {
      fontSize: 30,
      textAlign: "center",
      color: orange
    },
    progressContainer: {
      justifyContent: "center",
      flexDirection: "row",
      paddingBottom: 20
    },
    container: {
      flex: 1,
      justifyContent: "center"
    },
    answerButtonsContainer: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center"
    },
    label: {
      fontSize: 30,
      color: gray,
      textAlign: "center"
    },
    question: {
      fontSize: 40,
      textAlign: "center"
    },
    answer: {
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center"
    },
    incorrectButton: {
      backgroundColor: white,
      borderWidth: 3,
      width: 120,
      margin: 10,
      padding: 20,
      borderColor: gray,
      color: gray
    },
    correctButton: {
      borderWidth: 1,
      width: 120,
      margin: 10,
      padding: 20,
      borderColor: orange,
      backgroundColor: orange
    },
    answerButton: {
        backgroundColor: white,
        borderWidth: 2,
        margin: 10,
        padding: 20,
        borderColor: red,
        color: red
      },
      questionButton: {
        backgroundColor: white,
        borderWidth: 2,
        margin: 10,
        padding: 20,
        borderColor: lightgreen,
        color: lightgreen
      },
      scoreButton: {
        backgroundColor: white,
        borderWidth: 2,
        margin: 10,
        padding: 20,
        borderColor: orange,
        color: orange
      },
      quizButton: {
        borderWidth: 1,
        borderColor: tomato,
        backgroundColor: tomato,
        margin: 30,
        padding: 25,
        height: 80,

     },
     backButton: {
        borderWidth: 1,
        borderColor: dodgerblue,
        backgroundColor: dodgerblue,
        margin: 30,
        padding: 25,
        height: 80,

     }

  });