const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;
const path = require("path");

const upload = require(`../helpers/upload.helper`).single("image");
const prisma = new PrismaClient();

exports.getAllFood = async (_, res) => {
  try {
    const dataFood = await prisma.food.findMany();
    res.status(200).json({ success: true, message: "Success load data Food", data: dataFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.findFood = async (req, res) => {
  try {
    const search = req.params.search;
    const dataFood = await prisma.food.findMany({
      where: {
        OR: [
          {
            id: isNaN(parseInt(search)) ? undefined : parseInt(search),
          },
          {
            name: {
              contains: search,
            },
          },
          {
            spicy_level: search,
          },
          {
            price: isNaN(parseInt(search)) ? undefined : parseInt(search),
          },
        ].filter(Boolean),
      },
    });

    if (dataFood.length == 0)
      return res
        .status(404)
        .json({ success: false, message: "Data Food not found", data: null });

    return res.status(200).json({
      success: true,
      data: dataFood,
      message: "Food has retrieved",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addFood = async (req, res) => {
  try {
    upload(req, res, async (error) => {
      if (error) return res.json({ message: error });

      if (!req.file)
        return res.json({ message: `Nothing to upload.` });

      const data = {
        name: req.body.name,
        spicy_level: req.body.spicy_level,
        price: parseInt(req.body.price),
        image: req.file.filename,
      };

      const result = await prisma.food.create({ data: data });
      res.status(200).json({
        status: true,
        data: {
          id: result.id,
          ...data,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
        message: "Food has created",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateFood = async (req, res) => {
  try {
    upload(req, res, async (error) => {
      if (error) return res.json({ message: error, data: null });

      const id = parseInt(req.params.id);
      const existingFood = await prisma.food.findUnique({ where: { id: id } });

      if (!existingFood) {
        return res.status(404).json({ message: "Food not found" });
      }

      const data = {
        name: req.body.name,
        spicy_level: req.body.spicy_level,
        price: parseInt(req.body.price),
      };

      if (req.file) {
        const oldImage = existingFood.image;
        const pathImages = path.join(__dirname, "../images", oldImage);

        try {
          await fs.unlink(pathImages);
        } catch (error) {
          console.error("Cannot delete images:", error);
        }

        data.image = req.file.filename;
      }

      const result = await prisma.food.update({
        where: { id: id },
        data: data,
      });
      res
        .status(200)
        .json({
          success: true,
          data: {
            id: result.id,
            ...data,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
          },
          message: "Food has updated",
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existingFood = await prisma.food.findUnique({ where: { id } });
    if (!existingFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    await prisma.food.delete({ where: { id } });
    const pathImages = path.join(__dirname, `../images`, existingFood?.image);
    try {
      await fs.access(pathImages);
      await fs.unlink(pathImages);
    } catch (error) {
      console.error(`Cannot delete images ${pathImages}.`, error);
    }
    res
      .status(200)
      .json({ success: true, data: existingFood, message: "Food has deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
