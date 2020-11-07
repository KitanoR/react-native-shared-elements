import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { StatusBar } from 'expo-status-bar';
import data from './data';


const Acordeon = () => {
    const [currentId, setCurrentId] = React.useState(null);
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {
                data.map(({ bg, color, category, subCategories}) => {
                    return (
                        <TouchableOpacity 
                            key={category}
                            style={styles.cardContainer}
                            onPress={() => {}}
                            activeOpacity={0.9}
                        >
                            <View style={[ styles.card, { backgroundColor: bg }]}>
                                <Text style={[ styles.heading, { color }]}> { category } </Text>
                                <View style={styles.subCategoriesList}>
                                    {
                                        subCategories.map(subCategory => {
                                            return (
                                                <Text key={subCategory} style={[ styles.body,  { color  } ]}>
                                                    {subCategory}
                                                </Text>
                                            );
                                        })
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
      cardContainer: {
        flexGrow: 1,
      },
      card: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      heading: {
        fontSize: 38,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
      },
      body: {
          fontSize: 20,
          lineHeight: 20 * 1.5,
          textAlign: 'center',
      }
});

export default Acordeon;