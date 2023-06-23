import type { SSTConfig } from "sst";
import { Bucket, RemixSite } from "sst/constructs";
import invariant from "tiny-invariant";

let DATABASE_HOST: string;
let DATABASE_USERNAME: string;
let DATABASE_PASSWORD: string;
let SESSION_SECRET: string;

if (process.env.NODE_ENV === "production") {
  invariant(process.env.PROD_SESSION_SECRET, "PROD_SESSION_SECRET is required");
  invariant(process.env.PROD_DATABASE_HOST, "PROD_DATABASE_HOST is required");
  invariant(
    process.env.PROD_DATABASE_USERNAME,
    "PROD_DATABASE_USERNAME is required"
  );
  invariant(
    process.env.PROD_DATABASE_PASSWORD,
    "PROD_DATABASE_PASSWORD is required"
  );
  DATABASE_HOST = process.env.PROD_DATABASE_HOST;
  DATABASE_USERNAME = process.env.PROD_DATABASE_USERNAME;
  DATABASE_PASSWORD = process.env.PROD_DATABASE_PASSWORD;
  SESSION_SECRET = process.env.PROD_SESSION_SECRET;
}

if (process.env.NODE_ENV === "development") {
  invariant(process.env.SESSION_SECRET, "SESSION_SECRET is required");
  invariant(process.env.DATABASE_HOST, "DATABASE_HOST is required");
  invariant(process.env.DATABASE_USERNAME, "DATABASE_USERNAME is required");
  invariant(process.env.DATABASE_PASSWORD, "DATABASE_PASSWORD is required");
  DATABASE_HOST = process.env.DATABASE_HOST;
  DATABASE_USERNAME = process.env.DATABASE_USERNAME;
  DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  SESSION_SECRET = process.env.SESSION_SECRET;
}

export default {
  config(_input) {
    return {
      name: "remix-lambda",
      region: "us-east-1",
    };
  },
  stacks(app) {
    const stage = app.stage;
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "public");

      const site = new RemixSite(stack, "site", {
        permissions: [bucket],
        customDomain: {
          domainName: `${stage}.gympal.dev`,
          hostedZone: "gympal.dev",
        },
        environment: {
          BUCKET: bucket.bucketName,
          DATABASE_HOST,
          DATABASE_USERNAME,
          DATABASE_PASSWORD,
          SESSION_SECRET,
        },
      });
      stack.addOutputs({
        url: `${stage}.gympal.dev`,
        random_url: site.url,
      });
    });
  },
} satisfies SSTConfig;
