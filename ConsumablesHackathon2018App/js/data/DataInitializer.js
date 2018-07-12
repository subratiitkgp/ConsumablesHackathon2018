 import {AmazonAsinStore} from './AmazonAsinStore';
 import {AmazonAsinList} from '../stub/AmazonAsin';
 import {BarcodeList} from '../stub/Barcode';


export class DataInitializer {
    static initializeData() {
        const amazonAsins = AmazonAsinList;
        const barcodelist = BarcodeList;
        console.log(amazonAsins.length);
        console.log("Barcode list")
        console.log(barcodelist.length);
        AmazonAsinStore.deleteAllAsins();
        AmazonAsinStore.saveAllAsins(amazonAsins); 
    }

    static getAllAsins() {
        AmazonAsinStore.getAllAsins();
    }
}