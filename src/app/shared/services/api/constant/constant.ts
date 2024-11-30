export const Constant = {
    API_URL: 'https://localhost:7258/api/v5/',

    API_RESOURCES: {
        AUTH: {
            LOGIN: 'Auth/login',
            REGISTER: 'Auth/register',
            PROFILE: 'Auth/Profile',
        },
        PRODUCTS: {
            GET_ALL: `Products`,
            GET_BY_ID: (id: string) => `Products/${id}`,
            GET_By_ID_FOR_CUSTOMER: (id: string) => `Products/Customer/${id}`,
        },
        CATEGORIES: {
            GET_ALL: `Categories`,
            GET_BY_ID: (id: string) => `Categories/${id}`,
        },
        ORDERS: {
            GET_ALL: `Orders`,
            GET_BY_ID: (id: string) => `Orders/${id}`,
        },
        ORDER_ITEMS: {
            GET_ALL: `OrderItems`,
            GET_BY_ID: (id: string) => `OrderItems/${id}`,
            GET_BY_ORDER_ID: (orderId: string) => `OrderItems/Order/${orderId}`,
        },
        USERS: {
            GET_ALL: `Users`,
            GET_BY_ID: (id: string) => `Users/${id}`,
            LOCK_OR_UNLOCK: (id: string) => `Users/Lockout?userId=${id}`,
        },
        CART: {
            GET_BY_USER: `Carts`,
            ADD_TO_CART: `Carts/AddToCart`,
            REMOVE_TO_CART: (cartItemId: string) => `Carts/RemoveToCart?cartItemId=${cartItemId}`,
            CHECKOUT_CART: `Carts/Checkout`,
        },
    },
}