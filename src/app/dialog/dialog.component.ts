import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductAPIService } from '../service/product-api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private product: ProductAPIService,
    private matdiaRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  freshnessList: string[] = ['Brand new', 'Second Hand', 'Refurbishd'];

  addproduct!: FormGroup;

  actionButton: String = 'Save';
  ngOnInit(): void {
    this.addproduct = this.formbuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: [''],
      date: ['', Validators.required],
    });
    if (this.editData) {
      this.actionButton = 'Update';
      this.addproduct.controls['productName'].setValue(
        this.editData.productName
      );
      this.addproduct.controls['category'].setValue(this.editData.category);
      this.addproduct.controls['date'].setValue(this.editData.date);
      this.addproduct.controls['freshness'].setValue(this.editData.freshness);
      this.addproduct.controls['price'].setValue(this.editData.price);
      this.addproduct.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    if (!this.editData) {
      this.product.addProduct(this.addproduct.value).subscribe({
        next: (res) => {
          alert('product added successfully');
          this.addproduct.reset();
          this.matdiaRef.close('save');
        },
        error: () => {
          alert('Something went Wrong!');
        },
      });
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    alert(this.editData._id);
    this.product
      .updateProduct(this.addproduct.value, this.editData._id)
      .subscribe({
        next: (res) => {
          alert('Product Update successfully');
          this.addproduct.reset();
          this.matdiaRef.close('update');
        },
        error: (err) => {
          console.log(err);
          alert('Something went wrong!');
        },
      });
  }
}
