import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-repair',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent {

  form: FormGroup;

  brands = ['Apple', 'Samsung'];

  models: any = {
    Apple: [
      'iPhone 11', 'iPhone 12', 'iPhone 13',
      'iPhone 14', 'iPhone 15'
    ],
    Samsung: [
      'Galaxy S21', 'Galaxy S22', 'Galaxy S23',
      'Galaxy S24'
    ]
  };

  colours = [
    'Black', 'White', 'Blue', 'Red', 'Green', 'Gold', 'Silver'
  ];

  repairs = [
    'Screen',
    'Battery',
    'Charging Port',
    'Cameras',
    'Back Screen',
    'Power Button',
    'Volume Button',
    'Microphone',
    'Other'
  ];

  selectedModels: string[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      colour: ['', Validators.required],
      repair: ['', Validators.required]
    });
  }

  onBrandChange() {
    const brand = this.form.value.brand;
    this.selectedModels = this.models[brand] || [];

    this.form.patchValue({
      model: '',
      colour: '',
      repair: ''
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Repair selected');
    }
  }
}
