/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

class ErrorBoundary extends React.Component<{
  children: React.ReactElement;
  fallback: () => React.ReactElement;
}> {
  state = { hasError: false };
  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    console.log(error.message);
    console.log(info.componentStack);
  }
  render() {
    return this.state.hasError ? this.props.fallback() : this.props.children;
  }
}

export default ErrorBoundary;
