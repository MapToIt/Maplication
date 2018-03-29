export class Coordinator {
    CoordinatorId: number;
    FirstName: string;
    LastName: string;
    UserId: string;
    Email: string;
    PhoneNumber: string;

   constructor(cId, FirstName, LastName, UserId, Email, PhoneNumber){
        this.CoordinatorId = cId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.UserId = UserId;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
    }

}

export class Event{
    id: number;
    coord: number; 
    date: string; 
    name: string;

constructor(id, coord, date, name){
    this.id = id;
    this.coord = coord;
    this.date = date;
    this.name = name;
}
}