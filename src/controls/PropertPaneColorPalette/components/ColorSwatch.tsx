import * as React from "react";
import { ColorPicker } from "office-ui-fabric-react";

export interface IColorSwatchProps {
  color: string;
  onColorChanged(color: string): void;
  onColorDeleted(): void;
}

export interface IColorSwatchState {
  picking: boolean;
}

export default class ColorSwatch extends React.Component<
  IColorSwatchProps,
  IColorSwatchState
> {
  constructor(props: IColorSwatchProps) {
    super(props);

    // Bind methods

    // Default State
    this.state = {
      picking: false,
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <ColorPicker color={this.props.color} />
        <button onClick={this.props.onColorDeleted}>Delete</button>
      </div>
    );
  }
}
