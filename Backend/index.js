const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Client, Databases, ID, Query } = require('appwrite');

const app = express();
const port = process.env.PORT || 5000;

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(client);

app.use(cors());
app.use(express.json());