let stores = []
let likedStores = JSON.parse(localStorage.getItem("likedStores")) || []

fetch("http://localhost:3000/stores")
  .then(res => res.json())
  .then(data => {
    stores = data
    render()
  })
  .catch(err => {
    console.error("抓資料失敗", err)
  })

function render() {
  const keyword = document.getElementById("search").value
  const container = document.getElementById("cards")
  container.innerHTML = ""

  stores
    .filter(s => s.name.includes(keyword) || s.type.includes(keyword))
    .forEach(store => {
      const card = document.createElement("div")
      card.className = "card"

      card.onclick = () => {
        window.location.href = `detail.html?id=${store.id}`
      }

      const isLiked = likedStores.includes(store.id)

      card.innerHTML = `
        <div class="heart">${isLiked ? "❤️" : "🤍"}</div>
        <img src="${store.image}">
        <div class="card-info">
          <h3>${store.name}</h3>
          <p>${store.type}</p>
        </div>
      `

    card.querySelector(".heart").onclick = e => {
      e.stopPropagation() // 防止點心跳到 detail page

      if (likedStores.includes(store.id)) {
        likedStores = likedStores.filter(id => id !== store.id)
      } else {
        likedStores.push(store.id)
      }

      localStorage.setItem("likedStores", JSON.stringify(likedStores))
      render()
    }
      container.appendChild(card)
    })
}

document.getElementById("search").addEventListener("input", render)
