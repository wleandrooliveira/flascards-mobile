import React from "react";
import { Text, StyleSheet, Platform, View } from "react-native";
import { red, white, gray } from "../constants/Colors";

export default class CardItem extends React.Component {
    render() {
        const {title, questions} = this.props;

        return (
                <View style={styles.item}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.deckTitle}>{title}</Text>
                        <Text style={styles.cardCount}>
                        {questions && questions.length} cards
                        </Text>
                    </View>
                </View>
        );
    }
    
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  deckTitle: {
    color: red,
    fontWeight: "bold",
    fontSize: 20
  },
  cardCount: {
    color: gray,
    fontSize: 16
  }
});
