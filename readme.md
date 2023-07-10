
# Tuturial sequalize

Tuturial basico para el tener conocimientos basico en sequalize un ORM que permite a los usuarios llamar a funciones javascript para interactuar con SQL DB sin escribir consultas reales.

NOTA: Aunque usaremos sequalize-cli no incializaremos el proyecto con  
```shell
npx sequalize-cli init 
```
esto porque estaremos usandos ES6 y no CommonJS, tambien con el fin de entender la configuracion basica desde 0
## Comandos usados

### Instalacion

comenzamos con las dependencias necesarios para este tuturial

* Node v18.16.1
* Npm 9.5.1
* Mysql
* Apache

### Iniciamos el proyecto

```shell
npm init -y
```

### Instalacion de dependencias

```shell
npm i -E --save express mysql2 sequelize
```

### Dependencias de desarrollo
```shell
npm i -E -D nodemon
```

### Dependencias gobales
```shell
npm i -g sequelize-cli
```

## Configuracion inicial

luego de instalar todas las dependencias nuestos packeg.json debe verse de la siguiente forma

```json
{
  "name": "sequelize_test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "3.0.1"
  },
  "dependencies": {
    "express": "4.18.2",
    "mysql2": "3.5.0",
    "sequelize": "6.32.1"
  }
}

```

Extructura de carpetas

```shell
C:.
├───config
├───controllers
├───migrations
├───models
└───routes
```

Creareamos dos archivos importantes, el primero sera nuestra configuracion de la base de datos y el segundo la configuracion del sequelize-cli

En nuestra carpeta config creamos los archivos

```shell
config.json
database.js
```

#### config.json

este archivos guarda una configuracion necesaria para que el sequelize-cli puede conectarse a la base de datos

copia la siguiente configuracion y cambiala segun tu necesidad

```json
{
    "development": {
      "username": "root",
      "password": null,
      "database": "database_development_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
```

#### database.js

En este archivo tenemos la configuracion de conexion de sequelize, igualmente cambiala segun tu necesidad

```js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('database_development_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
```

Ya con esto contemos con una configuracion inicial para usar sequelize, para comprobarlo crearemos el archivos app.js con lo siguiente

```js
import sequelize from './config/database.js';

// Sincronizar la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    // Aquí puedes continuar con el código de tu aplicación
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
```

ya tenemos nuesta base de datos sincronizada correctamente con nuesto proyecto, vamos ahora a utilizarla


## Creacion de la base de datos

En nuestro mysql debemos crear la base de datos debe tener el mismo nombre que en nuestos archivos de configuracion

```sql
CREATE DATABASE databasename; 
```
Ahora crearemos la migraciones a la base de datos, para esto utilizaremos sequelize-cli

#### Crear migraciones

```shell
npx sequelize-cli migration:generate --name name_migracion

```
Creara un archivo en la carpeta migracions, en este archivo puedes crear una tabla para tu base de datos, puedes alterar tanto las columnas como sus tipos de datos.

este es un archivo de ejemplo, en el creamos una tabla llamada bodega 

* id Primary key
* name string
* userId init forange key

```js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bodegas", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name : {
        allowNull : false,
        type: Sequelize.STRING
      },
      userId : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bodegas");
  },
  
};

```
NOTA : Como no estamos usando commandjs tendremos que reenombrar el archivo y cambiar su extencion .js a .cjs

### Comandos para la migration

Lanzar la migracion

```shell
npx sequelize-cli db:migrate
```

Reverti migraciones

```shell
npx sequelize-cli db:migrate:undo:all
```

## Consumir la base de datos

Ya tenemos la o las tablas en nuestra base de datos asi que tenemos que consumirlas, para esto crearemos Modelos por cada tabla crea en nuesta base de datos, estos modelos se encargaran de gestionar los eventos

podemos crearlos con el Comando

```shell
npx sequelize-cli model:generate --name Model_name --attributes id:integer,fecha:date,cliente:string
```

cambia los parametros de attributes dependiendo de lo quue necesites, esto creara un archivo en la carpeta models con el modelo que especificaste, en este caso lo crea usando commandjs, por lo que puedes cambiar la extencion del archivo o cambiar unas cosas para que funcione con ES6

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Factura.init({
    id: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    cliente: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Factura',
  });
  return Factura;
};
```
con los cambios necesarios para que funcione en ES6 severia de la siguiente forma

```js
"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Factura = sequelize.define(
  "Factura",
  {
    id: {
      type: DataTypes.INTEGER,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    cliente: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Factura",
  }
);

export default Factura;

```

La ventaja mas grande de usar este comando es que crea el archivo de migracion con todos los campos del attributes

creamos un archivo donde haremos las operaciones basicas de un CRUD

```js
import Factura from "./models/factura.js";

// crea una factura

await Factura.create({
    id: 1,
    fecha: "2020-01-01",
    cliente: "Daniel"
});

// Obtener todas las facturas

try {
    const facturas = await Factura.findAll();
    const facturasData = facturas.map((factura) => factura.dataValues);
    console.log(facturasData);
} catch (error) {
    console.log(error);
}

// Actualizar la factura

await Factura.update(
    { fecha: "2020-04-01" },
    { where: { id: 1 } }
);

console.log('Factura updated');

try {
    const facturas = await Factura.findAll();
    const facturasData = facturas.map((factura) => factura.dataValues);
    console.log(facturasData);
} catch (error) {
    console.log(error);
}

// Eliminar una factura

await Factura.destroy({ where: { id: 1 } });

console.log( 'Factura destroyed');

try {
    const facturas = await Factura.findAll();
    const facturasData = facturas.map((factura) => factura.dataValues);
    console.log(facturasData);
} catch (error) {
    console.log(error);
}
```

## 🧠 Reto

Siguiendo el contenido de este repositorio crea con express las rutas para un CRUD, teniendo en cuenta las relaciones entre las tablas bodegas y users

## 🛠 Tecnologias
Nodejs, JavaScript, MySQL


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://dannkol.github.io/portafolios/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-manosalva-000b98242)


