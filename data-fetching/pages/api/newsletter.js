import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { db } from './db';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    const params = {
      TableName: "dt_emails",
      Item: {
        email_id: { S: (Math.floor(Math.random() * 1000)).toString() },
        email: { S: userEmail },
      },
    };
    await db.send(new PutItemCommand(params));
    res.status(201).json({ message: "We are registered" });
  } else {
    res.status(401).json({ message: "Request is anuthorized" });
  }
}
