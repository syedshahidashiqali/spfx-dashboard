import * as React from "react";
import ColorSwatch from "./ColorSwatch";
import styles from "./ColorPalette.module.scss";

export interface IColorPaletteProps {
  colors: string[];
  disabled?: boolean;
  onChanged(colors: string[]): void;
}

export class ColorPalette extends React.Component<IColorPaletteProps> {
  constructor(props: IColorPaletteProps) {
    super(props);

    // Bind methods
    this.onChanged = this.onChanged.bind(this);
    this.addColor = this.addColor.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.props.colors.map((color, index) => {
          return (
            <ColorSwatch
              key={index}
              color={color}
              onColorChanged={(newColor) => this.onChanged(newColor, index)}
              onColorDeleted={() => this.onChanged(null, index)}
            />
          );
        })}
        <button onClick={this.addColor}>Add Color</button>
      </div>
    );
  }

  public onChanged(newColor: string, index: number): void {
    const updatedColors = this.props.colors;
    updatedColors[index] = newColor;

    if (newColor === null) {
      updatedColors.splice(index, 1);
    }

    this.props.onChanged(updatedColors);
  }

  public addColor(): void {
    const updatedColors = this.props.colors;
    updatedColors.push("#000000");

    this.props.onChanged(updatedColors);
  }
}
