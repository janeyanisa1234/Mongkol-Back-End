const express = require('express');
const bodyParser = require ('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
   /*"Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE", */
  );
  next();
});
app.use(express.json())
//ตัวแปรที่เก็บ Products, วันที่?

/* 
  var con = mysql.createConnection({
  host: "korawit.ddns.net",
  user: "webapp",
  password: "secret",
  port: "3307",
  database: "shop",
}); 
*/

con.connect(function(err){
  if(err) throw err;
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products',(req,res)=>{

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
