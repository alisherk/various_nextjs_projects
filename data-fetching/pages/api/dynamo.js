import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import config from "./config";

const db = new DynamoDBClient({
  region: "ca-central-1",
  credentials: config.aws_remote_config,
});

export default async function handler(req, res) {
  const params = {
    TableName: "td_notes",
    Item: {
      user_id: { S: "bb" },
      timestamp: { N: "11" },
      title: { S: "title" },
      content: { S: "content" },
    },
  };
  try {
    if (req.method === "POST") {
      const data = await db.send(new PutItemCommand(params));
      console.log(data);
      res.status(201).json({ message: "created a record in db" });
    }
    if (req.method === "GET") {
      const params = {
        TableName: "td_notes", //TABLE_NAME
        Key: {
          user_id: { S: "12345f" },
          timestamp: {N: "1617372277"}
        },
        ProjectionExpression: "content, user_id"
   
      };

      const data = await db.send(new GetItemCommand(params));
      console.log("Success", data.Item);
      res.status(200).json({ data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops something went wrong" });
  }
}
