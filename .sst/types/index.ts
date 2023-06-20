import "sst/node/config";
declare module "sst/node/config" {
  export interface ConfigTypes {
    APP: string;
    STAGE: string;
  }
}import "sst/node/config";
declare module "sst/node/config" {
  export interface SecretResources {
    "DATABASE_URL": {
      value: string;
    }
  }
}import "sst/node/config";
declare module "sst/node/config" {
  export interface SecretResources {
    "SESSION_SECRET": {
      value: string;
    }
  }
}import "sst/node/site";
declare module "sst/node/site" {
  export interface RemixSiteResources {
    "site": {
      url: string;
    }
  }
}