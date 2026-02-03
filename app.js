let stores = []

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

      card.innerHTML = `
        <img src="${store.image}">
        <div class="card-info">
          <h3>${store.name}</h3>
          <p>${store.type}</p>
        </div>
      `

      container.appendChild(card)
    })
}

document.getElementById("search").addEventListener("input", render)
