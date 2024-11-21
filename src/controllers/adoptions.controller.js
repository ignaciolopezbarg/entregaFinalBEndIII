import { adoptionsService, petsService, usersService } from "../services/index.js"

// const getAllAdoptions = async(req,res)=>{
//     const result = await adoptionsService.getAll();
//     res.send({status:"success",payload:result})
// }
const getAllAdoptions = async (req, res) => {
    try {
        const result = await adoptionsService.getAll();
        console.log('Resultado de adoptionsService.getAll:', result); // Log para depurar
        res.send({ status: "success", payload: result });
    } catch (error) {
        console.error('Error al obtener adopciones:', error); // Captura errores
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};


const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    res.send({status:"success",payload:adoption})
}

const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"Usuario o mascota no encontrados"});
    const pet = await petsService.getBy({_id:pid});
    if(!pet) return res.status(404).send({status:"error",error:"Usuario o mascota no encontrados"});
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    res.status(201).send({status:"success",message:"Adopción creada con éxito"})
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}