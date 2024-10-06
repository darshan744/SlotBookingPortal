import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})

export class SlotDataSevice {
    timingsGroup: { [key: string]: { [key: string]: { [venue: string]: string[] } } } = {
        'Timing 1': {
            'Aug 11': {
                'Venue 1': ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '1:00 PM - 2:00 PM'],
                'Venue 2': ['2:00 PM - 3:00 PM', '4:00 PM - 5:00 PM', '5:30 PM - 6:30 PM'],
            },
            'Aug 12': {
                'Venue 1': ['9:00 AM - 10:00 AM', '10:30 AM - 11:30 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:30 PM - 2:30 PM', '3:00 PM - 4:00 PM', '4:30 PM - 5:30 PM'],
            },
            'Aug 13': {
                'Venue 1': ['9:00 AM - 10:00 AM', '10:30 AM - 11:30 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:30 PM - 2:30 PM', '3:00 PM - 4:00 PM', '4:30 PM - 5:30 PM'],
            },
            'Aug 14': {
                'Venue 1': ['9:00 AM - 10:00 AM', '10:30 AM - 11:30 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:30 PM - 2:30 PM', '3:00 PM - 4:00 PM', '4:30 PM - 5:30 PM'],
            },
            'Aug 15': {
                'Venue 1': ['9:00 AM - 10:00 AM', '10:30 AM - 11:30 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:30 PM - 2:30 PM', '3:00 PM - 4:00 PM', '4:30 PM - 5:30 PM'],
            },
            'Aug 16': {
                'Venue 1': ['9:00 AM - 10:00 AM', '10:30 AM - 11:30 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:30 PM - 2:30 PM', '3:00 PM - 4:00 PM', '4:30 PM - 5:30 PM'],
            },
        },
        'Timing 2': {
            'Aug 11': {
                'Venue 1': ['11:00 AM - 12:00 PM', '1:00 PM - 2:00 PM', '3:00 PM - 4:00 PM'],
                'Venue 2': ['4:00 PM - 5:00 PM', '6:00 PM - 7:00 PM'],
            },
            'Aug 12': {
                'Venue 1': ['10:00 AM - 11:00 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:30 PM - 2:30 PM', '3:30 PM - 4:30 PM', '5:00 PM - 6:00 PM'],
            },
            'Aug 13': {
                'Venue 1': ['9:00 AM - 10:00 AM', '10:30 AM - 11:30 AM'],
                'Venue 2': ['12:00 PM - 1:00 PM', '2:00 PM - 3:00 PM', '4:00 PM - 5:00 PM'],
            },
            'Aug 14': {
                'Venue 1': ['10:00 AM - 11:00 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:30 PM - 2:30 PM', '3:00 PM - 4:00 PM'],
            },
            'Aug 15': {
                'Venue 1': ['9:00 AM - 10:00 AM', '11:00 AM - 12:00 PM'],
                'Venue 2': ['1:00 PM - 2:00 PM', '3:00 PM - 4:00 PM', '5:00 PM - 6:00 PM'],
            },
            'Aug 16': {
                'Venue 1': ['10:00 AM - 11:00 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:00 PM - 2:00 PM', '3:00 PM - 4:00 PM'],
            },
        },
        'Timing 3': {
            'Aug 11': {
                'Venue 1': ['12:00 PM - 1:00 PM', '2:00 PM - 3:00 PM', '4:00 PM - 5:00 PM'],
                'Venue 2': ['5:00 PM - 6:00 PM', '6:30 PM - 7:30 PM'],
            },
            'Aug 12': {
                'Venue 1': ['9:30 AM - 10:30 AM', '11:30 AM - 12:30 PM'],
                'Venue 2': ['1:00 PM - 2:00 PM', '3:30 PM - 4:30 PM'],
            },
            'Aug 13': {
                'Venue 1': ['10:00 AM - 11:00 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:30 PM - 2:30 PM', '3:00 PM - 4:00 PM', '5:00 PM - 6:00 PM'],
            },
            'Aug 14': {
                'Venue 1': ['9:00 AM - 10:00 AM', '11:00 AM - 12:00 PM'],
                'Venue 2': ['12:30 PM - 1:30 PM', '2:00 PM - 3:00 PM'],
            },
            'Aug 15': {
                'Venue 1': ['10:00 AM - 11:00 AM', '12:00 PM - 1:00 PM'],
                'Venue 2': ['1:00 PM - 2:00 PM', '3:30 PM - 4:30 PM'],
            },
            'Aug 16': {
                'Venue 1': ['9:00 AM - 10:00 AM', '11:00 AM - 12:00 PM'],
                'Venue 2': ['1:00 PM - 2:00 PM', '3:00 PM - 4:00 PM'],
            },
        },
    };
    getVenues(date :string) {
        return Object.keys(this.timingsGroup[date]);
    }
    
}


