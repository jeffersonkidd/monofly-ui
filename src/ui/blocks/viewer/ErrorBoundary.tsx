import React from "react";

// Isolates a single story's live preview: a component that throws while
// rendering (an unsupported prop shape, a missing provider, etc.) shows an
// inline message instead of taking down the whole viewer.

interface Props {
  /** Re-mount the boundary when this changes (e.g. selected story / controls). */
  resetKey: unknown;
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          <p className="font-medium">Live preview unavailable</p>
          <pre className="mt-1 whitespace-pre-wrap break-words text-xs opacity-80">
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
