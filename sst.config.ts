import type { SSTConfig } from "sst";
import { Config, RemixSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "my-remix-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const DATABASE_HOST = new Config.Secret(stack, "DATABASE_HOST");
      const DATABASE_USERNAME = new Config.Secret(stack, "DATABASE_USERNAME");
      const DATABASE_PASSWORD = new Config.Secret(stack, "DATABASE_PASSWORD");
      const SESSION_SECRET = new Config.Secret(stack, "SESSION_SECRET");
      const site = new RemixSite(stack, "site", {
        bind: [
          DATABASE_HOST,
          DATABASE_USERNAME,
          DATABASE_PASSWORD,
          SESSION_SECRET,
        ],
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
