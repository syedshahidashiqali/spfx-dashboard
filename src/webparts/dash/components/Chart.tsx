import * as React from "react";
import { IListItem } from "../../../services/SharePoint/IListItem";
import SharePointService from "../../../services/SharePoint/SharePointService";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Chart as Charts, registerables } from "chart.js";
Charts.register(...registerables);

export interface IChartProps {
  chartTitle: string;
  listId: string;
  selectedFields: string[];
  chartType: string;
  colors: string[];
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

        {this.props.chartType == "Bar" && <Bar data={this.chartData()} />}
        {this.props.chartType == "HorizontalBar" && (
          <Bar data={this.chartData()} options={{ indexAxis: "y" }} />
        )}
        {this.props.chartType == "Line" && <Line data={this.chartData()} />}
        {this.props.chartType == "Pie" && <Pie data={this.chartData()} />}
        {this.props.chartType == "Doughnut" && (
          <Doughnut data={this.chartData()} />
        )}

        <button onClick={this.getItems} disabled={this.state.loading}>
          {this.state.loading ? "Loading..." : "Refresh"}
        </button>
      </div>
    );
  }

  public getItems(): void {
    this.setState({ loading: true });

    SharePointService.getListItems(this.props.listId)
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
        backgroundColor: this.props.colors[index % this.props.colors.length],
        borderColor: this.props.colors[index % this.props.colors.length],
      };

      data.datasets.push(dataset);
    });

    return data;
  }
}
