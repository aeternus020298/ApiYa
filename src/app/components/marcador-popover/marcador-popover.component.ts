import { Component, Input } from "@angular/core";

@Component({
  selector: "app-marcador-popover",
  templateUrl: "./marcador-popover.component.html",
  styleUrls: ["./marcador-popover.component.scss"],
})
export class MarcadorPopoverComponent {
  @Input() titulo: string;
  @Input() descripcion: string;

  constructor() {}
}
