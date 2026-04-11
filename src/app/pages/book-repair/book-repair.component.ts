import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import emailjs from 'emailjs-com';
import { Router } from  '@angular/router'

@Component({
  selector: 'app-book-repair',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './book-repair.component.html',
  styleUrls: ['./book-repair.component.scss']
})
export class BookRepairComponent {

  form: FormGroup;
  isSubmitting = false;
  addresses: string[] = [];
  loading = false;
  error = '';

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
     email: [
       '',
       [
         Validators.required,
         Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
       ]
     ],
      postcode: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  searchPostcode() {
    const postcode = this.form.value.postcode;

    if (!postcode) return;

    this.loading = true;
    this.error = '';
    this.addresses = [];

    const formattedPostcode = postcode.replace(/\s+/g, '');

    this.http.get<any>(`https://api.postcodes.io/postcodes/${formattedPostcode}`)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            const r = res.result;

            this.addresses = [
              `${r.admin_ward}, ${r.postcode}`,
              `${r.parish}, ${r.postcode}`,
              `${r.admin_district}, ${r.postcode}`,
              `${r.region}, ${r.postcode}`
            ].filter(Boolean);
          } else {
            this.error = 'Invalid postcode';
          }

          this.loading = false;
        },
        error: () => {
          this.error = 'Postcode not found';
          this.loading = false;
        }
      });
  }

  onAddressChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.form.patchValue({
      address: value
    });
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;

      const fullPhone = '+44' + this.form.value.phone;

      const templateParams = {
        name: this.form.value.name,
        phone: fullPhone,
        email: this.form.value.email,
        address: this.form.value.address,
        notes: this.form.value.notes
      };

      emailjs.send(
        'service_tye8g8d',
        'template_tayrp39',
        templateParams,
        'VHJar5Mk2CtWsls7U'
      ).then(() => {
        this.isSubmitting = false;
      })
      .then(() => {
        sessionStorage.setItem('fromForm', 'true');
        sessionStorage.setItem('lastSubmit', Date.now().toString());
        this.form.reset();
        this.addresses = [];
        this.router.navigate(['/success']);
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong. Please try again.');
      });
    }
  }
}
