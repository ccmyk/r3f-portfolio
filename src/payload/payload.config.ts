// src/payload/payload.config.ts
import path from 'path'
import { buildConfig } from 'payload/config'

// We import the bundler and adapter we need
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

// Import all of our collections
import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'

export default buildConfig({
  // The admin panel configuration
  admin: {
    user: Users.slug,
    // We are explicitly telling Payload to use the webpack bundler for the best Next.js integration.
    bundler: webpackBundler(),
  },
  
  // The rich text editor to use in the admin panel
  editor: lexicalEditor({}),

  // An array of all your collections
  collections:,

  // This is the secret key used for authentication and encryption
  secret: process.env.PAYLOAD_SECRET |

| 'a-secret-key-to-get-started',

  // This tells Payload where to generate the TypeScript types for your collections
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  // This is the database adapter. We're using SQLite.
  db: sqliteAdapter({
    client: {
      // The DATABASE_URI is set in your.env file.
      // The `file:./r3f.db` is the default we set up.
      url: process.env.DATABASE_URI |

| 'file:./r3f.db',
    },
  }),

  // Sharp is used for high-performance image processing
  sharp,

  // We can add plugins here. For now, we'll keep it empty to keep things simple.
  plugins:,
})