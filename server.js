const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  next()
})


const stores = [
  {
    id: 1,
    name: "慕森",
    type: "早午餐",
    image: "https://linnote.com/wp-content/uploads/2024/03/zhongli-musen-brunch-8.webp",
    phone: "03-123-4567",
    price: "$$",
    time: "08:00 - 16:00",
    orderLink: "https://www.foodpanda.com.tw"
  },
  {
    id: 2,
    name: "Mint Pasta",
    type: "義式料理",
    image: "https://weiyu-life.com/wp-content/uploads/mint-21.jpg",
    phone: "03-222-2222",
    price: "$$$",
    time: "11:00 - 21:00",
    orderLink: "https://www.ubereats.com"
  }
]

// 👉 所有餐廳
app.get("/stores", (req, res) => {
  res.json(stores)
})

// 👉 單一家
app.get("/stores/:id", (req, res) => {
  const id = Number(req.params.id)
  const store = stores.find(s => s.id === id)
  res.json(store)
})

app.listen(PORT, () => {
  console.log("後端啟動：http://localhost:3000")
})
