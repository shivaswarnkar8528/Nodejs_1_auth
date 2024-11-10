//database connection
const mongoose = require('mongoose');
const db = process.env.URI;
mongoose.connect(db).then(() => console.log('Connected to database')).catch((err) => console.log(err));
module.exports = mongoose;