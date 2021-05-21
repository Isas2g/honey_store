const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const fs = require('fs');

async function sendEmail(name, surname, email, tel, country, city, address, sum, order) {
  // let testEmailAccount = await nodemailer.createTestAccount();
  try {
      let transporter = await nodemailer.createTransport({
          service: "Mail.ru",
          auth: {
          user: 'sokolovskyinprison@list.ru',
          pass: 'darsiktop228'
          }
      });
  
      let result = await transporter.sendMail({
          from: '"Honey Store" <sokolovskyinprison@list.ru>',
          to: "parabell241@gmail.com",
          // to: "parabell241@gmail.com",
          subject: 'Письмо от клиента Honey Store',
          text: `Имя: ${name}\n
          Фамилия: ${surname}\n
          Почта: ${email}\n
          Номер телефона: ${tel}\n
          Страна: ${country}\n
          Город: ${city}\n
          Адрес: ${address}\n
          Сумма: ${sum}
          Заказ: ${order}\n`
      });
  
      console.log(result);
  }
  catch(e) {
      console.log(e);
  }
  
}

router.get('/sendEmail', async(req, res) => {
  try {
    let firstName = req.query.firstName,
    surname = req.query.surname,
    email = req.query.email,
    tel = req.query.tel,
    country = req.query.country,
    city = req.query.city,
    address = req.query.address,
    sum = req.query.sum,
    order = req.query.order;

  await sendEmail(firstName, surname, email, tel, country, city, address, sum, order);

  res.status(200).send('Okay');
  } catch (e) {
    res.status(400).send('Not okay');
  }
});
// Main page route
router.get('/', (req, res) => {
  res.render('index', {});
});
// Catalog page route
router.get('/store', (req, res) => {
  res.render('store', {});
});
// Cart page route
router.get('/cart', (req, res) => {
  res.render('cart', {});
});
// Product page route
router.get('/card', async(req, res) => {

  let productName = req.query.name;

  await fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
      res.status(400).send('Ошибка')
    } else {
      let products = JSON.parse(data);

      for (let i = 0; i < products.length; i++) {
        if (products[i].name === productName) {
          res.render('card', {
            name: products[i].name,
            price: products[i].price,
            discount: products[i].discount,
            fullPrice: products[i].price + products[i].discount, 
            description: products[i].description, 
            category: products[i].category,
            id: req.query.id
          });
        }
      }
    }
  });

  
});
// Product page route
router.get('/ordering', (req, res) => {
  res.render('ordering', {});
});


router.get('/getProducts', (req, res) => {
  fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
      res.status(400).send('Ошибка');
  } else {
    res.json(JSON.parse(data));
  }
  });
});



module.exports = router;