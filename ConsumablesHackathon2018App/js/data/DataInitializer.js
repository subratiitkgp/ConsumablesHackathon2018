 import {AsinStore} from './AsinStore';
 import {AmazonAsinStore} from './AmazonAsinStore';
 import {AmazonAsinList} from '../stub/AmazonAsin';
 import {BarcodeMapper} from './BarcodeMapper';
 import {BarcodeList} from '../stub/Barcode';
 import {BarcodeMapper} from './BarcodeMapper';
 import {CustomerList} from '../stub/Customer';
 import {CustomerStore} from './CustomerStore';
 import {CartItemList} from '../stub/CartItem';
 import {CartStore} from './CartStore';

export class DataInitializer {
    static initializeData() {
        AsinStore.deleteAllAsins();
        AsinStore.saveAsin({key: "ASIN1", id: "ASIN1", type: "asin"});

        const amazonAsins = AmazonAsinList;
        const barcodelist = BarcodeList;
        const customerList = CustomerList;
        const cartItemsList = CartItemList;
        console.log(amazonAsins.length);
        console.log("Barcode list");
        console.log(barcodelist.length);
        console.log("Customer List");
        console.log(customerList.length);
        console.log("CartItem List");
        console.log(cartItemsList.length);
        CustomerStore.deleteAllCustomers();
        AmazonAsinStore.deleteAllAsins();
        BarcodeMapper.deleteAllBarcodes();
        CartStore.deleteAllCartItems();


        AmazonAsinStore.saveAllAsins(amazonAsins); 
        BarcodeMapper.saveAllBarcodes(barcodelist);
        CustomerStore.saveAllCustomers(customerList);
        CartStore.saveAllCartItems(cartItemsList);
    }

    static getAllAsins() {
        return AsinStore.getAllAsins();
    }

    static getAllAmazonAsins() {
        return AmazonAsinStore.getAllAsins();
    }
}
