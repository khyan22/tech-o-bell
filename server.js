const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//handlebars
// TODO: uncomment |const exphbs = require('express-handlebars');
// todo: uncomment |const helpers = require('./utils/helpers');
// TODO: uncomment |const hbs = exphbs.create();
// todo: add "{ helpers }" to .create()
//routes
const routes = require('./routes');
const sequelize = require('./config/connection');
//server call and port
const app = express();
const PORT = process.env.PORT || 3001;

// TODO: uncomment |const sess = {
//   secret: 'super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// TODO: uncomment|app.use(session(sess));

// TODO: uncomment |app.engine('handlebars', hbs.engine);
// TODO: uncomment |app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//connects to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
});