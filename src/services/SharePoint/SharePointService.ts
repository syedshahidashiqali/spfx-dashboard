import { WebPartContext } from "@microsoft/sp-webpart-base";
import { EnvironmentType } from "@microsoft/sp-core-library";

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
}

const SharePointService = new SharePointServiceManager();

export default SharePointService;
