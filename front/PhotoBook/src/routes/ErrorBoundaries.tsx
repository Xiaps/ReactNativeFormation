import React from 'react';
import {Text, View} from 'react-native';

export default class ErrorBoundary extends React.Component {
  state = {hasError: false};

  static getDerivedStateFromError(error: unknown) {
    console.log('error: ', error);
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.log('errorInfo: ', errorInfo);
    console.log('error: ', error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View>
          <Text>Error...</Text>
        </View>
      );
    }

    return this.props.children;
  }
}
