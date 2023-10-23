import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx";

@Component({
  selector: "app-qr",
  templateUrl: "./qr.component.html",
  styleUrls: ["./qr.component.scss"],
})
export class QrComponent implements OnInit {
  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {}

  QRscan() {
    this.barcodeScanner.scan().then((result) => {
      if (!result.cancelled) {
        console.log("Successfully QR Scanned: ", result.text);
      } else {
        console.log("Failed QR");
      }
    });
  }
}
