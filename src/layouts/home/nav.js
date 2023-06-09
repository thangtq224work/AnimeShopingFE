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
                        requireLogin:false
                    },
                    {
                        name: "Logout",
                        icon: "2",
                        path: "/logout",
                        requireLogin:true
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
                requireManagerRole:false
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
                path: "/about-me",
                requireManagerRole:false
            },
            {
                name: "Cart",
                icon: "mdi-cart-outline",
                path: "/cart",
                requireManagerRole:false
            },
            {
                name: "Manager",
                icon: "mdi-cart-outline",
                path: "/manager",
                requireManagerRole:true
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
                        path: "/dang-nhap",
                        requireLogin:false
                    },
                    {
                        name: "Đăng xuất",
                        icon: "",
                        path: "/dang-xuat",
                        requireLogin:true
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
                requireManagerRole:false
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
                path: "/thong-tin",
                requireManagerRole:false
            },
            {
                name: "Giỏ hàng",
                icon: "mdi-cart-outline",
                path: "/gio-hang",
                requireManagerRole:false
            },
            {
                name: "Quản lý",
                icon: "mdi-cart-outline",
                path: "/quan-ly",
                requireManagerRole:true
            },
        ],
    }
}
export default navBar;