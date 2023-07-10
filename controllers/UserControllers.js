import User from "../models/User.js";
import Bodega from "../models/Bodega.js";

export default {
  async findAll() {
    const user = await User.findByPk(1);

    const bodega = await Bodega.create({
      name: "norte este",
    });
    
    console.log( await user);

    await user.addBodega(bodega); // Asocia la bodega al usuario
    
    user = await User.findByPk(1, {
        include: Bodega // Incluye el modelo de Bodega en la consulta
      });
      
    const bodegas = user.Bodegas; // Accede a las bodegas asociadas al usuario
      

    return await bodegas;
  },
};
