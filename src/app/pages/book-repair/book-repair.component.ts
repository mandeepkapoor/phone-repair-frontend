import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var google: any;

@Component({
selector: 'app-book-repair',
standalone: true,
imports: [CommonModule, ReactiveFormsModule],
templateUrl: './book-repair.component.html',
styleUrls: ['./book-repair.component.scss']
})
export class BookRepairComponent implements AfterViewInit {

form: FormGroup;

@ViewChild('addressInput') addressInput!: ElementRef;

constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+44\d{10}$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      notes: ['']
    });
  }

  ngAfterViewInit() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      {
        types: ['address'],
        componentRestrictions: { country: 'uk' }
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      this.form.patchValue({
        address: place.formatted_address
      });
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Request submitted! We will contact you shortly.');
      this.form.reset();
    }
  }
}
