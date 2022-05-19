import * as React from "react";
import { IListItem } from "../../../services/SharePoint/IListItem";
import SharePointService from "../../../services/SharePoint/SharePointService";

export interface IChartProps {
  chartTitle: string;
}

export interface IChartState {
  items: IListItem[];
  loading: boolean;
  error: string | null;
}

export default class Chart extends React.Component<IChartProps, IChartState> {
  constructor(props: IChartProps) {
    super(props);

    // Bind methods
    this.getItems = this.getItems.bind(this);

    // Set initial state
    this.state = {
      items: [],
      loading: false,
      error: null,
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1>{this.props.chartTitle}</h1>

        {this.state.error && <p>{this.state.error}</p>}

        <ul>
          {this.state.items.map((item) => {
            return (
              <li key={item.Id}>
                <strong>{item.Title}</strong>({item.Id})
              </li>
            );
          })}
        </ul>

        <button onClick={this.getItems} disabled={this.state.loading}>
          {this.state.loading ? "Loading..." : "Refresh"}
        </button>
      </div>
    );
  }

  public getItems(): void {
    this.setState({ loading: true });

    SharePointService.getListItems("f9507a46-bf04-44ad-98e1-e88569360385")
      .then((items) => {
        this.setState({
          items: items.value,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          error: "Something went wrong!",
          loading: false,
        });
      });
  }
}
