import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlerteConsoleService {
  
  constructor() {}

  showAlert(rAlertMsg: string) {
  console.log(rAlertMsg);
  }
}
