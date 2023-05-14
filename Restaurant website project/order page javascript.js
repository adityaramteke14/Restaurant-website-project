// Define the menu items
const menuItems = [
  {
    name: 'Burger',
    description: 'A juicy beef burger with lettuce, tomato, and cheese.',
    price: 200.00,
  },
  {
    name: 'Pizza',
    description: 'A classic cheese pizza with tomato sauce and mozzarella cheese.',
    price: 300.00,
  },
  {
    name: 'Salad',
    description: 'A fresh salad with mixed greens, tomatoes, cucumbers, and croutons.',
    price: 100.00,
  },
  {
    name: 'Risotto',
    description: 'This creamy rice dish is a popular Italian comfort food.',
    price: 400.00,
  },
  {
    name: 'Gelato',
    description: 'This Italian-style ice cream is known for its smooth texture and intense flavors.',
    price: 300.00,
  },
  {
    name: 'Minestrone Soup',
    description: 'This hearty vegetable soup is often made with beans, pasta, and a variety of vegetables.',
    price: 250.00,
  },
];

// Get DOM elements
const menu = document.querySelector('.menu');
const orderTotal = document.querySelector('.order-total');
const orderButton = document.querySelector('.order button');

// Initialize items array
let items = [];

// Update the order total
function updateOrderTotal() {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  orderTotal.textContent = '₹' + total.toFixed(2);
  if (total > 0) {
    orderButton.disabled = false;
  } else {
    orderButton.disabled = true;
  }
}

// Update the quantity of an item
function updateQuantity(e) {
  const button = e.target;
  const menuItem = button.closest('.menu-item');
  const quantityValue = menuItem.querySelector('.quantity-value');
  const itemIndex = items.findIndex(item => item.name === menuItem.querySelector('h3').textContent);
  if (button.classList.contains('plus')) {
    // Add item to order
    if (itemIndex === -1) {
      items.push({
        name: menuItem.querySelector('h3').textContent,
        description: menuItem.querySelector('.description').textContent,
        price: parseFloat(menuItem.querySelector('.price').textContent.slice(1)),
        quantity: 1,
      });
    } else {
      // Increment item quantity
      items[itemIndex].quantity += 1;
    }
    // Update quantity value
    quantityValue.textContent = items[itemIndex].quantity;
  } else if (button.classList.contains('minus')) {
    // Decrement item quantity
    if (itemIndex !== -1) {
      if (items[itemIndex].quantity > 0) {
        items[itemIndex].quantity -= 1;
        quantityValue.textContent = items[itemIndex].quantity;
        if (items[itemIndex].quantity === 0) {
          // Remove item from order if quantity is zero
          items.splice(itemIndex, 1);
        }
      }
    }
  }
  updateOrderTotal();
}

// Add event listeners
menu.addEventListener('click', updateQuantity);
orderButton.addEventListener('click', placeOrder);
