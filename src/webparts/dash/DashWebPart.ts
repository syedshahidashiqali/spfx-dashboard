import * as React from "react";
import * as ReactDom from "react-dom";
import { Environment, Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
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
import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect";
import { PropertyPaneColorPalette } from "../../controls/PropertPaneColorPalette/PropertPaneColorPalette";

export interface IDashWebPartProps {
  listId: string;
  selectedFields: string[];
  chartType: string;
  chartTitle: string;
  colors: string[];
}

import SharePointService from "../../services/SharePoint/SharePointService";

export default class DashWebPart extends BaseClientSideWebPart<IDashWebPartProps> {
  // List options state
  private listOptions: IPropertyPaneDropdownOption[];
  private listOptionsLoading: boolean = false;

  // Field options state
  private fieldOptions: IPropertyPaneDropdownOption[];
  private fieldOptionsLoading: boolean = false;

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
      selectedFields: this.properties.selectedFields,
      chartType: this.properties.chartType,
      chartTitle: this.properties.chartTitle,
      colors: this.properties.colors,
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
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.ChartData,
              groupFields: [
                PropertyPaneDropdown("listId", {
                  label: strings.List,
                  options: this.listOptions,
                  disabled: this.listOptionsLoading,
                }),
                PropertyFieldMultiSelect("selectedFields", {
                  key: "selectedFields",
                  label: strings.SelectedFields,
                  options: this.fieldOptions,
                  disabled: this.fieldOptionsLoading,
                  selectedKeys: this.properties.selectedFields,
                }),
              ],
            },
            {
              groupName: strings.ChartSettings,
              groupFields: [
                PropertyPaneDropdown("chartType", {
                  label: strings.ChartType,
                  options: [
                    { key: "Bar", text: strings.ChartBar },
                    { key: "HorizontalBar", text: strings.ChartBarHorizontal },
                    { key: "Line", text: strings.ChartLine },
                    { key: "Pie", text: strings.ChartPie },
                    { key: "Doughnut", text: strings.ChartDoughnut },
                  ],
                }),
                PropertyPaneTextField("chartTitle", {
                  label: strings.ChartTitle,
                }),
              ],
            },
            {
              groupName: strings.ChartStyle,
              groupFields: [
                new PropertyPaneColorPalette("colors", {
                  label: strings.Colors,
                  colors: this.properties.colors,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  key: "colors_palette",
                }),
              ],
            },
          ],
        },
      ],
    };
  }

  private getLists(): Promise<IPropertyPaneDropdownOption[]> {
    this.listOptionsLoading = true;
    this.context.propertyPane.refresh();

    return SharePointService.getLists().then((lists) => {
      this.listOptionsLoading = false;
      this.context.propertyPane.refresh();

      return lists.value.map((list) => {
        return {
          key: list.Id,
          text: list.Title,
        };
      });
    });
  }

  public getFields(): Promise<IPropertyPaneDropdownOption[]> {
    // No list selected
    // if (!this.properties.listId) return Promise.resolve();

    this.fieldOptionsLoading = true;
    this.context.propertyPane.refresh();

    return SharePointService.getListFields(this.properties.listId).then(
      (fields) => {
        this.fieldOptionsLoading = false;
        this.context.propertyPane.refresh();

        return fields.value.map((field) => {
          return {
            key: field.InternalName,
            text: `${field.Title} (${field.TypeAsString})`,
          };
        });
      }
    );
  }

  protected onPropertyPaneConfigurationStart(): void {
    this.getLists()
      .then((listOptions) => {
        this.listOptions = listOptions;
        this.context.propertyPane.refresh();
      })
      .then(() => {
        this.getFields().then((fieldOptions) => {
          this.fieldOptions = fieldOptions;
          this.context.propertyPane.refresh();
        });
      });
  }

  protected onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    if (propertyPath === "listId" && newValue) {
      this.properties.selectedFields = [];

      this.getFields().then((fieldOptions) => {
        this.fieldOptions = fieldOptions;
        this.context.propertyPane.refresh();
      });
    } else if (propertyPath == "colors" && newValue) {
      this.properties.colors = newValue;
      this.context.propertyPane.refresh();
      this.render();
    }
  }
}
