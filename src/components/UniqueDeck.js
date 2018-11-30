import React from 'react';
import {connect} from 'react-redux';
import { Platform, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { white, gray, orange, red, dodgerblue, tomato } from '../constants/Colors';
import TextButton from "../components/TextButton";
import commonStyles from "../utils/commonStyles";

class UniqueDeck extends React.Component {

    render() {
        let {title} = this.props.navigation.state.params;
        const questions = this.props.decks[title] && this.props.decks[title].questions;

        return (
            <View style={styles.deckCard}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 36, color:red}}>{title}</Text>
                    <Text style={{fontSize: 22, marginTop: 12, color: gray}}>{questions.length} cards
                    </Text>
                </View>

                <TextButton  style={[commonStyles.button, styles.addButton]} onPress={() => {
                        this.props.navigation.navigate('NewQuestion', {
                            title,
                            questions,
                        });
                    }}> Adicionar Cartão
                </TextButton>

                <TextButton  style={[commonStyles.button, styles.quizButton]} onPress={() => {
                        this.props.navigation.navigate('Quiz', {
                            title,
                            questions,
                        });
                    }}>Iniciar o Quiz
                </TextButton>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#000000',
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
        borderWidth: 1,
        width: 120,
        borderColor: gray,
        color: gray
      },
      addButton: {
          borderWidth: 1,
          borderColor: dodgerblue,
          backgroundColor: dodgerblue,
          margin: 30,
          padding: 25,
          height: 80,
        },
        quizButton: {
           borderWidth: 1,
           borderColor: tomato,
           backgroundColor: tomato,
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

export default connect(mapStateToProps)(UniqueDeck);