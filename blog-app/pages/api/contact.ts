import { NextApiRequest, NextApiResponse } from "next";
import { db } from "./db";
import { marshall } from "@aws-sdk/util-dynamodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
    if (req.method === "POST") {

    const { email, name, message } = req.body;

    if (!email || !name || !message) {
      res.status(422).json({ message: "Bad request" });
      return;
    }
    try {
      const params = {
        TableName: "contacts-blog-app",
        Item: marshall({
          message,
          name,
          email,
        }),
      };
      await db.putItem(params);
      res.status(201).json({ message: "Stored a message" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
  } else {
    res.status(400).json({ message: "Request is unauthorized" });
    return;
  }
};
