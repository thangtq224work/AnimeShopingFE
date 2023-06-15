const app = {
    en: {
        lang: "English",
        noData: "No-data",
        btn: {
            new: "New",
            find: "Find",
            reset: "Reset",
            cancel: "Cancel",
            confirm: "Confirm"
        },
        property: {
            category: {
                title: 'Category',
                action: {
                    new: "New category",
                    update: "Update category",
                    newSuccess: "Create category successfully",
                    updateSuccess: "Update category successfully",
                    newfaild: "Create category failded",
                    updatefaild: "Update category failded",
                },
                attribute: {
                    name: "Category name",
                    action: "Action",
                    status: "Active"
                }
            },
            material: {
                title: 'Material',
                action: {
                    new: "New material",
                    update: "Update material",
                    newSuccess: "Create material successfully",
                    updateSuccess: "Update material successfully",
                    newfaild: "Create material failded",
                    updatefaild: "Update material failded",
                },
                attribute: {
                    name: "Material name",
                    action: "Action",
                    status: "Active"
                }
            },
            typeProduct: {
                title: 'Type product',
                action: {
                    new: "New type product",
                    update: "Update type product",
                    newSuccess: "Create type product successfully",
                    updateSuccess: "Update type product successfully",
                    newfaild: "Create type product failded",
                    updatefaild: "Update type product failded",
                },
                attribute: {
                    name: "Type product name",
                    action: "Action",
                    status: "Active"
                }
            },
            supplier: {
                title: 'Supplier',
                action: {
                    new: "New supplier",
                    update: "Update supplier",
                    newSuccess: "Create supplier successfully",
                    updateSuccess: "Update supplier successfully",
                    newfaild: "Create supplier failded",
                    updatefaild: "Update supplier failded",
                },
                attribute: {
                    name: "Supplier name",
                    action: "Action",
                    status: "Active"
                }
            },
            property: {
                title: 'Property',
                action: {
                    new: "New property",
                    update: "Update property",
                    newSuccess: "Create property successfully",
                    updateSuccess: "Update property successfully",
                    newfaild: "Create property failded",
                    updatefaild: "Update property failded",
                },
                attribute: {
                    name: "Property name",
                    action: "Action"
                }
            }
        },
        product: {
            title: "Product",
            attribute: {
                name: "Product name",
                category: "Category",
                material: "Material",
                supplier: "Supplier",
                typeProduct: 'Type',
                status: 'Status',
                action: "Action",
                properties: "Properties",
                description: "Description",
                weight: "Weight (gr)",
                width: "Width (cm) ",
                height: "Height (cm)",
                length: "Length (cm)",
                price: "Price",
                priceSell: "Price sell",
                images: "Images",
                quantity:"Quantity"
            },
            action: {
                new: "New product",
                update: "Update product",
                newSuccess: "Create product successfully",
                updateSuccess: "Update product successfully",
                newfaild: "Create product failded",
                updatefaild: "Update product failded",
            },
            status: {
                trueVal: "Avaiable",
                falseVal: "Non-avaiable",
            }
        },
        discount:{
            name:"Discount information",
            attribute:{
                id:"#",
                name:"Discount name",
                status:"Discount status",
                from:"From",
                to:"To",
                amount:"Discount amount",
                action:"Action",
                description:"Description",
                orginalPrice:"Orginal price",
                priceSell:"Price sell",
                
            },
            action:{
                detailBtn:"Detail",
                updateBtn:"Update",
                new: "New discount",
                update: "Update discount",
                newSuccess: "Create discount successfully",
                updateSuccess: "Update discount successfully",
                newfaild: "Create discount failded",
                updatefaild: "Update discount failded",    
            },
            status: {
                trueVal: "Avaiable",
                falseVal: "Non-avaiable",
                experied:"Experied"
            }
        },
        networkFaild: "Error networking",
        validate: {
            product: {
                productNameNotNull: "Product name must not be null",
                productNameSize: "Name product must be at least 3 characters and largest 100 characters",
                lengthNotNull: "The length of the product must not be null",
                lengthSize: "The length of the product must be larger than 0",
                widthNotNull: "The width of the product must not be null",
                widthSize: "The width of the product must be larger than 0",
                heightNotNull: "The height of the product must not be null",
                heightSize: "The height of the product must be larger than 0",
                weightNotNull: "The weight of the product must not be null",
                weightSize: "The weight of the product must be larger than 0",
                priceNotNull: "The price of the product must not be null",
                priceSize: "The price of the product must be larger than 0",
                priceSellNotNull: "The price sell of the product must not be null",
                priceSellSize: "The price sell of the product must be larger than 0",
                categoryNotNull: "The category of the product must not be null",
                materialNotNull: "The category of the product must not be null",
                typeNotNull: "The type of the product must not be null",
                supplierNotNull: "The supplier of the product must not be null",
                imageNotNull: "Please select the images of product",
                imageSize: "The number of images of product must smaller than 6",
                statusNotNull: "The status must not be null",
                quantityNotNull: "The quantity must not be null",
                quantitSize: "The quantity of product must larger or equal 0",
            },
            discount:{
                discountNameSize: "Discount name must be at least 1 characters and largest 100 characters",
                discountTypeNotNull: "Please select type of discount",
                discountAmountNotNull: "Please type amount of discount",
                discountAmountSize: "Discount amount from 1 to 99%",
                discountAmountSize2: "Discount amount must be larger than 0",
                discountStartNotNull: "Please select start date of discount",
                discountEndNotNull: "Please select end date of discount",
                
            },
            category: {
                categoryNotNull: "Category must not be null",
                statusNotNull: "Status of category must not be null"
            },
            material: {
                materialNotNull: "Material must not be null",
                statusNotNull: "Status of material must not be null"
            },
            supplier: {
                supplierNotNull: "Supplier must not be null",
                statusNotNull: "Status of supplier must not be null"
            },
            typeProduct: {
                materialNotNull: "Type of product must not be null",
                statusNotNull: "Status must not be null"
            }
        }
    },
    vi: {
        lang: "Tiếng việt",
        noData: "Không có dữ liệu",
        btn: {
            new: "Tạo mới",
            find: "Tìm kiếm",
            reset: "Đặt lại",
            cancel: "Hủy bỏ",
            confirm: "Xác nhận"
        },
        property: {
            category: {
                title: 'Danh mục',
                action: {
                    new: "Tạo mới danh mục",
                    update: "Cập nhật danh mục",
                    newSuccess: "Thêm danh mục thành công",
                    updateSuccess: "Cập nhật danh mục thành công",
                    newfaild: "Thêm danh mục thất bại",
                    updatefaild: "Cập nhật danh mục thất bại",
                },
                attribute: {
                    name: "Tên danh mục",
                    action: "Hành động",
                    status: "Trạng thái"
                }
            },
            material: {
                title: 'Chất liệu',
                action: {
                    new: "Tạo mới chất liệu",
                    update: "Cập nhật chất liệu",
                    newSuccess: "Thêm chất liệu thành công",
                    updateSuccess: "Cập nhật chất liệu thành công",
                    newfaild: "Thêm chất liệu thất bại",
                    updatefaild: "Cập nhật chất liệu thất bại",
                },
                attribute: {
                    name: "Tên chất liệu",
                    action: "Hành động",
                    status: "Trạng thái"
                }
            },
            typeProduct: {
                title: 'Loại sản phẩm',
                action: {
                    new: "Tạo mới loại sản phẩm",
                    update: "Cập nhật loại sản phẩm",
                    newSuccess: "Thêm loại sản phẩm thành công",
                    updateSuccess: "Cập nhật loại sản phẩm thành công",
                    newfaild: "Thêm loại sản phẩm thất bại",
                    updatefaild: "Cập nhật loại sản phẩm thất bại",
                },
                attribute: {
                    name: "Tên loại sản phẩm",
                    action: "Hành động",
                    status: "Trạng thái"
                }
            },
            supplier: {
                title: 'Nhà cung cấp',
                action: {
                    new: "Tạo mới nhà cung cấp",
                    update: "Cập nhật nhà cung cấp",
                    newSuccess: "Thêm nhà cung cấp thành công",
                    updateSuccess: "Cập nhật nhà cung cấp thành công",
                    newfaild: "Thêm nhà cung cấp thất bại",
                    updatefaild: "Cập nhật nhà cung cấp thất bại",
                },
                attribute: {
                    name: "Nhà cung cấp",
                    action: "Hành động",
                    status: "Trạng thái"
                }
            },
            property: {
                title: 'Thuộc tính ',
                action: {
                    new: "Tạo mới thuộc tính",
                    update: "Cập nhật thuộc tính",
                    newSuccess: "Thêm thuộc tính thành công",
                    updateSuccess: "Cập nhật thuộc tính thành công",
                    newfaild: "Thêm thuộc tính thất bại",
                    updatefaild: "Cập nhật thuộc tính thất bại",
                },
                attribute: {
                    name: "Tên thuộc tính",
                    action: "Hành động"
                }
            }
        },
        product: {
            title: "Sản phẩm",
            noData: "Không có dữ liệu",
            attribute: {
                name: "Tên sản phẩm",
                category: "Danh mục",
                material: "Chất liệu",
                typeProduct: 'Loại sản phẩm',
                supplier: "Nhà cung cấp",
                status: 'Trạng thái',
                action: "Hành động",
                properties: "Thuộc tính",
                description: "Mô tả",
                weight: "Cân nặng (gram)",
                width: "Chiều rộng (cm) ",
                height: "Chiều cao (cm) ",
                length: "Chiều dài (cm) ",
                price: "Giá gốc",
                priceSell: "Giá bán",
                images: "Hình ảnh",
                quantity:"Số lượng"
            },
            action: {
                new: "Tạo mới sản phẩm",
                update: "Cập nhật sản phẩm",
                newSuccess: "Thêm sản phẩm thành công",
                updateSuccess: "Cập nhật sản phẩm thành công",
                newfaild: "Thêm sản phẩm thất bại",
                updatefaild: "Cập nhật sản phẩm thất bại",
            },
            status: {
                trueVal: "Khả dụng",
                falseVal: "Không khả dụng",

            }
        },
        discount:{
            name:"Thông tin giảm giá",
            attribute:{
                id:"STT",
                name:"Tên giảm giá",
                status:"Trạng thái",
                from:"Bắt đầu",
                to:"Kết thúc",
                amount:"Mức giảm",
                action:"Hành động",
                description:"Mô tả",
                orginalPrice:"Giá gốc",
                priceSell:"Giá bán"
            },
            action:{
                detailBtn:"Chi tiết",
                updateBtn:"Cập nhật",
                new: "Tạo mới giảm giá",
                update: "Cập nhật giảm giá",
                newSuccess: "Tạo mới giảm giá thành công",
                updateSuccess: "Cập nhật giảm giá thành công",
                newfaild: "Tạo mới giảm giá thất bại",
                updatefaild: "Cập nhật giảm giá thất bại",    
            },
            status: {
                trueVal: "Khả dụng",
                falseVal: "Không khả dụng",
                experied:"Hết hạn"
            }
        },
        networkFaild: "Lỗi kết nối",
        validate: {
            product: {
                productNameNotNull: "Tên sản phẩm không được bỏ trống",
                productNameSize: "Tên sản phẩm từ 3 đến 100 kí tự",
                lengthNotNull: "Chiều dài của sản phẩm không được bỏ trống",
                lengthSize: "Chiều dài của sản phẩm phải lớn hơn 0",
                widthNotNull: "Chiều rộng của sản phẩm không được bỏ trống",
                widthSize: "Chiều rộng của sản phẩm phải lớn hơn 0",
                heightNotNull: "Chiều cao của sản phẩm không được bỏ trống",
                heightSize: "Chiều cao của sản phẩm phải lớn hơn 0",
                widthNotNull: "Chiều rộng của sản phẩm không được bỏ trống",
                widthSize: "Chiều rộng của sản phẩm phải lớn hơn 0",
                weightNotNull: "Cân nặng của sản phẩm không được bỏ trống",
                weightSize: "Cân nặng của sản phẩm phải lớn hơn 0",
                priceNotNull: "Giá gốc của sản phẩm không được bỏ trống",
                priceSize: "Giá của sản phẩm phải lớn hơn 0",
                priceSellNotNull: "Giá bán của sản phẩm không được bỏ trống",
                priceSellSize: "Giá bán của sản phẩm phải lớn hơn 0",
                categoryNotNull: "Danh mục của sản phẩm không được bỏ trống",
                materialNotNull: "Chất liệu của sản phẩm không được bỏ trống",
                typeNotNull: "Loại của sản phẩm không được bỏ trống",
                supplierNotNull: "Nhà cung cấp của sản phẩm không được bỏ trống",
                imageNotNull: "Vui lòng chọn ảnh của sản phẩm",
                imageSize: "Số ảnh tối đa là 6",
                statusNotNull: "Trạng thái không được bỏ trống",
                quantityNotNull: "Số lượng không được bỏ trống",
                quantitSize: "Số lượng phải lớn hơn hoặc bằng 0",
            },
            discount:{
                discountNameSize: "Tên khuyến mại từ 1 - 100 kí tự",
                discountTypeNotNull: "Vui lòng chọn loại khuyến mại",
                discountAmountNotNull: "Vui lòng nhập mức khuyến mại",
                discountAmountSize: "Mức khuyến mại từ 1 tới 99%",
                discountAmountSize2: "Mức khuyến mại phải lớn hơn 0",
                discountStartNotNull: "Vui lòng chọn ngày bắt đầu",
                discountEndNotNull: "Vui lòng chọn ngày kết thúc",
                
            },
            category: {
                categoryNotNull: "Danh mục không được bỏ trống",
                statusNotNull: "Trạng thái không được bỏ trống"
            },
            material: {
                materialNotNull: "Nhà cung cấp không được bỏ trống", 
                statusNotNull: "Trạng thái không được bỏ trống"
            },
            supplier: {
                supplierNotNull: "Nhà cung cấp không được bỏ trống", 
                statusNotNull: "Trạng thái không được bỏ trống"
            },
            typeProduct: {
                typeProductNotNull: "Loại sản phẩm không được bỏ trống", 
                statusNotNull: "Trạng thái không được bỏ trống"
            }
        }
    }
}
export default app;