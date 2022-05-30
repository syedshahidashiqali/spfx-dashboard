import * as React from "react";
import {
  ColorPicker,
  Callout,
  DirectionalHint,
  IColor,
} from "office-ui-fabric-react";

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
  private pickBtnRef = React.createRef<HTMLButtonElement>();

  constructor(props: IColorSwatchProps) {
    super(props);

    // Bind methods
    this.togglePick = this.togglePick.bind(this);

    // Default State
    this.state = {
      picking: false,
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <button ref={this.pickBtnRef} onClick={this.togglePick}>
          {this.props.color}
        </button>
        <Callout
          hidden={!this.state.picking}
          target={this.pickBtnRef.current}
          onDismiss={this.togglePick}
          directionalHint={DirectionalHint.leftTopEdge}
        >
          <ColorPicker
            color={this.props.color}
            onChange={(e: any, colorObj: IColor) =>
              this.props.onColorChanged(colorObj.str)
            }
          />
          <button onClick={this.props.onColorDeleted}>Delete</button>
        </Callout>
      </div>
    );
  }

  public togglePick(): void {
    this.setState({
      picking: !this.state.picking,
    });
  }
}
