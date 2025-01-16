import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
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

    dateChanged: Subject<void> = new Subject<void>();
    
    nextMonth(): void {
        this.updateMonth(1, MonthsIndexEnum.JANEIRO, 1);
        this.dateChanged.next();
    }
    
    previousMonth(): void {
        this.updateMonth(-1, MonthsIndexEnum.DEZEMBRO, -1);
        this.dateChanged.next();
    }
    
    private updateMonth(monthIncrement: number, resetMonth: MonthsIndexEnum, yearIncrement: number): void {
        const month = this.monthIndex.value + monthIncrement;
        if (MONTHS[month]) {
            this.monthIndex.next(month);
        } else {
            this.monthIndex.next(resetMonth);
            this.year.next(this.year.value + yearIncrement);
        }
    }

    changeView(): void {
        this.showMonthView.next(!this.showMonthView.value);
    }


    nextYear(): void {
        this.year.next(this.year.value + 1);
        this.dateChanged.next();
    }

    previousYear(): void {
        this.year.next(this.year.value - 1);
        this.dateChanged.next();
    }

    changeMonth(monthIndex: number): void {
        this.monthIndex.next(monthIndex);
        this.changeView();
        this.dateChanged.next();
    }
    

    getMonthLabel(): Observable<string> {
        return this.monthIndex.pipe(map(monthIndex => MONTHS[monthIndex]));
    }
}