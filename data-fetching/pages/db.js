import { DynamoDBClient, DynamoDB } from "@aws-sdk/client-dynamodb";
//import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

// newer syntax that has send function where you put different commands
// eg:  const data = await db.send(new PutItemCommand(params));
// command classes are available from "@aws-sdk/client-dynamodb"
export const dbClient = new DynamoDBClient({
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

//provides aws-sdk v2 like syntaxt
export const db = new DynamoDB({
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});
