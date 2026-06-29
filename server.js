require('dotenv').config();
const app = require('./src/app');
const connectdb = require('./src/db/db');
const PORT = process.env.PORT || 3000;

// Connect to MongoDB before accepting incoming requests.
connectdb();

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
