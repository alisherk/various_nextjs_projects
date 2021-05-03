import { DynamoDB } from "@aws-sdk/client-dynamodb";

//provides aws-sdk v2 like syntaxt
export const db = new DynamoDB({
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});
