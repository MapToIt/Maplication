export class Company {
    CompanyId: number;
    UserId: string;
    CompanyName: string;
    PhoneNumber: string;
    StreetNumber: number;
    Street: string;
    City: string;
    StateId: number;
    ZipCode: number;
    Logo: string;
    Url: string;
    Chips: string;
    State: any;

    constructor(companyID: number, userID: string, companyName: string,
    phoneNumber: string, streetNumber: number, street: string, city: string,
    stateId: number, zipCode: number, logo: string, url: string, chips: string, 
    state: any){
        this.CompanyId = companyID;
        this.UserId = userID;
        this.CompanyName = companyName;
        this.PhoneNumber = phoneNumber;
        this.StreetNumber = streetNumber;
        this.Street = street;
        this.City = city;
        this.StateId = stateId;
        this.ZipCode = zipCode;
        this.Logo = logo;
        this.Url = url;
        this.Chips = chips;
        this.State = state;
    }
}
