import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Contact } from  './contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "http://localhost:3000";

  constructor(
    private httpClient: HttpClient
  ) { }

  public readContacts(){
    return this.httpClient.get<Contact[]>(`${this.API_SERVER}/contact`);
  }

  public createContact(contact: Contact){
    return this.httpClient.post<Contact>(`${this.API_SERVER}/contact/create`, contact);
  }

  public updateContact(contact: Contact){
    return this.httpClient.put<Contact>(`${this.API_SERVER}/contact/${contact.id}/update`, contact);
  }

  public deleteContact(id: number){
    return this.httpClient.delete(`${this.API_SERVER}/contact/${id}/delete`);
  }
}
