<template>
    <div class="all">
        <div class="top1">
            <h2>Liste d'achat</h2>
        </div>

        <div class="shopping-list">
            <div v-for="item in items" :key="item.id" class="list-item">
                <div class="list-item-content">
                    {{ item.quantite_produit }} x {{ item.libelle_produit }}
                    <br>
                    <span class="item-price">{{ (item.prix_produit * item.quantite_produit).toFixed(2) }}€</span>
                </div>
                <button @click="removeItem(item)" class="remove-button">Retirer</button>
            </div>
            <div class="total-price">
                Total : <span>{{ totalPrice }}€</span>
            </div>
            <router-link to="/checkout">
                <button class="checkout-button">Finaliser la commande</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    computed: {
        totalPrice() {
            const total = this.items.reduce((acc, item) => acc + (item.prix_produit * item.quantite_produit), 0);
            return total.toFixed(2);
        },
    },
    methods: {
        removeItem(item) {
            this.$emit('remove-item', item);
        },
    },
};
</script>

<style scoped>
.all {
    padding-top: 3%;
    padding-left: 11%;
}

.top1 {
    padding-bottom: 2%;
    background-color: #EDEDED;
    border-bottom: 3px solid #FF4C4C;
    margin-bottom: 20px;
    font-size: 24px;
    font-family: 'Poppins', 'Arial';
}

.shopping-list {
    width: 350px;
    padding: 25px;
    background-color: #FAFAFA;
    border: 1px solid #EDEDED;
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
}

.shopping-list:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    font-weight: 500;
}

.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    font-size: 18px;
    padding: 5px 0;
    border-bottom: 1px solid #EDEDED;
}

.list-item:last-child {
    border-bottom: none;
}

.item-price {
    color: #1E1E1E;
    font-weight: bold;
}

.total-price {
    font-weight: bold;
    font-size: 22px;
    margin-top: 25px;
    text-align: right;
    color: #FF4C4C;
}

.checkout-button {
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 30px;
    background-color: #FF4C4C;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    transition: background-color 0.3s;
}

.checkout-button:hover {
    background-color: #E43E3E;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.remove-button {
    background-color: #FF4C4C;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    padding: 6px 12px;
    font-size: 14px;
    transition: background-color 0.3s;
}

.remove-button:hover {
    background-color: #E43E3E;
}
</style>
