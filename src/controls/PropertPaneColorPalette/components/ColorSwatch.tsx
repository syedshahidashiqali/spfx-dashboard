import * as React from "react";
import {
  ColorPicker,
  Callout,
  DirectionalHint,
  IColor,
  DefaultButton,
} from "office-ui-fabric-react";
import styles from "./ColorSwatch.module.scss";
import * as strings from "DashWebPartStrings";

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
        <button
          className={styles.colorSwatch}
          ref={this.pickBtnRef}
          onClick={this.togglePick}
          style={{ backgroundColor: this.props.color }}
        >
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
          <footer className={styles.swatchActions}>
            <DefaultButton
              text={strings.DeleteColor}
              iconProps={{ iconName: "Delete" }}
              onClick={this.props.onColorDeleted}
            />
          </footer>
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
