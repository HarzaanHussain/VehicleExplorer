import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Manufacturer } from '../../models/manufacturer';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-manufacturer-detail',
  templateUrl: './manufacturer-detail.component.html',
  styleUrls: ['./manufacturer-detail.component.scss']
})
export class ManufacturerDetailComponent implements OnInit {
  // the view title
  title: string = '';
  // the form model
  form!: FormGroup;
  // the manufacturer object to edit or create
  manufacturer?: Manufacturer;
  // the manufacturer object id, as fetched from the active route:
  // it's NULL when we're adding a new manufacturer,
  // and not NULL when we're editing an existing one
  id?: number;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });

    // retrieve the ID from the 'id' parameter
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      // EDIT MODE
      // fetch the manufacturer from the server
      this.http.get<Manufacturer>(environment.baseUrl + 'api/manufacturers/' + this.id)
        .subscribe({
          next: result => {
            this.manufacturer = result;
            this.title = "Edit - " + this.manufacturer.name;

            // update the form with the manufacturer value
            this.form.patchValue(this.manufacturer);
          },
          error: error => console.error(error)
        });
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new Manufacturer";
    }
  }

  onSubmit() {
    const manufacturer = this.id ? { ...this.manufacturer, ...this.form.value } : this.form.value;

    if (this.id) {
      // EDIT mode
      this.http.put<Manufacturer>(environment.baseUrl + 'api/manufacturers/' + this.id, manufacturer)
        .subscribe({
          next: () => {
            console.log("Manufacturer " + manufacturer.id + " has been updated.");
            // go back to manufacturers view
            this.router.navigate(['/manufacturers']);
          },
          error: error => console.error(error)
        });
    }
    else {
      // ADD NEW mode
      this.http.post<Manufacturer>(environment.baseUrl + 'api/manufacturers', manufacturer)
        .subscribe({
          next: result => {
            console.log("Manufacturer " + result.id + " has been created.");
            // go back to manufacturers view
            this.router.navigate(['/manufacturers']);
          },
          error: error => console.error(error)
        });
    }
  }

  onCancel() {
    this.router.navigate(['/manufacturers']);
  }
}
