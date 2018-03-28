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
    // convertToAttendee(user: User, userId: string, otherUser: any) {
    //     //split name into two
    //     var first = user.name.split(" ");
    //     return new Attendee(0, first[0], first[1], user.phoneNumber, user.email, user.imgLink, user.resumeLink
    //         , user.degree, user.college, user.tags.join(), userId, otherUser);
    // }

    convertFromAttendee(attendee: Attendee) {
        var user = new User(attendee.userId);
        user.name = attendee.fullName;
        user.email = attendee.email;
        user.phoneNumber = attendee.phoneNumber;
        user.imgLink = attendee.image;
        user.resumeLink = attendee.resume;
        user.degree = attendee.degree;
        user.college = attendee.university;
        user.tags = attendee.chips;
    }
}
