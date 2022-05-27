import * as React from "react";
import ColorSwatch from "./ColorSwatch";

export interface IColorPaletteProps {
  colors: string[];
  disabled?: boolean;
  onChanged(colors: string[]): void;
}

export class ColorPalette extends React.Component<IColorPaletteProps> {
  constructor(props: IColorPaletteProps) {
    super(props);

    // Bind methods
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
      </div>
    );
  }

  public onChanged(newColor: string, index: number): void {
    const updatedColors = this.props.colors;
    updatedColors[index] = newColor;

    if (newColor == null) {
      updatedColors.splice(index, 1);
    }

    this.props.onChanged(updatedColors);
  }
}
