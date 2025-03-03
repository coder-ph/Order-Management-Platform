export const mockDataOrders = [
    {
        id: 1,
        customer: "Monkey D. Luffy",
        user_id: 101, 
        total_amount: 1000,
        status: "Pending",
        email: "strawhat@onepiece.com",
        phone: "(123) 456-7890",
        address: "Thousand Sunny, Grand Line",
        avatar: "https://via.placeholder.com/150",
        order_items: [
            { product_id: 201, quantity: 1, price: 1000 }
        ],
        invoices: [
            { amount_due: 1000, status: "Unpaid", due_date: "2025-03-10" }
        ]
    },
    {
        id: 2,
        customer: "Roronoa Zoro",
        user_id: 102,
        total_amount: 4371.5,
        status: "Processed",
        email: "mosshead@onepiece.com",
        phone: "(987) 654-3210",
        address: "Kuraigana Island, East Blue",
        avatar: "https://via.placeholder.com/150",
        order_items: [
            { product_id: 202, quantity: 2, price: 4271.5 },
            { product_id: 203, quantity: 3, price: 100 }
        ],
        invoices: [
            { amount_due: 8543, status: "Unpaid", due_date: "2025-03-12" }
        ]
    },
    {
        id: 3,
        customer: "Vinsmoke Sanji",
        user_id: 103,
        total_amount: 1571,
        status: "Delivered",
        email: "curlybrows@onepiece.com",
        phone: "(555) 789-1234",
        address: "Baratie, East Blue",
        avatar: "https://via.placeholder.com/150",
        order_items: [
            { product_id: 204, quantity: 4, price: 392.75 }
        ],
        invoices: [
            { amount_due: 1571, status: "Unpaid", due_date: "2025-03-15" }
        ]
    },
    {
        id: 4,
        customer: "Portgas D. Ace",
        user_id: 104,
        total_amount: 446,
        status: "Pending",
        email: "ace@onepiece.com",
        phone: "(342) 444-3331",
        address: "Goa Kingdom, East Blue",
        avatar: "https://via.placeholder.com/150",
        order_items: [
            { product_id: 205, quantity: 2, price: 223 }
        ],
        invoices: [
            { amount_due: 446, status: "Paid", due_date: "2025-03-05" }
        ]
    },
    {
        id: 5,
        customer: "Trafalgar D. Law",
        user_id: 105,
        total_amount: 989,
        status: "Processed",
        email: "traffy@onepiece.com",
        phone: "(673) 543-2430",
        address: "Flevance, North Blue",
        avatar: "https://via.placeholder.com/150",
        order_items: [
            { product_id: 206, quantity: 3, price: 989 }
        ],
        invoices: [
            { amount_due: 989, status: "Paid", due_date: "2025-03-01" }
        ]
    },
    {
        id: 6,
        customer: "Nico Robin",
        user_id: 106,
        total_amount: 33730,
        status: "Delivered",
        email: "nicorobin@onepiece.com",
        phone: "(896) 675-3490",
        address: "Ohara, West Blue",
        avatar: "https://via.placeholder.com/150",
        order_items: [
            { product_id: 207, quantity: 12, price: 2810.83 }
        ],
        invoices: [
            { amount_due: 33730, status: "Unpaid", due_date: "2025-03-20" }
        ]
    }
];
