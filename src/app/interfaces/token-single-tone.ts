import { stringify } from '@angular/compiler/src/util';
import Constants from '../helper/constants';

export class TokenSingleTone {
  private static instance: TokenSingleTone;
  private token: string = '';
  private userName: string = '';
  private userId: string = '';

  constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TokenSingleTone();
      let latestToken = localStorage.getItem(Constants.activeTokenNumber_lsKey);
      if (latestToken != null && latestToken != '') {
        this.instance.token = latestToken;
        let userId = localStorage.getItem(Constants.userid);
        if (userId != null && userId != '') {
          this.instance.userId = userId;
        }
        let userName = localStorage.getItem(Constants.username);
        if (userName != null && userName != '') {
        this.instance.userName = userName?.toString();
        }
      }
    }

    return this.instance;
  }
  public setToken(token: string) {
    this.token = token;
  }

  public setUserName(userName: string) {
    this.userName = userName;
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }
}
