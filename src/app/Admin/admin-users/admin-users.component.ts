import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminServicesService } from '../admin-services.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../models/IUser';
import { IAdminAddUser } from '../models/IAdminAddUser';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  
  users!: IUser[];
  editIndex: number = -1;
  editForms!: FormGroup[];
  isGettingEditted: boolean = false;
  formGroup!: FormGroup;

  userData: any = [{
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    number: '',
    street: '',
    city: '',
    zipcode: '',
    phone: ''
  }];
 
  constructor(
    private adminServices: AdminServicesService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ){}
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): IUser[] {
    this.adminServices.getUsers().subscribe(response => {
      this.users = response;
      this.adminServices.usersArray = response;
    });
    return this.users;
  }
  
  onEdit(index: number): void {
    this.isGettingEditted = !this.isGettingEditted;
    this.editIndex = index;
    
  }
  onSave(index: number): void {
    const updatedUser: IUser[] = this.editForms[index].value;
    
    this.adminServices.updateUser(updatedUser).subscribe(updatedUsers => {
      this.users = updatedUsers; 
      this.editIndex = -1; 
    });
  }

  onDelete(id: number): void {
    this.adminServices.deleteProduct(id).subscribe(response => {
    })
    this.users.splice(id, 1);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialog, {
      data: {
        id: this.userData.id,
        username: this.userData.username,
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        email: this.userData.email,
        number: this.userData.number,
        street: this.userData.street,
        city: this.userData.city,
        zipcode: this.userData.zipcode,
        phone: this.userData.phone
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userData = result;
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./admin-users.component.css'],
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
export class UserDialog implements OnInit{

  userForm!: FormGroup;
  usersArray!: IUser[]

  constructor(
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IAdminAddUser,
    private formBuilder: FormBuilder,
    private adminServices: AdminServicesService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [this.data.id],
      username: [this.data.username],
      firstname: [this.data.firstname],
      lastname: [this.data.lastname],
      email: [this.data.email],
      number: [this.data.number],
      street: [this.data.street],
      city: [this.data.city],
      zipcode: [this.data.zipcode],
      phone: [this.data.phone]
    });

    this.usersArray = this.adminServices.usersArray;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get f(){
    return this.userForm.controls;
  }

  onAddUser(): void{
    let toAddUser: any = {
      id: this.usersArray[this.usersArray.length - 1].id + 1,
      username: this.userForm.value.username,
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      email: this.userForm.value.email,
      number: this.userForm.value.number,
      street: this.userForm.value.street,
      city: this.userForm.value.city,
      zipcode: this.userForm.value.zipcode,
      phone: this.userForm.value.phone
    };
    this.adminServices.addUser(toAddUser).subscribe(response => {
      this.adminServices.usersArray.push(toAddUser);
    });
  }
}

