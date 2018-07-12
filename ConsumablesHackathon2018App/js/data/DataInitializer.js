 import {AsinStore} from './AsinStore';
 import {AmazonAsinStore} from './AmazonAsinStore';
 import {AmazonAsinList} from '../stub/AmazonAsin';
 import {BarcodeMapper} from './BarcodeMapper';
 import {BarcodeList} from '../stub/Barcode';
 import {CustomerList} from '../stub/Customer';
 import {CustomerStore} from './CustomerStore';
 import {CartItemList} from '../stub/CartItem';
 import {CartStore} from './CartStore';

export class DataInitializer {
    static initializeData() {
        AsinStore.deleteAllAsins();
        AsinStore.saveAsin({key: "ASIN1", id: "ASIN1", type: "asin"});

        const amazonAsins = AmazonAsinList;
        AmazonAsinStore.deleteAllAsins();
        AmazonAsinStore.saveAllAsins(amazonAsins); 

        const barcodelist = BarcodeList;
        // console.log(barcodelist);
        BarcodeMapper.deleteAllBarcodes();
        BarcodeMapper.saveAllBarcodes(barcodelist);
        console.log(BarcodeMapper.getAllBarcodes());

        const customerList = CustomerList;
        CustomerStore.deleteAllCustomers();
        CustomerStore.saveAllCustomers(customerList);

        const cartItemsList = CartItemList;
        CartStore.deleteAllCartItems();
        CartStore.saveAllCartItems(cartItemsList);
    }

    static getAllAsins() {
        return AsinStore.getAllAsins();
    }

    static getAllAmazonAsins() {
        return AmazonAsinStore.getAllAsins();
    }
}
