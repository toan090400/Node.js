const Aggregate = require("../models/aggregateModel");
/*
  [
    {
      "pay": 100,
      "books": [
        "63316bd241e48859ea311814",
        "6333f9ed44a4092141c601fe"
      ],
      "user": "632ec62b92e5a5c65770ca94" user1
    },
    {
      "pay": 200,
      "books": [
        "6333f9ed44a4092141c601fe"
      ],
      "user": "632ec62b92e5a5c65770ca94" user1
    },
    {
      "pay": 50,
      "books": [
        "63316bd241e48859ea311814",
        "6333f9ed44a4092141c601fe"
      ],
      "user": "632ec6a592e5a5c65770ca97" user2
    },
    {
      "pay": 250,
      "books": [
        "63316bd241e48859ea311814"
      ],
      "user": "632ec6a592e5a5c65770ca97" user2
    },
    {
      "pay": 150,
      "books": [
        "63316bd241e48859ea311814"
      ],
      "user": "632ec6a592e5a5c65770ca97" user2
    }
  ]
  ---------------------------------------------------
  $group: nhóm các document theo điều kiện nhất định
  truy vấn:
  Aggregate.aggregate([
    {
      $group: {
        _id: "$user",
        total: { $sum: "$pay" },
      },
    }
  ]);
  kết quả
  [
    {
      "_id": "632ec62b92e5a5c65770ca94",
      "total": 300
    },
    {
      "_id": "632ec6a592e5a5c65770ca97",
      "total": 450
    }
  ]
  cách thức thực hiện:
  _id: "$user"
  + đầu tiên nó sẽ kiến coi có bao nhiêu user
  + ta có 2 user: (user1:632ec62b92e5a5c65770ca94) và (user2:632ec6a592e5a5c65770ca97)
  + chỉ được đặt _id (_id: "$user"), không thể đặt khắc (vd: user"$user",item"$user")
  total: { $sum: "$pay" },
  + cộng tất cả các pay của từng user: user1(100+200=300), user2(50+250+150+100=550)
  + total đc đặt khắc (vd: totalPay: { $sum: "$pay" },price: { $sum: "$pay" } )
  + $sum không thể thay đổi
  ---------------------------------------------
*/

exports.getAll = async (req, res) => {
  try {
    const match = await Aggregate.aggregate([
      // { $project: { _id: 0, pay: 1, books: 1, user: 1 } }, //$project : chỉ định các key mong muốn truy vấn.
      // { $match: { pay: 100 } }, //$match : chọn data mong muốn truy vấn.
      // { $skip: 2 }, // bỏ qua 2 data đầu tiên
      // { $limit: 2 }, //chỉ 2 data đầu tiên
      // { $sort: { createdAt: -1 } }, // lấy data theo thứ tự (tăng dần:1) hoặc (giảm dần:-1)
      // { $count: "total" }, //đếm xem có bao nhiêu data $count chỉ đi 1 mình
      // {
      //   $group: {
      //     _id: "$user",
      //     total: { $sum: "$pay" },
      //   },
      // },
    ]);

    res.status(200).json({ match });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.post = async (req, res) => {
  try {
    const aggregate = await Aggregate.create(req.body);

    res.status(200).json({ aggregate });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
