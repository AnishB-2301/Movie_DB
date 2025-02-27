const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI; // MongoDB connection string
const dbName = process.env.MONGO_DB_NAME; // Database name
const collectionName = process.env.MONGO_COLLECTION_NAME; // Collection name

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function createCollection() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Define the schema for the collection
    const schema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['searchTerm', 'count', 'film_id', 'poster_url'],
          properties: {
            searchTerm: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            count: {
              bsonType: 'int',
              description: 'must be an integer and is required'
            },
            film_id: {
              bsonType: 'int',
              description: 'must be an integer and is required'
            },
            poster_url: {
              bsonType: 'string',
              description: 'must be a string and is required'
            }
          }
        }
      }
    };

    // Create the collection with the schema
    await db.createCollection(collectionName, schema);
    console.log(`Collection '${collectionName}' created with schema`);

  } catch (error) {
    console.error(`Error creating collection: ${error}`);
  } finally {
    await client.close();
  }
}

createCollection();