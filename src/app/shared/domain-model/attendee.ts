export class Attendee {
    public AttendeeId: number = 0;
    public FirstName: string;
    public LastName: string;
    public PhoneNumber: string;
    public Email: string;
    public Image: string;
    public Resume: string;
    public Degree: string;
    public University: string;
    public Chips: string;
    public UserId: string;
    public User: any;
    public FullName: string;

    constructor(AttendeeId: number, FirstName: string, LastName: string, 
        PhoneNumber:string, Email: string, Image: string, Resume: string,
        Degree: string, University: string, Chips: string, UserId: string,
        User: any){
        this.AttendeeId = 0;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.PhoneNumber = PhoneNumber;
        this.Email = Email;
        this.Image = Image;
        this.Resume = Resume;
        this.Degree = Degree;
        this.University = University;
        this.Chips = Chips;
        this.UserId = UserId;
        this.User = User;
        this.FullName = FirstName + LastName;
    }
}
