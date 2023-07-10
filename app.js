import Express  from 'express';
import sequelize from './config/database.js';


import router from './routes/Routes.js';


// Sincronizar la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    // Aquí puedes continuar con el código de tu aplicación
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});


const app = Express();

const port = 3000;

app.use(Express.json());

app.listen(port , function () {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Definir las rutas
await app.use(router)

