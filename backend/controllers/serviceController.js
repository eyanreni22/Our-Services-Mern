const Service = require("../models/Service");

const createService = async (req, res) => {
  try {
    console.log("User from req:", req.user); 

    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Authentication required to create a service" });
    }
    const { name, description, category, price } = req.body;

    const service = new Service({
      name,
      description,
      category,
      price,
      provider: req.user._id,
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createService, getAllServices, getServiceById }; 
