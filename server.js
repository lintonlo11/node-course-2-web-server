const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //heroku else
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log( log );
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next(); // continue the next async
})

// make sure this is before all accesses
// app.use((req, res, next) =>{
//   res.render('maintain.hbs');
//   // stop here because missing next()
// })
// just comment out the above maint if necessary

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'linton',
  //   likes: [
  //     'cities',
  //     'Biking'
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my site'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear()
  });
})

app.get('/bad', (req, res) => {
  res.send({
    ErrorMessage: 'Unable to handle message'
  });
});

app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});
