// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require('express')
const engines = require('consolidate')

// let serviceAccount = require("./boston-certs.json");

admin.initializeApp(
  // {credential: admin.credential.cert(serviceAccount)}
);

const db = admin.firestore();

const app = express();

app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')
app.use(express.json());

app.listen(3000, function () {
  console.log('Aplicación escuchando en el puerto 3000');
});

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/submit/datos', async (req, res) => {
  let datos = [];
  await db.collection('contact-form')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        datos.push(doc.data())
      })
    })
    .catch(err => console.error(err))
  return res.json(datos)
});

app.post(('/send-mail'), async (req, res) => {
  console.log(req.body)
  return res.send(req.body)
})

app.post('/submit/data', async (req, res) => {
  let contacto = req.body;
  await db.collection('contact-form')
    .doc()
    .create({
      fecha: admin.firestore.FieldValue.serverTimestamp(),
      email: contacto.email,
      datos: {
        nombre: contacto.nombre,
        asunto: contacto.asunto,
        mensaje: contacto.mensaje
      }
    })
    .then(
      admin.firestore().collection('mail').add({
        to: 'contactform@bostoncelop.com.ar',
        message: {
          subject: contacto.asunto,
          text: 'Nombre y Apellido: ' + contacto.nombre + '\nEmail: ' + contacto.email + '\nMensaje: ' + contacto.mensaje,
          html: '<p>Nombre y Apellido: ' + contacto.nombre + '</p><p>Email: ' + contacto.email + '</p><p>Mensaje: ' + contacto.mensaje + '</p>',
        }
      })
    )
    .then(() => console.log('Queued email for delivery!'))
    .catch(err => res.status(500).send(err));
  return res.status(204).json({
    msg: 'mailing was sent OK'
  });
})

app.post('/test/mailjson', (req, res) => {
  let contact = {
    nombre: 'Dummy Name Test',
    asunto: 'Lorem ipsum',
    mensaje: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo fugit adipisci quibusdam ex est laborum nostrum numquam, dicta illo rerum.',
    mail: 'lorem@email.com'
  }
  admin.firestore().collection('mail').add({
      to: 'contactform@bostoncelop.com.ar',
      message: {
        subject: contact.asunto,
        text: 'Nombre y Apellido: ' + contact.nombre + '\nEmail: ' + contact.email + '\nMensaje: ' + contact.mensaje,
        html: '<h5>Nombre y Apellido: ' + contact.nombre + '</h5><h5>Email: ' + contact.email + '</h5><p>Mensaje: ' + contact.mensaje + '</p>',
      }
    })
    .then(() => console.log('Queued email for delivery!'))
    .catch(err => res.status(500).send(err));
  return res.send('mailing was sent OK')
})

app.post('/test/mailing', (req, res) => {
  admin.firestore().collection('mail').add({
      to: 'contactform@bostoncelop.com.ar',
      message: {
        subject: 'Hello from Firebase!',
        text: 'This is the plaintext section of the email body.',
        html: 'This is the <code>HTML</code> section of the email body.',
      }
    })
    .then(() => console.log('Queued email for delivery!'))
    .catch(err => res.status(500).send(err));
  return res.send('mailing ok')
});

exports.app = functions.https.onRequest(app);