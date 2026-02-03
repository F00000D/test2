let stores = []
let likedStores = JSON.parse(localStorage.getItem("likedStores")) || []

fetch("http://localhost:3000/stores")
  .then(res => res.json())
  .then(data => {
    stores = data
    render()
  })
  .catch(err => {
    console.error("後端連接失敗", err)
  })

function render() {
  const keyword = document.getElementById("search").value
  const container = document.getElementById("cards")
  container.innerHTML = ""

  stores
  .sort((a,b) => (likedStores.includes(b.id) ? 1 : 0) - (likedStores.includes(a.id) ? 1 : 0))
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
      e.stopPropagation()
      if (likedStores.includes(store.id)) {
        likedStores = likedStores.filter(id => id !== store.id)
      } else {
        likedStores.push(store.id)
      }
      localStorage.setItem("likedStores", JSON.stringify(likedStores))
      render() // render 之後會自動排序到最前
    }

    container.appendChild(card)
  })

}

document.getElementById("search").addEventListener("input", render)
