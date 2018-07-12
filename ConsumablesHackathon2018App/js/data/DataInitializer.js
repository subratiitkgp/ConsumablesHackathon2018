 import {AsinStore} from './AsinStore';
 import {AmazonAsinStore} from './AmazonAsinStore';
 import {AmazonAsinList} from '../stub/AmazonAsin';
 import {BarcodeMapper} from './BarcodeMapper';
 import {BarcodeList} from '../stub/Barcode';

export class DataInitializer {
    static initializeData() {
        AsinStore.deleteAllAsins();
        AsinStore.saveAsin({key: "ASIN1", id: "ASIN1", type: "asin"});

        const amazonAsins = AmazonAsinList;
        console.log(amazonAsins);
        AmazonAsinStore.deleteAllAsins();
        AmazonAsinStore.saveAllAsins(amazonAsins);

        // const barcodeList = BarcodeList;
        // BarcodeMapper.deleteAllBarcodes();
        // BarcodeMapper.saveAllBarcodes(barcodeList);
    }

    static getAllAsins() {
        return AsinStore.getAllAsins();
    }

    static getAllAmazonAsins() {
        return AmazonAsinStore.getAllAsins();
    }
}