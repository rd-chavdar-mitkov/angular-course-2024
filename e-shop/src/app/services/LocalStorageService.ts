import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  public saveData(key: string, value: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  public getData(key: string) {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  public removeData(key: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  public clearData() {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }
}
