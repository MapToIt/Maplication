import {Attendee} from '../shared/domain-model/attendee'

export class User {
    id = "";
    type ="";
    name = "";
    email = "";
    streetName = "";
    streetNumber = "";
    city = "";
    state = "";
    zip = "";
    phoneNumber = "";
    imgLink = "";
    resumeLink = "";
    url = "";
    college = "";
    degree = "";
    tags = [];
    
    constructor(id){
        this.id = id;
    }

    //Do conversions from user UI Helper class to domain model classes
    convertToAttendee(user: User, userId: string, otherUser: any) {
        //split name into two
        var first = user.name.split(" ");
        return new Attendee(0, first[0], first[1], user.phoneNumber, user.email, user.imgLink, user.resumeLink
            , user.degree, user.college, user.tags.join(), userId, otherUser);
    }

    convertFromAttendee(attendee: Attendee) {
        var user = new User(attendee.UserId);
        user.name = attendee.FullName;
        user.email = attendee.Email;
        user.phoneNumber = attendee.PhoneNumber;
        user.imgLink = attendee.Image;
        user.resumeLink = attendee.Resume;
        user.degree = attendee.Degree;
        user.college = attendee.University;
        user.tags = attendee.Chips.split(",");
    }
}
