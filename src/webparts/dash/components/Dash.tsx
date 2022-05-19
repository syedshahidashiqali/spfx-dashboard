import * as React from "react";
import styles from "./Dash.module.scss";
import { IDashProps } from "./IDashProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Chart from "./Chart";

export default class Dash extends React.Component<IDashProps, {}> {
  public render(): React.ReactElement<IDashProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return (
      <section className={styles.dash}>
        <Chart chartTitle="My New Chart" />
      </section>
    );
  }
}
