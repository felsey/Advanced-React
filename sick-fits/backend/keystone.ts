import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';

import 'dotenv/config';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 60, // how long should they stay signed in currently set to 60 days
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User', // Lists are datasets
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in initial roles
  },
  // By adding passwordResetLink we get access to a new mutation called sendUserPasswordResetLink
  passwordResetLink: {
    async sendToken(args) {
      // Send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // schema items go in here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // TODO: change this for role
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log({ session });
        !!session?.data,
      // isAccessAllowed: () => true, // this will allow anypne to login. Use this if auth gets messed up
    },

    // TODO: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email',
    }),
  })
);
