import { defineStore } from "pinia";
import { computed, ref } from "vue";
const cartStore = defineStore("cart", () => {
    const cart = ref([]);
    const getCart = computed(() => {
        cart.value = JSON.parse(localStorage.getItem('cart'))  || [];
        return cart.value;
    })
    const addToCart = (it, quantity) => {
        const index = cart.value.findIndex((item) => {
            return item.id == it.id;
        });
        if (index == -1) {
            it.quantity = 1;
            cart.value.push({id:it.id,quantity:it.quantity});
            updateCart();
            return;
        }
        cart.value[index].quantity += quantity;
        updateCart();
        return true;
    }
    const updateQuantity = (id, quantity) => {
        const index = cart.value.findIndex((item) => {
            return item.id == id;
        });
        if (index == -1) {
            return false;
        }
        // console.log(id,quantity,index);
        cart.value[index].quantity = Number(quantity);
        updateCart();
        return true;
    }
    const removeFromCart = (id) =>{
        const index = getIndexOfProductInCart(id);
        if(index != -1){
            cart.value.splice(index,1);
        }
        updateCart();
    }
    const getIndexOfProductInCart = (id) =>{
        return cart.value.findIndex((item) => {
            return item.id == id;
        });
        
    }
    const clearCart = () => {
        cart.value = [];
        updateCart();
    }
    const updateCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    }
    return { cart, getCart, addToCart, clearCart, updateQuantity,removeFromCart,getIndexOfProductInCart };
});
export default cartStore;