const express=require("express");
// const res = require("express/lib/response");
const path = require("path");
const app=express();
const port = 80;
const fs=require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gym');

//express stuff
app.use('/static',express.static('static')); // for serving static files
app.use(express.urlencoded({extended: true}));



// pug stuff

app.set('view engine', 'pug'); // set template engine as pug
app.set('views',path.join(__dirname,'views')) // set view directory


// mongoose stuff
const gymschema = new mongoose.Schema({
   name: String,
   age: String,
   gender: String,
   address:String,
   more: String

 });
 const gym = mongoose.model('gym', gymschema);
// end point
app.get('/',(req,res) => {
   const con='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque et ipsa autem..';
   const params={'title' : 'pug html','content':con};
   res.status(200).render('index.pug',params);
})

app.post('/',(req,res) => {
   form= req.body;
   console.log(form);
   const params={'message' : 'your form has been submitted successfully'};
   res.status(200).render('index.pug',params);

   // const out= `The name of the client is ${form.name} ,${form.age} years old, resides at ${form.address} and more about him/her : ${form.more}`;
   // fs.writeFileSync('output.txt',out);
   const entry=new gym({
      name: form.name,
      age: form.age,
      gender: form.gender,
      address: form.address,
      more: form.more
   });
   entry.save();
})


// set endpoint for pug demo endpoint
// app.get('/demo', function (req, res) {
//    res.status(200).render('demo', { title: 'Hey', message: 'Hello there!' })
//  })
// app.get('/',(req,res) => {
//    res.status(200).send("hello world");
// })

app.listen(port,()=>{
   console.log(`application started on port ${port}`);
})