import { db } from "../db";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const eventId = req.query.eventId;
    const { email, text, name } = req.body;
    const params = {
      TableName: "dt_comments",
      Item: marshall({
        commentId: new Date().toISOString(),
        eventId: eventId,
        text: text,
        name: name,
        email: email,
      }),
    };
    await db.putItem(params);
    res.status(201).json({ message: "Sucess, comment is created" });
  }
  if (req.method === "GET") {
    const params = {
      TableName: "dt_comments",
      FilterExpression: "eventId = :e",
      ExpressionAttributeValues: marshall({
        ":e": "e2",
      }),
    };

    try {
      const marshalledData = await db.scan(params);
      const unmarshalledData = marshalledData.Items.map((item) =>
        unmarshall(item)
      );
      res.status(200).json({ comments: unmarshalledData });
    } catch (error) {
      console.log(error);
    }
  }
}


//query by text
//must use db.query() as opposed to db.scan()
/* const params = {
    // Specify which items in the results are returned.
    KeyConditionExpression: "commentId = :c and eventId = :e",
    FilterExpression: "#t = :t",
    // Set the projection expression, which the the attributes that you want.
    TableName: "dt_comments",
    ExpressionAttributeNames: {
      "#t": "text",
    },
    ExpressionAttributeValues: marshall({
      ":e": "e2",
      ":t": "Test",
      ":c": "2021-04-05T18:52:16.244Z" 
    }),
  }; */



