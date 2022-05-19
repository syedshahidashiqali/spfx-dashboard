import * as React from "react";
import { IListItem } from "../../../services/SharePoint/IListItem";

export interface IChartProps {
  chartTitle: string;
}

export interface IChartState {
  items: IListItem[];
}

export default class Chart extends React.Component<IChartProps, IChartState> {
  constructor(props: IChartProps) {
    super(props);

    // Bind methods

    // Set initial state
    this.state = {
      items: [],
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1>{this.props.chartTitle}</h1>
      </div>
    );
  }
}
