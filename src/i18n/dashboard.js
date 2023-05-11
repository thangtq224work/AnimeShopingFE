const app = {
    en: {
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
                    action: "Action"
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
                    action: "Action"
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
                    action: "Action"
                }
            },
            supplier: {
                title: 'Supplier',
                action: {
                    new: "New supplier",
                    update: "Update supplier",
                },
                attribute: {
                    name: "Supplier name",
                    action: "Action",
                    newSuccess: "Create supplier successfully",
                    updateSuccess: "Update supplier successfully",
                    newfaild: "Create supplier failded",
                    updatefaild: "Update supplier failded",
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
                supplier:"Supplier",
                typeProduct: 'Type',
                status: 'Status',
                action: "Action",
                properties: "Properties",
                description: "Description",
                weight:"Weight (gr)",
                width:"Width (cm) ",
                height:"Height (cm)",
                length:"Length (cm)",
                price:"Price",
                priceSell:"Price sell",
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
        networkFaild: "Error networking"
    },
    vi: {
        noData:"Không có dữ liệu",
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
                    action: "Hành động"
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
                    action: "Hành động"
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
                    action: "Hành động"
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
                    action: "Hành động"
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
                supplier:"Nhà cung cấp",
                status: 'Trạng thái',
                action: "Hành động",
                properties: "Thuộc tính",
                description: "Mô tả",
                weight:"Cân nặng (gram)",
                width:"Chiều rộng (cm) ",
                height:"Chiều cao (cm) ",
                length:"Chiều dài (cm) ",
                price:"Giá nhập",
                priceSell:"Giá bán",
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
        networkFaild: "Lỗi kết nối"
    }
}
export default app;