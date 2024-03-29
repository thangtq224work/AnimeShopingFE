const nav = {

    en:{
        side_bar: {
            name: "Admin",
            icon: "fa-solid fa-user-secret",
            path: "/manager"
        },
        nav_content: [
            {
                name: "Statistical",
                icon: " mdi-chart-bar",
                path: "/statistical",
            },
            {
                name: "Employee manager",
                icon: "mdi-account-multiple",
                path: "/employee-manager",
            },
            {
                name: "Product property",
                icon: "mdi-tag-multiple",
                path: "/property",
                children:[
                    {
                        name: "Category",
                        icon: "mdi-account-circle",
                        path: "/category"
                    },{
                        name: "Material",
                        icon: "mdi-chevron-left",
                        path: "/material"
                    },{
                        name: "Type product",
                        icon: "mdi-chevron-left",
                        path: "/type-product"
                    },
                    {
                        name: "Supplier",
                        icon: "mdi-chevron-left",
                        path: "/supplier"
                    },
                    // {
                    //     name: "Property",
                    //     icon: "mdi-chevron-left",
                    //     path: "/property"
                    // },
                ]
            },
            {
                name: "Product",
                icon: "mdi-toolbox",
                path: "/product",
            },
            {
                name: "Discount",
                icon: "mdi-sale",
                path: "/discount",
            },
            {
                name: "Order",
                icon: "mdi-clipboard-list-outline",
                path: "/order-manager"
            },
        ],
        nav_footer: {
            name: "Home",
            icon: "mdi-arrow-left",
            path: "/"
        },
    },
    vi:{
        side_bar: {
            name: "Admin",
            icon: "fa-solid fa-user-secret",
            path: "/quan-ly"
        },
        nav_content: [
            {
                name: "Thống kê",
                icon: " mdi-chart-bar",
                path: "/thong-ke",
            },
            {
                name: "Quản lý nhân viên",
                icon: "mdi-account-multiple",
                path: "/quan-ly-nhan-vien",
            },
            {
                name: "Thuộc tính sản phẩm",
                icon: "mdi-tag-multiple",
                path: "/thuoc-tinh",
                children:[
                    {
                        name: "Danh mục",
                        icon: "mdi-account-circle",
                        path: "/danh-muc"
                    },{
                        name: "Chất liệu",
                        icon: "mdi-chevron-left",
                        path: "/chat-lieu"
                    },{
                        name: "Loại sản phẩm",
                        icon: "mdi-chevron-left",
                        path: "/loai-san-pham"
                    },
                    {
                        name: "Nhà cung cấp",
                        icon: "mdi-chevron-left",
                        path: "/nha-cung-cap"
                    },
                    // {
                    //     name: "Thuộc tính",
                    //     icon: "mdi-chevron-left",
                    //     path: "/thuoc-tinh"
                    // },
                ]
            },
            {
                name: "Sản phẩm",
                icon: "mdi-toolbox",
                path: "/san-pham",
            },
            {
                name: "Giảm giá",
                icon: "mdi-sale",
                path: "/giam-gia",
            },
            {
                name: "Hóa đơn",
                icon: "mdi-clipboard-list-outline",
                path: "/quan-ly-hoa-don"
            },
        ],
        nav_footer: {
            name: "Trang chủ",
            icon: "mdi-arrow-left",
            path: "/"
        },
    }
};
export default nav;