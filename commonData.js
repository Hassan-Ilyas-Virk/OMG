// customers data
const customers = [
    {
        id: 1,
        name: "Dawood Qamar",
        email: "dawoodqamar@gmail.com",
        password: "password123",
        address: "H-11, FAST",
        preferences: ["Pakistani", "Japanese"]
    },
    {
        id: 2,
        name: "Zoya Sumbul",
        email: "zoyasumbul@nu.edu.pk",
        password: "password456",
        address: "A-307, FAST",
        preferences: ["Pakistani"]
    },
    {
        id: 3,
        name: "Hammad Zahid",
        email: "hammad.zahid@gmail.com",
        password: "password789",
        address: "UCT Phase II , Wah Cant",
        preferences: ["Pakistani"]
    }
];

// orders data
const orders = [
    {
        id: 1,
        customerId: 1,
        restaurantId: 1,
        items: [
            { menuItemId: 1, quantity: 2, name: "Pizza", price: 2000 },
            { menuItemId: 3, quantity: 1, name: "Anday Wala Burger", price: 150 }
        ],
        total: 2150,
        isPlaced: true,
        isDelivered: false,
        isCancelled: false
    },
    {
        id: 2,
        customerId: 2,
        restaurantId: 2,
        items: [
            { menuItemId: 1, quantity: 3, name: "Zinger Burger", price: 200 },
            { menuItemId: 2, quantity: 2, name: "Fried Fish", price: 350 }
        ],
        total: 550,
        isPlaced: true,
        isDelivered: false,
        isCancelled: false
    },
    {
        id: 3,
        customerId: 3,
        restaurantId: 3,
        items: [
            { menuItemId: 1, quantity: 1, name: "Burger", price: 350 },
            { menuItemId: 2, quantity: 1, name: "Fries", price: 200 },
            { menuItemId: 3, quantity: 2, name: "Coke", price: 100 }
        ],
        total: 650,
        isPlaced: true,
        isDelivered: false,
        isCancelled: false
    }
];


// restaurants data
const restaurants = [
    {
        id: 1,
        name: "Cheezious Co",
        cuisine: "Fast Food",
        address: "F11 markaz",
        isActive: true,
        menu: [
            { id: 1, name: "Special Pizza", price: 2000, description: "Cheezy special pizza, with cheese and more cheese and extra cheese" },
            { id: 2, name: "Loaded Fries", price: 200, description: "Fires loaded with sauce and chicken chunks" },
            { id: 3, name: "Burger", price: 350, description: "Burger with crispy chicken" }
        ]
    },
    {
        id: 2,
        name: "Burger Co",
        cuisine: "Fast Food",
        address: "F11 Markaz",
        isActive: true,
        menu: [
            { id: 1, name: "Special Pizza", price: 2000, description: "Cheezy special pizza, with cheese and more cheese and extra cheese" },
            { id: 2, name: "Loaded Fries", price: 200, description: "Fires loaded with sauce and chicken chunks" },
            { id: 3, name: "Karahi", price: 1500, description: "special chicken karahi" }
        ]
    },
    {
        id: 3,
        name: "Shah JEE",
        cuisine: "Desi",
        address: "I10 Markaz",
        isActive: false,
        menu: [
            { id: 1, name: "Special Chai", price: 80, description: "----" },
            { id: 2, name: "Daal Chawal", price: 220, description: "----" },
            { id: 3, name: "Biryani", price: 250, description: "----" }
        ]
    }
];

module.exports = customers;
module.exports = orders;
module.exports = restaurants; 