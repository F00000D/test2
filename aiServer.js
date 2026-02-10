const express = require("express")
const cors = require("cors")
const { Configuration, OpenAIApi } = require("openai")

require("dotenv").config() // 如果你把 API key 放在 .env

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // 你的 OpenAI API Key
})
const openai = new OpenAIApi(configuration)

// POST /chat
app.post("/chat", async (req, res) => {
  const { message } = req.body
  if (!message) return res.status(400).json({ error: "No message" })

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你是一個關於中原附近美食的餐廳助理。" },
        { role: "user", content: message }
      ],
      max_tokens: 200
    })

    const reply = completion.data.choices[0].message.content
    res.json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ reply: "AI 發生錯誤，請稍後再試。" })
  }
})

app.listen(PORT, () => {
  console.log(`AI server 啟動：http://localhost:${PORT}`)
})
