const { request } = require('express');
const express = require('express' );
const app = express();
const hbs = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer');
const { env, getMaxListeners } = require('process');
require('dotenv').config();
//Config Mail//
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "miempresaxotic@gmail.com", // generated ethereal user
      pass: "megustalacarne", // generated ethereal password
    },
  });
  transporter.verify().then(()=>{
      console.log("Listo para enviar correo!");
  });
//Settings//
app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
    extended: false
}));

app.engine('.hbs', hbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get('views'),'layouts'),
    partialsDir : path.join(app.get('views'), 'partials'),
    extname :"hbs"
}));

const PORT = process.env.PORT || 3000;


app. get ('/',(req, res)=>{
    res.render('Xotic',{
        ruta:"/Styles/style.css"
    });
})

app. post ('/Contacto', async(req, res)=>{
     // send mail with defined transport object
    await transporter.sendMail({
    from: "miempresaxotic@gmail.com", // sender address
    to: "miempresaxotic@gmail.com", // list of receivers
    subject: `${req.body.fullname} Requere de su atención sobre ${req.body.asunto}`, // Subject line
    html: `<h1>Nombre:${req.body.fullname}</h1>
        <h1>Correo:${req.body.email}</h1>
        <h1>Telefono:${req.body.phone}</h1>
        <h1>Empresa:${req.body.empresa}</h1>
        <h1>Solicita la siguiente información:</h1>
    <h1>${req.body.message}</h1>` // html body
  });
    res.redirect('/');
})

app. use ((req, res)=>{
    res.render('404',{
        ruta:'/Styles/Estilos404.css'
    });
})

const port = process.env.PORT || 300;
app.listen(port, ()=>{
    console.log(app.get ('views'));
    console.log(`Server running on http://localhost:${port}`)
})