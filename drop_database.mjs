// Import the MongoClient class from the mongodb library
import { MongoClient } from 'mongodb';

// **Important Note:**
// - Replace the following placeholders with your actual MongoDB Atlas connection details:
//   - `<username>`: Your MongoDB Atlas username
//   - `<password>`: Your MongoDB Atlas password
//   - `<cluster-name>`: Your MongoDB Atlas cluster name
const uri = `mongodb+srv://hassan:hassan@cluster0.h42mlqv.mongodb.net/ecommerce-dashboard`;

/**
 * This asynchronous function attempts to delete the 'ecommerce-dashboard' database
 * from your MongoDB Atlas cluster. It gracefully handles connection errors
 * and logs success or failure messages.
 *
 * **WARNING:** Deleting a database is permanent and cannot be undone.
 * Use this function with caution and ensure you have proper backups before proceeding.
 */
async function deleteDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas successfully!');

    const db = client.db('ecommerce-dashboard');

    // Attempt to drop the database
    await db.dropDatabase();
    console.log('Database "ecommerce-dashboard" dropped successfully!');
  } catch (error) {
    console.error('Error deleting database:', error);

    // **Troubleshooting Tips:**
    // - Double-check your MongoDB Atlas connection details (username, password, cluster name).
    // - Verify that your IP address is whitelisted in your cluster's network access settings.
    // - Ensure you have the necessary permissions to delete databases.
    // - If you're still encountering issues, consult the MongoDB documentation or reach out to MongoDB Atlas support.
  } finally {
    // Always close the connection, even if an error occurs
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

// Execute the deleteDatabase function and handle any potential errors
deleteDatabase().catch(console.error);
