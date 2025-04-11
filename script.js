const menu = {
  1: { name: "🍕 Pizza", price: 150 },
  2: { name: "🍔 Burger", price: 100 },
  3: { name: "🍝 Masala Dosa", price: 80 },
  4: { name: "☕ Cold Coffee", price: 60 },
  5: { name: "🍦 Ice Cream", price: 70 }
};

let orders = [];

function goToMenu() {
  const name = document.getElementById("customerName").value.trim();
  const mobile = document.getElementById("mobileNumber").value.trim();

  if (name && mobile) {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");

    const menuContainer = document.getElementById("menuItems");
    menuContainer.innerHTML = "";

    Object.entries(menu).forEach(([id, item]) => {
      menuContainer.innerHTML += `
        <div class="menu-item">
          <span>${item.name} - Rs. ${item.price}</span>
          <input type="number" id="item${id}" placeholder="Qty" min="0" />
        </div>`;
    });
  } else {
    alert("Please fill in your name and mobile number.");
  }
}

function goToBill() {
  orders = [];
  let total = 0;

  Object.entries(menu).forEach(([id, item]) => {
    const qty = parseInt(document.getElementById("item" + id).value) || 0;
    if (qty > 0) {
      const subtotal = qty * item.price;
      orders.push({ name: item.name, qty, subtotal });
      total += subtotal;
    }
  });

  if (orders.length === 0) return alert("Please add at least one item!");

  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");

  let output = `<p><strong>Name:</strong> ${document.getElementById("customerName").value}</p>`;
  output += `<p><strong>Mobile:</strong> ${document.getElementById("mobileNumber").value}</p>`;
  output += `<table><tr><th>Item</th><th>Qty</th><th>Price</th></tr>`;
  orders.forEach(order => {
    output += `<tr><td>${order.name}</td><td>${order.qty}</td><td>Rs. ${order.subtotal}</td></tr>`;
  });
  output += `</table><h3>Total: Rs. ${total}</h3>`;
  document.getElementById("billOutput").innerHTML = output;
}

function showFeedback() {
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("step4").classList.remove("hidden");
}

function submitFeedback() {
  const feedback = document.getElementById("feedbackText").value.trim();
  if (feedback) {
    localStorage.setItem("feedback", feedback);
    alert("Thanks for your feedback!");
    location.reload();
  } else {
    alert("Please write some feedback.");
  }
}

function downloadBill() {
  const element = document.createElement("a");
  const bill = document.getElementById("billOutput").innerText;
  const file = new Blob([bill], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "TwinsCafe_Bill.txt";
  document.body.appendChild(element);
  element.click();
}
