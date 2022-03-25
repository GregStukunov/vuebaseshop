const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        productsInCart: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/70x50',
        show: false,
        searchLine: '',
        error: false
    },
    methods: {
        filter(value){
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            if (this.filtered.length > 0) return true
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                })
        },
        addProduct(item) {
            console.log(item.id_product);
            let find = this.productsInCart.find(el => el.id_product === item.id_product)
            if(find){
                find.quantity++;
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.productsInCart.push(prod);
            }
        },
        removeProduct(item) {
            let find = this.productsInCart.find(el => el.id_product === item.id_product)
            if (find.quantity > 1){
                find.quantity--
            }
            else {
                this.productsInCart.splice(this.productsInCart.indexOf(item), 1);
            }
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.$data.products.push(el);
                    this.$data.filtered.push(el);
                }
            });
        // this.getJson('/getProducts.json')
        //     .then(data => {
        //         for (let el of data) {
        //             this.products.push(el);
        //         }
        //     })
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.$data.productsInCart.push(el)
                }
            })
    }
})