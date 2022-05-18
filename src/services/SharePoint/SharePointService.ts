import { WebPartContext } from "@microsoft/sp-webpart-base";
import { EnvironmentType } from "@microsoft/sp-core-library";
import { SPHttpClient } from "@microsoft/sp-http";
import { IListCollection } from "./IList";
import { IListItemCollection } from "./IListItem";
import { IListFieldCollection } from "./IListField";

class SharePointServiceManager {
  public context: WebPartContext;
  public environmentType: EnvironmentType;

  public setup(
    context: WebPartContext,
    environmentType: EnvironmentType
  ): void {
    this.context = context;
    this.environmentType = environmentType;
  }

  public get(relativeEndpointUrl: string): Promise<any> {
    return this.context.spHttpClient
      .get(
        `${this.context.pageContext.web.absoluteUrl}${relativeEndpointUrl}`,
        SPHttpClient.configurations.v1
      )
      .then((response) => {
        if (!response.ok) return Promise.reject("GET request failed.");
        return response.json();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getLists(showHiddenList: boolean = false): Promise<IListCollection> {
    return this.get(
      `/_api/lists${!showHiddenList ? "?$filter=Hidden eq false" : ""}`
    );
  }

  public getListItems(
    listId: string,
    selectedFields?: string[]
  ): Promise<IListItemCollection> {
    return this.get(
      `/_api/lists/getbyid("${listId}")/items${
        selectedFields ? `?$select=${selectedFields.join(",")}` : ""
      }`
    );
  }

  public getListFields(
    listId: string,
    showHiddenFields: boolean = false
  ): Promise<IListFieldCollection> {
    return this.get(
      `/_api/lists/getbyid('${listId}')/fields${
        !showHiddenFields ? "?$filter=Hidden eq false" : ""
      }`
    );
  }
}

const SharePointService = new SharePointServiceManager();

export default SharePointService;
