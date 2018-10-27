import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { PatientsListService } from '../../services/patients-list/patients-list.service';
import { Patient } from 'src/electron/interfaces/patient';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  patients: Patient[] = [];

  constructor(
    private patientsListService: PatientsListService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.patientsListService.getPatients().subscribe((patients) => {
      this.patients.push(...patients);
      this.cdr.detectChanges();
    });
  }

}
