import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../api.service";
import { Contact } from "../../contact";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})

export class ContactComponent implements OnInit {

  // @ts-ignore
  contact: Contact = null;
  dataSource: Contact[] = [];
  contactForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.apiService.readContacts().subscribe((result) => {
      // @ts-ignore
      this.dataSource = result;
    });
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      title: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      city: ["", [Validators.required]]
    });
  }

  setFormDefaultValues() {
    this.contactForm.setValue({
      name: this.contact ? this.contact.name : "",
      title: this.contact ? this.contact.title : "",
      email: this.contact ? this.contact.email : "",
      phone: this.contact ? this.contact.phone : "",
      address: this.contact ? this.contact.address : "",
      city: this.contact ? this.contact.city : ""
    });

    if (this.isEdit) {
      this.contactForm.controls["email"].disable();
      this.contactForm.controls["email"].reset(this.contact.email);
    } else {
      this.contactForm.controls["name"].enable();
      this.contactForm.controls["title"].enable();
      this.contactForm.controls["phone"].enable();
      this.contactForm.controls["address"].enable();
      this.contactForm.controls["city"].enable();
    }
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

  updateContact(selectedItem: Contact) {
    this.isEdit = true;
    this.contact = selectedItem;
    this.setFormDefaultValues();
    this.apiService.updateContact(this.contact).subscribe((result) => {
      console.log(result);
      console.log("id", this.contact.id);
    });
  }
}
