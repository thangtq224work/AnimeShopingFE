import status from "@/const/orderStatus";

const app = {
    en: {
        lang: "English",
        back:"Back",
        noData: "No-data",
        btn: {
            new: "New",
            find: "Find",
            reset: "Reset",
            cancel: "Cancel",
            confirm: "Confirm",
            edit:"Edit"
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
                quantity: "Quantity"
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
        discount: {
            name: "Discount information",
            attribute: {
                id: "#",
                name: "Discount name",
                status: "Discount status",
                from: "From",
                to: "To",
                amount: "Discount amount",
                action: "Action",
                description: "Description",
                orginalPrice: "Orginal price",
                price: "Price",
                priceSell: "Price sell",
                category: "Seri",
                supplier: "Supplier",

            },
            action: {
                detailBtn: "Detail",
                updateBtn: "Update",
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
                experied: "Experied"
            }
        },
        order: {
            title: "Order",
            confirmMessage: "Confirm order",
            confirm: "Are you sure ?",
            detailMessage: "Order information",
            outOfStock: "The products in store is not enough",
            tabs: [

                {
                    name: "All",
                    value: status.ALL,
                    status: "All"
                },
                {
                    name: "Order waiting",
                    value: status.WAITING,
                    status: "waiting"
                },
                {
                    name: "Order confirmed",
                    value: status.CONFIRMED,
                    status: "confirmed"
                },
                {
                    name: "Order waiting shipping",
                    value: status.WAITING_SHIPPING,
                    status: "waiting shipping"

                },
                {
                    name: "Order shipping",
                    value: status.SHIPPING,
                    status: "Shipping"

                },
                {
                    name: "Order success",
                    value: status.SUCCESS,
                    status: "Success"
                },
                {
                    name: "Order cancel",
                    value: status.CANCEL,
                    status: "Cancel"
                },
            ],
            attribute: {
                id: "#",
                orderCode: "Order code",
                orderDate: "Order date",
                orderBy: "Order by",
                total: "Total price",
                customerMoney: "Customer money",
                address: "Address",
                phone: "Phone",
                user: "Username",
                description: "Description",
                status: "Status",
                serviceFee: "Service fee",
                shippingFee: "Delivery fee",
                income: "Income (estimated)",
                weight: "Weight (estimated)",
                action: "Action",
                product: {
                    name: "Name",
                    originalPrice: "Orginal price",
                    price: "Price ",
                    priceSell: "Price sell",
                    width: "Width",
                    height: "Height",
                    weight: "Weight",
                    length: "Length",
                    requireNote: "Require note",
                    note: "Note",
                    quantity: "Quantity",
                    quantityAvailable: "Available quantity",
                }
            },
            btn: {
                cancel: "Cancel",
                confirm: "Confirm",
                success: "Success",
                shipping: "Delivering",
                delivery: "Delivery",
                delivered: "Deliver",
                detail: "Detail",
                check: "Show service fee"
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
            order: {
                weightNotNull: "The weight must not be null",
                weightSize: (input, input2) => {
                    if (input > input2) {
                        return `The weight must less than ${input2}`
                    }
                    return `The weight must larger than ${input} and less than ${input2}`
                },
                widthNotNull: "The width must not be null",
                widthSize: (input) => `The width must larger than 0 and less than ${input}`,
                lengthNotNull: "The length must not be null",
                lengthSize: (input) => `The length must larger than 0 and less than ${input}`,
                heightNotNull: "The weight must not be null",
                heightSize: (input) => `The height must larger than 0 and less than ${input}`,
                noteSize: (input) => `The note must less than ${input} characters`,
                requiredNoteNotNull: "Please select required note",
            },
            discount: {
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
        },
        employee:{
            action:{
                new:"New employee",
                update:"Update employee",
                
            },
            properties:{
                username:"Username",
                fullname:"Fullname",
                email:"Email",
                password:"Password",
                phone:"Number phone",
                birthday:"Birthday",
                status:"Status",
                role:""              
            },
            validate:{
                usernameOrEmailUsed:"Username or email already used",
                createEmployeeSuccess:"Create employee sucessfully",
                updateEmployeeSuccess:"Update employee sucessfully",
                
            }
        }
    },
    vi: {
        lang: "Tiếng việt",
        back:"Quay lại",
        noData: "Không có dữ liệu",
        btn: {
            new: "Tạo mới",
            find: "Tìm kiếm",
            reset: "Đặt lại",
            cancel: "Hủy bỏ",
            confirm: "Xác nhận",
            edit:"Chỉnh sửa"
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
                quantity: "Số lượng"
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
        discount: {
            name: "Thông tin giảm giá",
            attribute: {
                id: "STT",
                name: "Tên giảm giá",
                status: "Trạng thái",
                from: "Bắt đầu",
                to: "Kết thúc",
                amount: "Mức giảm",
                action: "Hành động",
                description: "Mô tả",
                category: "Seri",
                supplier: "Nhà cung cấp",
                description: "Mô tả",
                orginalPrice: "Giá gốc",
                priceSell: "Giá bán",
                price: "Giá ",
            },
            action: {
                detailBtn: "Chi tiết",
                updateBtn: "Cập nhật",
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
                experied: "Hết hạn"
            }
        },

        order: {
            title: "Đơn hàng",
            confirmMessage: "Xác thực đơn hàng",
            confirm: "Xác nhận yêu cầu?",
            detailMessage: "Thông tin đơn hàng",
            outOfStock: "Sản phẩm trong kho không đủ",
            tabs: [

                {
                    name: "Tất cả",
                    value: status.ALL,
                    status: "Tất cả"
                },
                {
                    name: "Hóa đơn chờ",
                    value: status.WAITING,
                    status: "Chờ xác nhận"
                },
                {
                    name: "Hóa đơn đã xác nhận",
                    value: status.CONFIRMED,
                    status: "Đã xác nhận"
                },
                {
                    name: "Hóa đơn chờ giao hàng",
                    value: status.WAITING_SHIPPING,
                    status: "Chờ giao hàng"
                },
                {
                    name: "Hóa đơn đang giao",
                    value: status.SHIPPING,
                    status: "Đang giao"
                },
                {
                    name: "Hóa đơn đã giao thành công",
                    value: status.SUCCESS,
                    status: "Thành công"
                },
                {
                    name: "Hóa đơn bị hủy",
                    value: status.CANCEL,
                    status: "Bị hủy"
                },
            ],
            attribute: {
                id: "#",
                orderCode: "Mã hóa đơn",
                orderDate: "Ngày đặt hàng",
                orderBy: "Người đặt hàng",
                total: "Tổng đơn hàng",
                customerMoney: "Khách hàng trả",
                address: "Địa chỉ",
                phone: "Số điện thoại",
                user: "Tài khoản",
                description: "Mô tả",
                status: "Trạng thái",
                serviceFee: "Phí dịch vụ",
                shippingFee: "Phí vận chuyển",
                income: "Doanh thu ( ước tính )",
                weight: "Khối lượng ( ước tính )",
                action: "Hành động",
                product: {
                    name: "Tên SP",
                    price: "Giá gốc",
                    priceSell: "Giá bán",
                    quantity: "Số lượng",
                    quantityAvailable: "Số lượng trong kho",
                    width: "Chiều rộng",
                    height: "Chiều cao",
                    weight: "Cân nặng",
                    length: "Chiều dài",
                    requireNote: "Ghi chú nhận hàng",
                    note: "Ghi chú",
                }
            },
            btn: {
                cancel: "Hủy đơn ",
                confirm: "Xác nhận",
                success: "Xác nhận thành công",
                shipping: "Đang giao hàng",
                delivered: "Đã giao hàng",
                delivery: "Giao hàng",
                detail: "Chi tiết",
                check: "Kiểm tra chi phí"
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

            order: {
                weightNotNull: "Cân nặng không được bỏ trống",
                weightSize: (input, input2) => {
                    if (input > input2) {
                        return `Cân nặng phải nhỏ hơn ${input2}`
                    }
                    return `Cân nặng phải lớn hơn ${input} và nhỏ hơn ${input2}`
                },
                widthNotNull: "Chiều rộng không được bỏ trống",
                widthSize: (input) => `Chiều rộng phải lớn hơn 0 và nhỏ hơn ${input}`,
                lengthNotNull: "Chiều dài không được bỏ trống",
                lengthSize: (input) => `Chiều dài phải lớn hơn 0 và nhỏ hơn ${input}`,
                heightNotNull: "Chiều cao  không được bỏ trống",
                heightSize: (input) => `Chiều cao phải lớn hơn 0 và nhỏ hơn ${input}`,
                noteSize: (input) => `Ghi chú phải nhỏ hơn ${input} kí tự`,
                requiredNoteNotNull: "Vui lòng chọn ghi chú",

            },
            discount: {
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
        },
        employee:{
            action:{
                new:"Tạo mới nhân viên",
                update:"Cập nhật nhân viên",
                
            },
            properties:{
                username:"Tên đăng nhập",
                fullname:"Họ tên",
                email:"Email",
                password:"Mật khẩu",
                phone:"Số điện thoại",
                birthday:"Ngày sinh",
                status:"Trạng thái",
                role:"Vai trò"              
            },
            validate:{
                usernameOrEmailUsed:"Tên đăng nhập hoặc email đã được sử dung",
                createEmployeeSuccess:"Tạo mới nhân viên thành công",
                updateEmployeeSuccess:"Cập nhật thông tin thành công",
            }
        }
    }
}
export default app;