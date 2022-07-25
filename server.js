const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//handlebars
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

//routes
const routes = require('./routes');
const sequelize = require('./config/connection');

//server call and port
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'super secret secret',
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: {
      expires: 1800000
  },
  store: new SequelizeStore({
      db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//connects to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
});