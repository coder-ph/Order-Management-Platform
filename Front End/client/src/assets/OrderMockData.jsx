// mockData.js - Mock data for user profile and orders
export const currentUser = {
    address: '1942 Main Street, Nakuru',
    fullName: 'Chris Brown',
    email: 'chrisB@gmail.com',
    phoneNumber: '0700234786',
    profilePicture: '/api/placeholder/80/80'
};

export const orderHistory = [
    { 
        id: 1, 
        orderNumber: "ORD-2025001", 
        date: "2025-02-28", 
        status: "Delivered", 
        total: "$125.50",
        products: [
            { id: 101, name: "Wireless Headphones", price: "$79.99", quantity: 1, image: "/api/placeholder/80/80" },
            { id: 102, name: "Phone Case", price: "$45.51", quantity: 1, image: "/api/placeholder/80/80" }
        ],
        shippingAddress: "1942 Main Street, Nakuru",
        paymentMethod: "Credit Card"
    },
    { 
        id: 2, 
        orderNumber: "ORD-2025002", 
        date: "2025-02-15", 
        status: "Canceled", 
        total: "$85.20",
        products: [
            { id: 201, name: "Smart Watch", price: "$85.20", quantity: 1, image: "/api/placeholder/80/80" }
        ],
        shippingAddress: "1942 Main Street, Nakuru",
        paymentMethod: "PayPal"
    },
    { 
        id: 3, 
        orderNumber: "ORD-2025003", 
        date: "2025-03-01", 
        status: "Ongoing", 
        total: "$210.75",
        products: [
            { id: 301, name: "Tablet", price: "$199.99", quantity: 1, image: "/api/placeholder/80/80" },
            { id: 302, name: "Screen Protector", price: "$10.76", quantity: 1, image: "/api/placeholder/80/80" }
        ],
        shippingAddress: "1942 Main Street, Nakuru",
        paymentMethod: "Credit Card"
    },
    { 
        id: 4, 
        orderNumber: "ORD-2025004", 
        date: "2025-01-20", 
        status: "Delivered", 
        total: "$45.99",
        products: [
            { id: 401, name: "Bluetooth Speaker", price: "$45.99", quantity: 1, image: "/api/placeholder/80/80" }
        ],
        shippingAddress: "1942 Main Street, Nakuru",
        paymentMethod: "M-Pesa"
    },
    { 
        id: 5, 
        orderNumber: "ORD-2025005", 
        date: "2025-02-25", 
        status: "Ongoing", 
        total: "$150.30",
        products: [
            { id: 501, name: "Wireless Charger", price: "$35.50", quantity: 1, image: "/api/placeholder/80/80" },
            { id: 502, name: "Power Bank", price: "$89.99", quantity: 1, image: "/api/placeholder/80/80" },
            { id: 503, name: "USB Cable", price: "$24.81", quantity: 1, image: "/api/placeholder/80/80" }
        ],
        shippingAddress: "1942 Main Street, Nakuru",
        paymentMethod: "Credit Card"
    },
];