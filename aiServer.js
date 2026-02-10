const aiButton = document.getElementById("ai-button")
const aiChat = document.getElementById("ai-chat")
const aiInput = document.getElementById("ai-input")
const aiSend = document.getElementById("ai-send")
const aiOutput = document.getElementById("ai-output")

// 點擊圖標展開/收起
aiButton.onclick = () => {
  aiChat.style.display = aiChat.style.display === "flex" ? "none" : "flex"
}

// 發送訊息到 OpenAI 後端
aiSend.onclick = async () => {
  const question = aiInput.value.trim()
  if (!question) return
  aiOutput.innerHTML += `<p><b>Q:</b> ${question}</p>`

  try {
    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question })
    })
    const data = await res.json()
    aiOutput.innerHTML += `<p><b>A:</b> ${data.reply}</p><hr>`
    aiOutput.scrollTop = aiOutput.scrollHeight
  } catch(err) {
    aiOutput.innerHTML += `<p><b>A:</b> ? 發生錯誤</p><hr>`
  }

  aiInput.value = ""
}

// 按 Enter 也可以送出
aiInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") aiSend.click()
})
