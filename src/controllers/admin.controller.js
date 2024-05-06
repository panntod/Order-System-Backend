const { PrismaClient } = require("@prisma/client");
const { PasswordHashing } = require("../helpers/password.helper");
const prisma = new PrismaClient();

exports.getAllAdmin = async (_, res) => {
  try {
    const dataAdmin = await prisma.admin.findMany();
    res
      .status(200)
      .json({ message: "Success load data admin", data: dataAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

exports.findAdmin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataAdmin = await prisma.admin.findUnique({ where: { id: id } });
    if(!dataAdmin) return res.status(404).json({ message: "Data admin not found", data: null})
    res
      .status(200)
      .json({ message: "Success load data admin", data: dataAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: await PasswordHashing(req.body.password),
      name: req.body.name,
    };
    await prisma.admin.create({ data: data });
    res.status(200).json({ message: "Success create data admin", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existingAdmin = await prisma.admin.findUnique({ where: { id: id } });
    
    if (!existingAdmin) {
      return res.status(404).json({ message: "admin not found", data: null });
    }

    const data = {
      email: req.body.email,
      password: await PasswordHashing(req.body.password),
      name: req.body.name,
    };
    await prisma.admin.update({ where: { id: id }, data: data });
    res.status(200).json({ message: "Success update data admin", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

exports.deleteadmin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existingAdmin = await prisma.admin.findUnique({ where: { id } });
    if (!existingAdmin) {
      return res.status(404).json({ message: "admin not found", data: null });
    }
    await prisma.admin.delete({ where: { id } });
    res.status(200).json({ message: "Success delete data admin", data: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};
