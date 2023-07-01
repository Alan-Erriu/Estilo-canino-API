import Dog from "../models/Dog";
//crear un nuevo perro asocioado a un dueño, este es obtenido por el middleware verifyToken----------------------------------------------------
export const createDog = async (req, res) => {
  try {
    const { name, age, breed } = req.body;
    const newDog = new Dog({
      name,
      age,
      breed,
      owner: req.userId, // previamente se guardo el id con el uso de verifyToken- nunca funcionara sin este.
    });
    const dog = await newDog.save();
    res.status(201).json({ message: "Dog successfully created", dog });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );
      res
        .status(400)
        .json({ message: "Validation Error", errors: validationErrors });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
  }
};
// obtener un perro por dogId (url)
export const getDogById = async (req, res) => {
  try {
    const dogId = req.params.dogId;

    const dog = await Dog.findOne({ _id: dogId });

    if (!dog) {
      return res.status(404).json({ message: "dog not found" });
    }

    res.json(dog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
//obtener todos los perros de un usario----------------------------------------
export const getDogsByOwnerId = async (req, res) => {
  try {
    const ownerId = req.userId; // previamente se guardo el id con el uso de verifyToken- nunca funcionara sin este.

    const dogs = await Dog.find({ owner: ownerId });

    res.json({ dogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
//Actualiza el perro con dos parametros, el dogId por parametro(url) y el dueño es obtenido mediante el verifyToken
export const UpdateDogById = async (req, res) => {
  try {
    const dogId = req.params.dogId;
    const userId = req.userId; // previamente se guardo el id con el uso de verifyToken- nunca funcionara sin este.

    const dog = await Dog.findOne({ _id: dogId, owner: userId });

    if (!dog) {
      return res.status(404).json({ message: "dog not found" });
    }

    dog.name = req.body.name || dog.name;
    dog.age = req.body.age || dog.age;
    dog.breed = req.body.breed || dog.breed;

    await dog.save();

    res.json({ message: "Dog updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
//borrar un perro, la funcion espera dos parametros:un dogId por url y el usario es obtenido con el middleware verfyToken
export const deleteDogById = async (req, res) => {
  try {
    const dogId = req.params.dogId;
    const userId = req.userId;

    const dog = await Dog.findOne({ _id: dogId, owner: userId });

    if (!dog) {
      return res.status(404).json({ message: "dog not found" });
    }

    await dog.deleteOne();

    res.json({ message: "Dog successfully removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

//esta funcion es para cuando el administrador quiere crear un turno para cualquier peluquero y cualquier usuario
export const getDogsByOwnerIdBody = async (req, res) => {
  try {
    const { ownerId } = req.body; // Obtén el ID del dueño del cuerpo de la solicitud

    const dogs = await Dog.find({ owner: ownerId });

    res.json({ dogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
