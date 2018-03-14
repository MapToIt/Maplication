import { Event } from '../shared/domain-model/event';

export const EVENTSLIST: Event[] = [
    {
        eventId: 213, 
        eventTitle: "Event 1", 
        description: "This is a basic description.", 
        eventPic: "https://www.dreamhost.com/blog/wp-content/uploads/2015/10/DHC_blog-image-01-300x300.jpg", 
        city: "Melbourne", 
        state:"none",
        stateId:1,
        coordinator:"John Doe", 
        eventStartTime: new Date(16, 8, 24, 12, 0, 0, 0), 
        eventEndTime: new Date(16, 9, 24, 12, 0, 0 ,0),
        streetNumber: 12,
        street: "street",
        zipcode:12345
    },
    {
        eventId: 421, 
        eventTitle: "The Main Event", 
        description: "What is the ain event, though?", 
        eventPic: "https://leanpub.com/site_images/jelinux/tux.png", 
        city: "Malmo", 
        state:"none",
        stateId:1, 
        coordinator:"John Doe", 
        eventStartTime: new Date(16, 8, 24, 12, 0, 0, 0), 
        eventEndTime: new Date(16, 9, 24, 12, 0, 0 ,0),
        streetNumber: 12,
        street: "street",
        zipcode:12345
    },
    {
        eventId: 399, 
        eventTitle: "Just Another Event", 
        description: "This is a thing that's happening right now.", 
        eventPic: "http://blog.kyliesgenes.com/wp-content/uploads/tux-vs-msn.png", 
        city: "Yellowknife", 
        state:"none",
        stateId:1,
        coordinator:"John Doe", 
        eventStartTime: new Date(16, 8, 24, 12, 0, 0, 0), 
        eventEndTime: new Date(16, 9, 24, 12, 0, 0 ,0),
        streetNumber: 12,
        street: "street",
        zipcode:12345
    },
    {
        eventId: 213, 
        eventTitle: "Event 1", 
        description: "This is a basic description.", 
        eventPic: "https://www.dreamhost.com/blog/wp-content/uploads/2015/10/DHC_blog-image-01-300x300.jpg", 
        city: "Melbourne", 
        state:"none",
        stateId:1,
        coordinator:"John Doe", 
        eventStartTime: new Date(16, 8, 24, 12, 0, 0, 0), 
        eventEndTime: new Date(16, 9, 24, 12, 0, 0 ,0),
        streetNumber: 12,
        street: "street",
        zipcode:12345
    },
    {
        eventId: 421,
        eventTitle: "The Main Event", 
        description: "What is the ain event, though?", 
        eventPic: "https://leanpub.com/site_images/jelinux/tux.png", 
        city: "Malmo", 
        state:"none",
        stateId:1,
        coordinator:"John Doe", 
        eventStartTime: new Date(16, 8, 24, 12, 0, 0, 0), 
        eventEndTime: new Date(16, 9, 24, 12, 0, 0 ,0),
        streetNumber: 12,
        street: "street",
        zipcode:12345
    },
    {
        eventId: 399, 
        eventTitle: "Just Another Event", 
        description: "This is a thing that's happening right now.", 
        eventPic: "http://blog.kyliesgenes.com/wp-content/uploads/tux-vs-msn.png", 
        city: "Yellowknife", 
        state:"none",
        stateId:1,
        coordinator:"John Doe", 
        eventStartTime: new Date(16, 8, 24, 12, 0, 0, 0), 
        eventEndTime: new Date(16, 9, 24, 12, 0, 0 ,0),
        streetNumber: 12,
        street: "street",
        zipcode:12345
    }
];
