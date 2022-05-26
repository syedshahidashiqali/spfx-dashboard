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
    return <div>Color Pickers!</div>;
  }
}
