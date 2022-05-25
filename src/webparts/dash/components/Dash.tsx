import * as React from "react";
import styles from "./Dash.module.scss";
import { IDashProps } from "./IDashProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Chart from "./Chart";

export default class Dash extends React.Component<IDashProps, {}> {
  public render(): React.ReactElement<IDashProps> {
    return (
      <section className={styles.dash}>
        <Chart
          chartTitle={this.props.chartTitle}
          listId={this.props.listId}
          selectedFields={this.props.selectedFields}
          chartType={this.props.chartType}
          colors={this.props.colors}
        />
      </section>
    );
  }
}
