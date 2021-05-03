import { db } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
import { marshall } from '@aws-sdk/util-dynamodb';

export default async (req, res) => {
  try {
    if (req.method !== 'POST') return;
    const { email, password } = req.body;

    if (!email || !password || password.length < 4) {
      res.status(400).json({ error: 'Invalid params supplied' });
      return;
    }
    //query by global index allows up to omit specifying primary key in search params
    const queryParams = {
      IndexName: "email_pk",
      KeyConditionExpression: 'email = :e',
      TableName: 'users-next-auth',
      ExpressionAttributeValues: marshall({
        ':e': email,
      }), 
    };

    const data = await db.query(queryParams);
    
    if (data.Items.length) {
      res.status(400).json({ message: 'User has already created'})
      return;
    }

    const hashedPassword = await hashPassword(password);
    const params = {
      TableName: 'users-next-auth',
      Item: marshall({
        id: Math.random().toString(),
        email,
        password: hashedPassword,
      }),
    };
    await db.putItem(params);
    res.status(201).json({ message: 'created new user' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
