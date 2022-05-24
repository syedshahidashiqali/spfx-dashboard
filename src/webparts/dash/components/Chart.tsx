import * as React from "react";
import { IListItem } from "../../../services/SharePoint/IListItem";
import SharePointService from "../../../services/SharePoint/SharePointService";
import { Bar } from "react-chartjs-2";
import { Chart as Charts, registerables } from "chart.js";
Charts.register(...registerables);

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
    this.chartData = this.chartData.bind(this);

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

        <Bar data={this.chartData()} />

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

    SharePointService.getListItems("8eedf5f2-c649-495f-90ed-b3c390f6892a")
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

  public chartData() {
    const colors = ["#0078d4", "#bad80a", "#00b294", "#5c2d91", "#e3008c"];

    // Chart Data
    const data = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [],
    };

    // Add dataset
    this.state.items.map((item, index) => {
      // Create dataset
      const dataset = {
        label: item.Title,
        data: [
          item.EarningsQ1,
          item.EarningsQ2,
          item.EarningsQ3,
          item.EarningsQ4,
        ],
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
      };

      data.datasets.push(dataset);
    });

    return data;
  }
}
