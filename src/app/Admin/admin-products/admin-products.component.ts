import { Component, Inject, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { AdminServicesService } from '../admin-services.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IAdminAddDialog } from '../models/IAdminAddProductDialog'; 

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {
  products!: IProduct[];
  editIndex: number = -1;
  editForms: FormGroup[] = [];
  isGettingEditted: boolean = false;
  formGroup!: FormGroup;

  productData: IAdminAddDialog = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rate: 0,
    count: 0
  };

  constructor(
    private adminServices: AdminServicesService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.loadProducts();

    // this.products.forEach(prod => {
    //   const form = this.fb.group({
    //     title: [prod.title],
    //     price: [prod.title],
    //     description: [prod.description],
    //     category: [prod.category],
    //     image: [prod.image],
    //     rate: [prod.rating.rate],
    //     count: [prod.rating.count]
    //   })
    //   this.editForms.push(form)
    // })
    
  }


  loadProducts(): IProduct[] {
    this.adminServices.getProducts().subscribe(response => {
      this.products = response;
      this.adminServices.productsArray = response;
    });
    return this.products;
  }

  onEdit(index: number): void {
    this.isGettingEditted = !this.isGettingEditted;
    this.editIndex = index;
  }

  onSave(index: number){
    this.products[index] = this.editForms[index].value;
    this.isGettingEditted = false;
    this.editIndex = -1;
  }

  onDelete(id: number): void {
    this.adminServices.deleteProduct(id).subscribe(response => {
      console.log(response);
    })
    this.products.splice(id, 1);
  }

  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        title: this.productData.title,
        price: this.productData.price,
        description: this.productData.description,
        category: this.productData.category,
        image: this.productData.image,
        rate: this.productData.rate,
        count: this.productData.count
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.productData = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./admin-products.component.css'],
  standalone: true,
  imports: [
    MatDialogModule, 
    MatFormFieldModule,
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class DialogOverviewExampleDialog implements OnInit{

  productForm!: FormGroup;
  productsArray!: IProduct[]

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IAdminAddDialog,
    private formBuilder: FormBuilder,
    private adminServices: AdminServicesService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: [this.data.title],
      price: [this.data.price],
      description: [this.data.description],
      category: [this.data.category],
      image: [this.data.image],
      rate: [this.data.rate],
      count: [this.data.count]
    });

    this.productsArray = this.adminServices.productsArray;
  }

  onImageChange(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.productForm.patchValue({
        filesource: file
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get f(){
    return this.productForm.controls;
  }

  onAddProduct(): void{
    const formData = new FormData();
    formData.append('file', this.productForm.get('fileSource')?.value)
    let toAddProduct: any = {
      id: this.productsArray[this.productsArray.length - 1].id + 1,
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      category: this.productForm.value.category,
      image: formData,
      rating: {
        rate: 5,
        count: 1
      }
    };
    this.adminServices.addProduct(toAddProduct).subscribe(response => {
      console.log('success');
      this.adminServices.productsArray.push(toAddProduct);
      console.log(this.adminServices.productsArray)
    });
  }
}

