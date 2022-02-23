import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../api.service";
import { Contact } from "../../contact";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})

export class ContactComponent implements OnInit {

  // @ts-ignore
  contact: Contact = null;
  dataSource: Contact[] = [];
  dataSourceFiltered: Contact[] = [];

  contactForm = new FormGroup({
    name: new FormControl(),
    title: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    city: new FormControl()
  });

  nameInput: string | undefined = '';
  titleInput: string | undefined = '';
  emailInput: string | undefined = '';
  phoneInput: string | undefined = '';
  addressInput: string | undefined = '';
  cityInput: string | undefined = '';

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.apiService.readContacts().subscribe((result) => {
      // @ts-ignore
      this.dataSource = result;
    });
  }

  createContact(f: any) {
    this.apiService.createContact(f.value).subscribe((result) => {
      console.log(result);
      window.location.reload();
    });

  }

  deleteContact(id: any) {
    this.apiService.deleteContact(id).subscribe((result) => {
      console.log(result);
      window.location.reload();
    });
  }

  getContactById(id: number){
    this.dataSourceFiltered = this.dataSource.filter(x => {
      return x.id === id
    });
  }

  updateContact(selectedItem: any) {
    this.getContactById(selectedItem.id)
    this.nameInput = this.dataSourceFiltered?.[0].name;
    this.titleInput = this.dataSourceFiltered?.[0].title;
    this.emailInput = this.dataSourceFiltered?.[0].email;
    this.phoneInput = this.dataSourceFiltered?.[0].phone;
    this.addressInput = this.dataSourceFiltered?.[0].address;
    this.cityInput = this.dataSourceFiltered?.[0].city;

    selectedItem.value.id = this.dataSourceFiltered?.[0].id;
    this.apiService.updateContact(selectedItem.value).subscribe((result)=>{
      console.log(result);
    });
  }
}
