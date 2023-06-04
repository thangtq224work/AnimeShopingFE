const navBar = {
    en: {
        header: [
            {
                name: "Account",
                icon: "mdi-account",
                path: "",
                children: [
                    {
                        name: "Login",
                        icon: "1",
                        path: "/login",
                    },
                    {
                        name: "Logout",
                        icon: "2",
                        path: "/logout",
                    },

                ]
            },
            {
                name: "Cart",
                icon: "mdi-cart-outline",
                path: "/cart"
            },
        ],
        content: [
            {
                name: "Home",
                icon: "mdi-account",
                path: "/home",
                // children: [
                //     {
                //         name: "Login",
                //         icon: "",
                //         path: "",
                //     },
                //     {
                //         name: "Cart",
                //         icon: "",
                //         path: "",
                //     },

                // ]
            },
            {
                name: "About me",
                icon: "mdi-cart-outline",
                path: "/about-me"
            },{
                name: "Cart",
                icon: "mdi-cart-outline",
                path: "/cart"
            },
        ],
    },
    vi: {
        header: [
            {
                name: "Tài khoản",
                icon: "mdi-account",
                path: "",
                children: [
                    {
                        name: "Đăng nhập",
                        icon: "",
                        path: "",
                    },
                    {
                        name: "Đăng kí",
                        icon: "",
                        path: "",
                    },

                ]
            },
            {
                name: "Cart",
                icon: "mdi-cart-outline",
                path: "/gio-hang"
            },
        ],
        content: [
            {
                name: "Trang chủ",
                icon: "mdi-account",
                path: "/trang-chu",
                // children: [
                //     {
                //         name: "Login",
                //         icon: "",
                //         path: "",
                //     },
                //     {
                //         name: "Cart",
                //         icon: "",
                //         path: "",
                //     },

                // ]
            },
            {
                name: "Thông tin",
                icon: "mdi-cart-outline",
                path: "/thong-tin"
            },{
                name: "Giỏ hàng",
                icon: "mdi-cart-outline",
                path: "/gio-hang"
            },
        ],
    }
}
export default navBar;