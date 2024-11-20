import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { MONTHS } from "../constants/date.constants";

enum MonthsIndexEnum {
    JANEIRO,
    FEVEREIRO,
    MARCO,
    ABRIL,
    MAIO,
    JUNHO,
    JULHO,
    AGOSTO,
    SETEMBRO,
    OUTUBRO,
    NOVEMBRO,
    DEZEMBRO
}

@Injectable({ 
    providedIn: "root" 
})
export class DateControlService {
    monthIndex: BehaviorSubject<number> = new BehaviorSubject<number>(new Date().getMonth());
    showMonthView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    year: BehaviorSubject<number> = new BehaviorSubject<number>(new Date().getFullYear());
    
    // month view
    nextMonth(): void {
        const month = this.monthIndex.value + 1;
        if(MONTHS[month]) {
            this.monthIndex.next(this.monthIndex.value + 1);
        } else {
            this.monthIndex.next(MonthsIndexEnum.JANEIRO);
            this.year.next(this.year.value + 1);
        }
    }

    previousMonth(): void {
        const month = this.monthIndex.value - 1;
        if(MONTHS[month]) {
            this.monthIndex.next(this.monthIndex.value - 1);
        } else {
            this.monthIndex.next(MonthsIndexEnum.DEZEMBRO);
            this.year.next(this.year.value - 1);
        }
    }

    changeView(): void {
        this.showMonthView.next(!this.showMonthView.value);
    }


    // year view
    nextYear(): void {
        this.year.next(this.year.value + 1);
    }

    previousYear(): void {
        this.year.next(this.year.value - 1);
    }

    changeMonth(monthIndex: number): void {
        this.monthIndex.next(monthIndex);
        this.changeView();
    }
    
    // year view e month view

    getMonthLabel(): Observable<string> {
        return this.monthIndex.pipe(map(monthIndex => MONTHS[monthIndex]));
    }
}