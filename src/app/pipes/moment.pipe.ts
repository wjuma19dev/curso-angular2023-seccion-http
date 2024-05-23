import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";
moment.locale('es')

@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform {
    transform( date: Date, mode ) {
        
        let dateWithFormat;

        if(mode === 'fromNow') {
            dateWithFormat = moment(date).fromNow();
        }

        return dateWithFormat;
    }
}