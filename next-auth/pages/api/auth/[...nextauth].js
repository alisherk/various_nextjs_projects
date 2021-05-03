import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { db } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const queryParams = {
          IndexName: 'email_pk',
          KeyConditionExpression: 'email = :e',
          TableName: 'users-next-auth',
          ExpressionAttributeValues: marshall({
            ':e': credentials.email,
          }),
        };

        const marshalledData = await db.query(queryParams);
        if (!marshalledData.Items.length) {
          throw new Error('no user found');
        }

        const unmarshalledData = unmarshall(marshalledData.Items[0]);

        const isPasswordEqual = await verifyPassword(
          credentials.password,
          unmarshalledData.password
        );

        if (!isPasswordEqual) {
          throw new Error('Could not sign you in');
        }

        return { email: unmarshalledData.email };
      },
    }),
  ],
});
