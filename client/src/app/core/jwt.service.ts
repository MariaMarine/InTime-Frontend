import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable()
export class JwtService {

    public helper = new JwtHelperService();
    public constructor() {}

    public decodeToken(token: string) {
        return this.helper.decodeToken(token);
    }

}
