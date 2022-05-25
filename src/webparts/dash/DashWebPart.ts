import * as React from "react";
import * as ReactDom from "react-dom";
import {
  Environment,
  EnvironmentType,
  Version,
} from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "DashWebPartStrings";
import Dash from "./components/Dash";
import { IDashProps } from "./components/IDashProps";
import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle,
} from "@pnp/spfx-property-controls/lib/PropertyFieldColorPicker";

export interface IDashWebPartProps {
  listId: string;
  selectedFields: string;
  chartType: string;
  chartTitle: string;
  color1: string;
  color2: string;
  color3: string;
}

import { SPHttpClient } from "@microsoft/sp-http";
import SharePointService from "../../services/SharePoint/SharePointService";

export default class DashWebPart extends BaseClientSideWebPart<IDashWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit().then(() => {
      SharePointService.setup(this.context, Environment.type);
    });
  }

  public render(): void {
    const element: React.ReactElement<IDashProps> = React.createElement(Dash, {
      listId: this.properties.listId,
      selectedFields: this.properties.selectedFields.split(","),
      chartType: this.properties.chartType,
      chartTitle: this.properties.chartTitle,
      colors: [
        this.properties.color1,
        this.properties.color2,
        this.properties.color3,
      ],
      isDarkTheme: this._isDarkTheme,
      environmentMessage: this._environmentMessage,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      userDisplayName: this.context.pageContext.user.displayName,
    });

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams
      return this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentTeams
        : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost
      ? strings.AppLocalEnvironmentSharePoint
      : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    this.domElement.style.setProperty("--bodyText", semanticColors.bodyText);
    this.domElement.style.setProperty("--link", semanticColors.link);
    this.domElement.style.setProperty(
      "--linkHovered",
      semanticColors.linkHovered
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Dash Settings",
          },
          groups: [
            {
              groupName: "Chart Data",
              groupFields: [
                PropertyPaneTextField("listId", {
                  label: "List",
                }),
                PropertyPaneTextField("selectedFields", {
                  label: "Selected Fields",
                }),
              ],
            },
            {
              groupName: "Chart Settings",
              groupFields: [
                PropertyPaneDropdown("chartType", {
                  label: "Chart Type",
                  options: [
                    { key: "Bar", text: "Bar" },
                    { key: "HorizontalBar", text: "HorizontalBar" },
                    { key: "Line", text: "Line" },
                    { key: "Pie", text: "Pie" },
                    { key: "Doughnut", text: "Doughnut" },
                  ],
                }),
                PropertyPaneTextField("chartTitle", {
                  label: "Chart Title",
                }),
              ],
            },
            {
              groupName: "Chart Style",
              groupFields: [
                PropertyFieldColorPicker("color1", {
                  label: "Color 1",
                  selectedColor: this.properties.color1,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: "Precipitation",
                  key: "colorPicker1",
                }),
                PropertyFieldColorPicker("color2", {
                  label: "Color 2",
                  selectedColor: this.properties.color2,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: "Precipitation",
                  key: "colorPicker2",
                }),
                PropertyFieldColorPicker("color3", {
                  label: "Color 3",
                  selectedColor: this.properties.color3,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: "Precipitation",
                  key: "colorPicker3",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
