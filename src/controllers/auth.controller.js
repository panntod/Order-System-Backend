const { PrismaClient } = require("@prisma/client");
const { PasswordCompare } = require("../helpers/password.helper");
const { GenerateToken } = require("../helpers/token.helper");
const prisma = new PrismaClient();

exports.authentication = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExistingAdmin = await prisma.admin.findUnique({
      where: { email: email },
    });
    if (!isExistingAdmin)
      return res.status(404).json({ message: "Admin not found", data: null });
    const isValidPassword = await PasswordCompare(
      password,
      isExistingAdmin.password
    );
    if (!isValidPassword)
      return res
        .status(404)
        .json({ message: "Incorrect Password", data: null });
    const data = {
      id: isExistingAdmin.id,
      email: isExistingAdmin.email,
      createdAt: isExistingAdmin.createdAt,
      updatedAt: isExistingAdmin.updatedAt,
    };
    const token = GenerateToken(data);
    return res
      .status(200)
      .json({
        status: true,
        logged: true,
        message: "Login successfully",
        data: { ...data, token: token },
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", data: null });
  }
};
