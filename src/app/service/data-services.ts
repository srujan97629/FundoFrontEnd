import { BehaviorSubject, from } from 'rxjs';
import { Injectable } from '@angular/core';
import {constructDependencies} from '@angular/core/src/di/reflective_provider';

@Injectable({providedIn:'root'})

export class DataServices {
    private messageSource=new BehaviorSubject<any>("default message");
    currentMessage=this.messageSource.asObservable();
    constructor(message:any)
    {
       this.messageSource.next(message);
    }
}
