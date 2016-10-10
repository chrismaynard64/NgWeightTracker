import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';

import {Router} from '@angular/router';
// import {ToasterContainerComponent, ToasterService, ToasterConfig} from '../node_modules/angular2-toaster/angular2-toaster';
import { ToastsManager } from 'ng2-toastr';
import * as moment from 'moment';

import { IWeigher, Weigher, IWeighing, Weighing } from '../entities/Weigher';
import { WeighService } from '../services/WeighService';

@Component({
    selector: 'user-weighing',
    templateUrl: './userweight.component.html',
   /* directives: [DATEPICKER_DIRECTIVES, TimepickerComponent], */
    providers: [WeighService, ToastsManager]
  
})
export class UserWeight implements OnInit, AfterViewInit {
    public weighings: IWeighing[];
    public user: Weigher = new Weigher("1", "Bill", 1);
    private weighService: WeighService;
   // private toasterService: ToasterService;
    private toastsManager: ToastsManager;
    public newWeighing = null;
    private errorMessage: string;
    private userId = "0ecd5483-cdbd-4612-8d60-49727e8fa64a";
    private thing: string = "Test";
    private editIndex = null;

    public submitted = false;
    public showDateControl = false;
    public showTimeControl = false;



    public units = 'stlbs'

    constructor(weighService: WeighService, toastsManager: ToastsManager, 
                private zone: NgZone,
                private _router: Router) {
        this.weighService = weighService;
        //this.toasterService = toasterService;
        this.toastsManager = toastsManager;
    }
      


    ngOnInit() {   
        console.log('ngOnInit');

        if (!localStorage.getItem('access_token')) {
            this._router.navigate(['Login']);
        }

       // this.weighService.getUser(this.userId).subscribe(
        this.weighService.getUser().subscribe(
            user => {
                this.user = new Weigher(user.id, user.name, user.units);
                this.userId = user.id;
                this.units = this.user.unitsName();
            },
            error => {
                this.errorMessage = <any>error;



       //     this.toastsManager.error(<any>error, "Title?");
            });
        //this.user = { id: "ghffghfhgfh", name: "Mack" };
        this.getWeighings();
    }

    ngAfterViewInit() {


    }

    public getWeighings() {

        this.weighService.getWeighings(this.userId).subscribe(
            weighings => {
                this.weighings = weighings;
                this.weighings.forEach(w => {
                    switch (this.user.units) {
                        case 0:
                        case 1:
                            Weighing.fromlbs(w);
                            break;
                        case 2: Weighing.fromKilos(w);
                            break;
                        default:
                            Weighing.fromst(w);
                    }
                }

                );
            },
            error => {
            this.errorMessage = <any>error;
           // this.toasterService.pop('error', 'Error', 'Msg');
           // this.toastsManager.error(<any>error, "Title?");
                }) ;

    }

    public addNew() {
        this.newWeighing = new Weighing();
        this.newWeighing.weigherId = this.user.id;
        this.newWeighing.comment = "";
        this.newWeighing.weighDate = new Date();

        this.clearEdit();

        this.showTimeControl = false;
        this.showDateControl = false;
     /*   setTimeout(function () {
            $('#txtNewWeight').datepicker({ format: 'dd/mm/yyyy' });
        }, 1000);  */
     
    }



    public editWeighing(weighing: IWeighing, event: MouseEvent) {
        this.clearEdit();
        weighing.inEdit = true;
        this.showTimeControl = false;
        this.showDateControl = false;
    
        this.editIndex = this.weighings.indexOf(weighing);
        weighing.weighDateS =  ( moment as any).default(weighing.weighDate).format("MM/DD/YYYY");
       // weighing.weighDateS = moment(weighing.weighDate).format("MM/DD/YYYY");

        event.srcElement.parentElement.nextSibling

        console.log(event);

    }


    

