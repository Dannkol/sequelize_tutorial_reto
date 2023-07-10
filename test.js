// import User from "./models/User.js";
// import Bodega from "./models/Bodega.js";

// // Crear nuevos datos
// await User.create({
//   id: 2,
//   firstName: "dadsa",
//   lastName: "msen",
//   email: "dadas@coreo.com",
// });
// // await Bodega.create({
// //   name: "bodega norte",
// //   userId: 1,
// // });

// // Obtener el usuario y la bodega

// await User.update(
//   { firstName: "daniel", lastName: "manosalva" },
//   { where: { id: 1 } }
// );

// try {
//   const bodegas = await Bodega.findAll({ include: "User" });
//   const bodegasData = bodegas.map((bodega) => bodega.dataValues);
//   console.log(bodegasData);
// } catch (error) {
//   console.log(error);
// }


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