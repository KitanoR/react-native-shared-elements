import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import PeliculasScreen from './src/Peliculas/PeliculasScreen';
import IndicadorScreen from './src/Indicador';

// lista de eventos
import EventScreen from './src/StackCarrousel/CarrouselScreen';
import EventDetailScreen from './src/StackCarrousel/CarroselDetailScreen';

const Stack = createSharedElementStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName="IndicadorScreen" headerMode='none'>
        <Stack.Screen
          name="IndicadorScreen"
          component={IndicadorScreen}
        />
        <Stack.Screen 
          name="EventScreen"
          component={EventScreen}
        />
        <Stack.Screen 
          name="EventDetailScreen"
          component={EventDetailScreen}
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 400 } },
              close: { animation: 'timing', config: { duration: 400 } },
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress
                }
              }
            }
          })}
        />
        
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