    public deleteWeighing(weighing: IWeighing, event: MouseEvent) {

        this.weighService.deleteWeighing(weighing).subscribe(
            () => {
                let idx = this.weighings.indexOf(weighing);
                if (idx > -1) {
                        this.weighings.splice(idx, 1);
                }
             }
        )/*.catch(e => {
            console.error(e.message);
        })*/;

        console.log(event);

    }


    public addWeighing() {
        //this.newWeighing.weighDate = new Date(this.newWeighing.weighDateS);


        Weighing.updateWeights(this.newWeighing, this.user.units);

        this.weighService.saveWeighing(this.newWeighing).subscribe(
            weighing => {
                this.weighings.push(weighing)
                switch (this.user.units) {
                    case 0:
                    case 1:
                        Weighing.fromlbs(weighing);
                        break;
                    case 2: Weighing.fromKilos(weighing);
                        break;
                    default:
                        Weighing.fromst(weighing);
                }
                this.sort();
            },
            error => {
                this.errorMessage = <any>error;
                this.toastsManager.error(<any>error, "Title?");
            });   
        this.newWeighing = null;
    }
       

    public saveWeighing(weighing: IWeighing) {
        //weighing.weighDate = new Date(weighing.weighDateS);

        Weighing.updateWeights(weighing, this.user.units);

        this.weighService.saveWeighing(weighing).subscribe(
            weighing => {
                weighing.inEdit = false;
                if (this.editIndex != null) {
                    this.weighings[this.editIndex] = weighing;

                    switch (this.user.units) {
                        case 0:
                        case 1:
                            Weighing.fromlbs(weighing);
                            break;
                        case 2: Weighing.fromKilos(weighing);
                            break;
                        default:
                            Weighing.fromst(weighing);
                    }

                }
                this.editIndex = null
                this.sort();
            },
            error => {
                this.errorMessage = <any>error;
                this.toastsManager.error(<any>error, "Title?");
             }     
            );  
       
    }

    public toggleDateControl() {
        this.showDateControl = !this.showDateControl;
        this.showTimeControl = false;

    }
    public toggleTimeControl() {
        if (this.showTimeControl) {
            this.showTimeControl = false;
            this.showDateControl = true;
        } else {
            this.showTimeControl = true;
            this.showDateControl = false;
          
        }
    }

    public saveWeighingMock() {
        this.newWeighing.weighDate = new Date(this.newWeighing.weighDateS);

        this.weighings.push(this.newWeighing);
        this.newWeighing = null;
    }


    private clearEdit() {

        this.weighings.forEach(function (weighing){
            weighing.inEdit = false;
        });
    }


    private sort() {

        this.weighings.sort(function (a, b) {
            return a.weighDate > b.weighDate ? -1 : (a.weighDate < b.weighDate ? 1 : 0);
        });
    }


    public cancel() {
        this.newWeighing = null;
    }

    public cancelEdit(weighing: IWeighing) {
        weighing.inEdit = false;
    }

    /*
    public toasterconfig: ToasterConfig =
    new ToasterConfig({
        showCloseButton: true,
        tapToDismiss: false,
        timeout: 0
    });
    */
    public popToast() {
        // this.toasterService.pop('success', 'Args Title', 'Args Body');
    }
    public test() {
        //this.toastsManager.error(this.user.units.toString(), "Title?");
        console.log(this.user.units);
    }
    public toastrError(msg: string) {
        this.toastsManager.error(msg, "Title?");
    }


    public onSubmit(e) {

        this.submitted = true;

        this.addWeighing();

        e.preventDefault();

        //return false;
    } 

    public onKeyuplbs(evt, weigh: Weighing) {
    
        Weighing.fromlbs(weigh);

        this.zone.run(() => { });


    }
  

    public onKeyupst(evt, weigh: Weighing) {
   
        Weighing.fromst(weigh);

        this.zone.run(() => { });

    }

    public onKeyupKilos(evt, weigh: Weighing) {
          Weighing.fromKilos(weigh);

        this.zone.run(() => { });    }


}
