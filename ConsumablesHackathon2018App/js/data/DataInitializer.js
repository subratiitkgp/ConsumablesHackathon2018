 import {AmazonAsinStore} from './AmazonAsinStore';
 import {AmazonAsinList} from '../stub/AmazonAsin';
 import {BarcodeList} from '../stub/Barcode';
 import {BarcodeMapper} from './BarcodeMapper';
 import {CustomerList} from '../stub/Customer';
 import {CustomerStore} from './CustomerStore';


export class DataInitializer {
    static initializeData() {
        const amazonAsins = AmazonAsinList;
        const barcodelist = BarcodeList;
        const customerList = CustomerList;
        console.log(amazonAsins.length);
        console.log("Barcode list");
        console.log(barcodelist.length);
        console.log("Customer List");
        console.log(customerList.length);
        CustomerStore.deleteAllCustomers();
        AmazonAsinStore.deleteAllAsins();
        BarcodeMapper.deleteAllBarcodes();

        AmazonAsinStore.saveAllAsins(amazonAsins); 
        BarcodeMapper.saveAllBarcodes(barcodelist);
        CustomerStore.saveAllCustomers(customerList);
    }

    static getAllAsins() {
        return AmazonAsinStore.getAllAsins();
    }
}