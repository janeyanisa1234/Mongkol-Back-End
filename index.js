const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;
const uri = "mongodb+srv://jxaxhsirilux:Mongkol2567@mongkol-database.ch4vi.mongodb.net/";

// MongoDB Client and Database Reference
const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('Mongkol'); // Adjust to your actual database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(express.json());

// Color and Table Data
const colorMapping = {
  'ทุกโทนแดง': '#951519',
  'ทุกโทนเขียว': '#21723E',
  'ชมพูอ่อน': '#FFC0CB',
  'เขียวใบไม้': '#00A572',
  'ดำสนิท': 'black',
  'เทาดำ': '#555555',
  'ขาวบริสุทธิ์': 'white',
  'น้ำเงินเข้ม': '#003366',
  'ชมพูสด': '#FF69B4',
  'ชมพูบานเย็น': '#F27091',
  'ครีมอ่อน': '#DBCC90',
  'ครีมสะอาด': '#F4D25D',
  'ทอง': '#D1B654',
  'แดงเลือดหมู': '#8B0000',
  'แดงเลือดนก': '#A00020',
  'เงิน': '#BCC4C1',
  'น้ำตาลแดง': '#8B4513',
  'เหลืองสด': '#FFD700',
  'ม่วงเข้ม': '#800080',
  'ม่วงอ่อน': '#BD9DC2',
  'เขียวหยก': '#00796B',
  'ฟ้าอ่อน': '#ADD8E6',
  'น้ำตาลอ่อน': '#DCC169',
  'เหลืองอ่อน': '#FFFACD',
  'เขียวแก่': '#17372A',
  'ส้มสว่าง': '#F25821',
  'ฟ้ายีนส์': '#223640',
  'ชมพูกลีบบัว': '#DD6D91',
  'ม่วงลาเวนเดอร์': '#AC83A8',
  'เหลืองสว่าง': '#FFDE2C',
  'กรมท่า': '#1B2C55',
  'ม่วงทึบ': '#400643',
  'ฟ้าสดใส': '#7DBFB8',
  'เขียวพาสเทล': '#58986F',
  'น้ำตาลไหม้': '#522E1A',
  'เขียวเข้ม': '#17372A'
};

const tableData = {
  'วันอาทิตย์': {
    'เมตตามหานิยม': 'ทุกโทนแดง',
    'งานปัง': 'ชมพูอ่อน',
    'โชคดี': 'เขียวใบไม้',
    'โชคลาภเงินทอง': 'ดำสนิท เทาดำ',
    'ผู้ใหญ่เอ็นดู': 'เงิน ทอง',
    'สีกาลกิณี': 'น้ำเงินเข้ม'
  },
  // ... Other days omitted for brevity
};

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/tableData', (req, res) => {
  if (Object.keys(colorMapping).length > 0 || Object.keys(tableData).length > 0) {
    res.json({ colorMapping, tableData });
  } else {
    res.status(404).send("No data found");
  }
});

app.get('/data', async (req, res) => {
  try {
    const collection = db.collection('Crud'); // Use the already connected db
    const data = await collection.find({}).toArray(); // Fetch all documents
    console.log(data); // Log the retrieved data
    res.json(data); // Send data back as JSON
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server and connect to the database
app.listen(port, async () => {
  await connectDB(); // Ensure the database is connected before starting the server
  console.log(`App listening on port ${port}`);
});