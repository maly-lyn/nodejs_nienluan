// module.exports = function Cart(initItems) {
//         this.items = initItems;
//         this.totalQty = 0;
//         this.totalPrice = 0;

//         this.add = function (item, id) {
//             var storedItem = this.items[id];
//             if (!storedItem) {
//                 storedItem = this.item[id] = { item: item, qty: 0, price: 0}
//             }
//             storedItem.qty++;
//             storedItem.price = storedItem.item.price * storedItem.qty;
//             this.totalQty++;
//             this.totalPrice += storedItem.price;
//         }

//         this.generateArray = function () {
//             var arr = [];
//             for (var id in this.items) {
//                 arr.push (this.item[id]);
//             }
//             return arr;
//         }
// };