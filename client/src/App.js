import React from 'react';
import { Root } from 'native-base';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatsScreen from './screens/ChatsScreen';
import ContactProfileScreen from './screens/ContactProfileScreen';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    Chats: { screen: ChatsScreen },
    ContactProfile: { screen: ContactProfileScreen },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const uri = '10.0.2.2:5000';
const httpLink = createHttpLink({ uri: `http://${uri}` });

const wsLink = new WebSocketLink({
  uri: `ws://${uri}`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
});

const App = props => {
  return (
    <ApolloProvider client={client}>
      <Root>
        <AppContainer />
      </Root>
    </ApolloProvider>
  );
};

export default App;
