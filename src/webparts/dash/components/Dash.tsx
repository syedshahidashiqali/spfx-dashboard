import * as React from "react";
import { IDashProps } from "./IDashProps";
import Chart from "./Chart";
import { MessageBar } from "office-ui-fabric-react";
import * as strings from "DashWebPartStrings";

export default class Dash extends React.Component<IDashProps, {}> {
  public render(): React.ReactElement<IDashProps> {
    return (
      <section>
        {this.props.listId && this.props.selectedFields.length ? (
          <Chart
            chartTitle={this.props.chartTitle}
            listId={this.props.listId}
            selectedFields={this.props.selectedFields}
            chartType={this.props.chartType}
            colors={this.props.colors}
          />
        ) : (
          <MessageBar>{strings.Intro}</MessageBar>
        )}
      </section>
    );
  }
}
