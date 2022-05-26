import * as React from "react";
import { IDashProps } from "./IDashProps";
import Chart from "./Chart";
import { MessageBar } from "office-ui-fabric-react";

export default class Dash extends React.Component<IDashProps, {}> {
  public render(): React.ReactElement<IDashProps> {
    return (
      <section>
        {this.props.listId ? (
          <Chart
            chartTitle={this.props.chartTitle}
            listId={this.props.listId}
            selectedFields={this.props.selectedFields}
            chartType={this.props.chartType}
            colors={this.props.colors}
          />
        ) : (
          <MessageBar>Select a list to continue&hellip;</MessageBar>
        )}
      </section>
    );
  }
}
