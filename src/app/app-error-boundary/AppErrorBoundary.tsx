import React from "react";
import { AppLayout } from "shared/layouts";

type IErrorBoundaryState = {
  hasError: boolean;
};

type IErrorBoundaryProps = React.PropsWithChildren;

export class AppErrorBoundary extends React.Component<
  React.PropsWithChildren,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <AppLayout>
          <div>An unexpected error occurred.</div>
          <button onClick={() => window.location.reload()}>Reload</button>
        </AppLayout>
      );
    }

    return this.props.children;
  }
}
