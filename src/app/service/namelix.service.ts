import {Injectable, Provider} from '@angular/core';

@Injectable()
/**
 * This is a Singleton
 */
export class NamelixService {
  private username:string;
  private static instance:NamelixService|undefined;
  public static getInstance():NamelixService {
    if (NamelixService.instance){
      return NamelixService.instance;
    }
    else {
      return new NamelixService();
    }
  }
  private constructor() {
    let uName = localStorage.getItem("username");
    if (uName && uName.length > 0) this.username = uName
    else this.username = "";
  }

  get uName():string{
    return this.username;
  }
  set uName(val:string) {
    this.username = val;
    localStorage.setItem("username",val);
  }
}
export const NAMELIX_PROVIDER:Provider =
  {
    provide:NamelixService,
    useFactory: (): NamelixService => {
      return NamelixService.getInstance();
    }
  }

