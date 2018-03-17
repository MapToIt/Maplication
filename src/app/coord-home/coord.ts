export class Coord {
    CoordinatorId: number;
    FirstName: string;
    LastName: string;
    UserId: string;
    Email: string;
    PhoneNumber: string;

   constructor(id, FirstName, LastName, UserId, Email, PhoneNumber){
        this.CoordinatorId = id;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.UserId = UserId;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
    }

}