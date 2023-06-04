const homeApp = {
    en: {
        lang: "English",
        search: "Search product",
        noData: "No data avaiable",
        outOfStock:"This product is out of stock",
        filter: {
            category: "Category",
            type: "Type",
            material: "Material"
        },
        filterDes:"Filter",
        allProduct:"All product",
        sort:"Sort",
        sortBy:[
            {
                name:"Price : increase",
                sort: "priceSell",
                direction:"asc"
            },
            
            {
                name:"Price : decrease",
                sort: "priceSell",
                direction:"desc"
            },
            
            {
                name:"Name : A-Z",
                sort: "priceSell",
                direction:"asc"
            },
            
            {
                name:"Name : Z-A",
                sort: "name",
                direction:"desc"
            },
            
            {
                name:"Latest ",
                sort: "createAt",
                direction:"asc"
            },
            
            {
                name:"Oldest ",
                sort: "createAt",
                direction:"desc"
            },
        ],
        addToCart:{
            path:"add-to-cart",
            name:"Add to cart"
        },
        detail:"Detail",
        detailDialog:{
            dimension:"Dimension",
            weight:"Weight",
            description:"Description"
        }
    },
    vi: {
        lang: "Tiếng việt",
        search: "Tìm kiếm sản phẩm",
        noData: "Không có dữ liệu",
        outOfStock:"Sản phẩm tạm thời hết hàng",
        filter: {
            category: "Danh mục",
            type: "Loại",
            material: "Chất liệu"
        },
        filterDes:"Bộ lọc",
        allProduct:"Tất cả sản phẩm",
        sort:"Sắp xếp",
        sortBy:[
            {
                name:"Giá : tăng dần",
                sort: "priceSell",
                direction:"asc"
            },
            
            {
                name:"Giá : giảm dần",
                sort: "priceSell",
                direction:"desc"
            },
            
            {
                name:"Tên : A-Z",
                sort: "priceSell",
                direction:"asc"
            },
            
            {
                name:"Tên : Z-A",
                sort: "name",
                direction:"desc"
            },
            
            {
                name:"Mới nhất ",
                sort: "createAt",
                direction:"asc"
            },
            
            {
                name:"Cũ nhất ",
                sort: "createAt",
                direction:"desc"
            },
        ],
        addToCart:{
            path:"them-vao-gio-hang",
            name:"Thêm vào giỏ hàng"
        },
        detail:"Chi tiết",
        detailDialog:{
            dimension:"Kích thước",
            weight:"Cân nặng",
            description:"Mô tả"
        }

    },
}
export default homeApp;