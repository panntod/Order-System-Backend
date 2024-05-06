const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addOrder = async (req, res) => {
  try {
    const { customer_name, table_number, order_date, order_detail } = req.body;

    const newOrder = await prisma.order_List.create({
      data: {
        customer_name,
        table_number,
        order_date,
        order_details: {
          create: order_detail.map((detail) => ({
            food_id: detail.food_id,
            price: detail.price,
            qty: detail.quantity,
          })),
        },
      },
    });

    const data = {
      id: newOrder.id,
      customer_name: newOrder.customer_name,
      table_number: newOrder.table_number,
      order_date: newOrder.order_date,
      createdAt: newOrder.createdAt,
      updatedAt: newOrder.updatedAt,
    };

    res
      .status(201)
      .json({ status: true, data: data, message: "Order List has created" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllOrders = async (_, res) => {
  try {
    const data = await prisma.order_List.findMany({
      include: {
        order_details: true
      }
    });

    res.status(200).json({success: true, data: data, message: "Order list has retrieved"});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};