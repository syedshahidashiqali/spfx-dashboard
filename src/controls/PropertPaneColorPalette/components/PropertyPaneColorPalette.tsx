import * as React from "react";

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
            <input
              type="text"
              value={color}
              key={index}
              onChange={(event) =>
                this.onChanged(event.currentTarget.value, index)
              }
            />
          );
        })}
      </div>
    );
  }

  public onChanged(newColor: string, index: number): void {
    const updatedColors = this.props.colors;
    updatedColors[index] = newColor;

    this.props.onChanged(updatedColors);
  }
}
