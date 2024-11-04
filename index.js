const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5001;

// MongoDB URI and client setup
const uri = "mongodb+srv://jxaxhsirilux:Mongkol2567@mongkol-database.ch4vi.mongodb.net/";
const client = new MongoClient(uri);
let db;

// Function to connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db('Mongkol'); // Replace with your database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!'); // ข้อความต้อนรับ สามารถเปลี่ยนเป็นข้อมูลอื่นตามต้องการ
});


// Sample colorMapping and tableData
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
  'วันจันทร์': {
    'เมตตามหานิยม': 'ขาวบริสุทธิ์ ครีมอ่อน',
    'งานปัง': 'เขียวแก่',
    'โชคดี': 'ม่วงอ่อน ดำสนิท เทาดำ',
    'โชคลาภเงินทอง': 'ส้มสว่าง น้ำตาลอ่อน',
    'ผู้ใหญ่เอ็นดู': 'ฟ้ายีนส์',
    'สีกาลกิณี': 'แดงเลือดนก'
  },
  'วันอังคาร': {
    'เมตตามหานิยม': 'ชมพูกลีบบัว',
    'งานปัง': 'ม่วงลาเวนเดอร์ เทาดำ',
    'โชคดี': 'ส้มสว่าง น้ำตาลอ่อน',
    'โชคลาภเงินทอง': 'เงิน ทอง',
    'ผู้ใหญ่เอ็นดู': 'แดงเลือดหมู',
    'สีกาลกิณี': 'เหลืองสว่าง'
  },
  'วันพุธ': {
    'เมตตามหานิยม': 'ทุกโทนเขียว',
    'งานปัง': 'ส้มสว่าง น้ำตาลอ่อน',
    'โชคดี': 'เงิน ทอง',
    'โชคลาภเงินทอง': 'ฟ้าอ่อน กรมท่า',
    'ผู้ใหญ่เอ็นดู': 'ขาวบริสุทธิ์ ครีมอ่อน',
    'สีกาลกิณี': 'ชมพูสด ชมพูบานเย็น'
  },
  'วันพฤหัสบดี': {
    'เมตตามหานิยม': 'ส้มสว่าง น้ำตาลอ่อน',
    'งานปัง': 'ฟ้าอ่อน',
    'โชคดี': 'ทุกโทนแดง',
    'โชคลาภเงินทอง': 'เหลืองสว่าง ครีมสะอาด',
    'ผู้ใหญ่เอ็นดู': 'ทุกโทนเขียว',
    'สีกาลกิณี': 'ดำสนิท ม่วงทึบ'
  },
  'วันศุกร์': {
    'เมตตามหานิยม': 'ฟ้าสดใส น้ำเงินเข้ม',
    'งานปัง': 'เหลืองสว่าง ขาวบริสุทธิ์',
    'โชคดี': 'ชมพูอ่อน',
    'โชคลาภเงินทอง': 'เขียวพาสเทล',
    'ผู้ใหญ่เอ็นดู': 'ส้มสว่าง น้ำตาลอ่อน',
    'สีกาลกิณี': 'เงิน น้ำตาลไหม้'
  },
  'วันเสาร์': {
    'เมตตามหานิยม': 'ม่วงอ่อน ดำสนิท เทาดำ',
    'งานปัง': 'เงิน น้ำตาลไหม้',
    'โชคดี': 'ฟ้าสดใส น้ำเงินเข้ม',
    'โชคลาภเงินทอง': 'ทุกโทนแดง',
    'ผู้ใหญ่เอ็นดู': 'ชมพูกลีบบัว',
    'สีกาลกิณี': 'เขียวเข้ม'
  }
};

// Existing route for tableData (used by front-end)
app.get('/tableData', (req, res) => {
  if (Object.keys(colorMapping).length > 0 || Object.keys(tableData).length > 0) {
    res.json({ colorMapping, tableData });
  } else {
    res.status(404).send("No data found");
  }
});

// New MongoDB data route
app.get('/data', async (req, res) => {
  try {
    const collection = db.collection('Crud');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server and connect to MongoDB
app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening on port ${port}`);
});
