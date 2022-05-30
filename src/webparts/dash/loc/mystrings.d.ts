declare interface IDashWebPartStrings {
  ChartBar: string;
  ChartBarHorizontal: string;
  ChartData: string;
  ChartDoughnut: string;
  ChartLine: string;
  ChartPie: string;
  ChartSettings: string;
  ChartStyle: string;
  ChartTitle: string;
  ChartType: string;
  Colors: string;
  Error: string;
  Intro: string;
  List: string;
  Loading: string;
  LoadingChartData: string;
  Refresh: string;
  PropertyPaneDescription: string;
  SelectedFields: string;
  AddColor: string;
  DeleteColor: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module "DashWebPartStrings" {
  const strings: IDashWebPartStrings;
  export = strings;
}
