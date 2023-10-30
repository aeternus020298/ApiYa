import { Component, OnInit } from "@angular/core";
import { FirebaseAuthService } from "../services/firebase-auth.service";

@Component({
  selector: "app-restore",
  templateUrl: "./restore.page.html",
  styleUrls: ["./restore.page.scss"],
})
export class RestorePage implements OnInit {
  email: any;

  constructor(public authService: FirebaseAuthService) {}

  ngOnInit() {}

  async resetPassword() {
    this.authService.resetPassword(this.email);
  }
}
