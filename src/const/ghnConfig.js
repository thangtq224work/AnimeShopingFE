const ghnStatus = {
    picking: "picking",
    picked: "picked",
    delivering: "delivering",
    delivery_fail: "delivery_fail",
    waiting_to_return: "waiting_to_return",
    SUCCESS: "return",
};
const ghnSize = {
    lengthSize:150,
    noteSize:1024,
    weightSize:30000
}
const requiredNote = {
    en: [
        {
            name: "Buyer can request to see and trial goods",
            value: "CHOTHUHANG"
        },
        {
            name: "Buyer can see goods but not allow to trial goods ",
            value: "CHOXEMHANGKHONGTHU"
        },
        {
            name: "Buyer not allow to see goods",
            value: "KHONGCHOXEMHANG"
        }
    ],
    vi: [

        {
            name: "Khách hàng có thể xem và thử hàng",
            value: "CHOTHUHANG"
        },
        {
            name: "Khách hàng chỉ có thể xem hàng",
            value: "CHOXEMHANGKHONGTHU"
        },
        {
            name: "Khách hàng không được xem hàng",
            value: "KHONGCHOXEMHANG"
        }
    ]
}
export { ghnStatus, requiredNote , ghnSize };
