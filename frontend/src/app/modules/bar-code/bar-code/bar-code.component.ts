import {Component, OnInit} from '@angular/core';
import { FormGroup} from "@angular/forms";

@Component({
    selector: 'app-bar-code',
    templateUrl: './bar-code.component.html',
    styleUrls: ['./bar-code.component.css']
})
export class BarCodeComponent implements OnInit {
    value: number;
    form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

    onPrint() {
        window.print();
    }

}
