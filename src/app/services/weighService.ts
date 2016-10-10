import { Injectable } from "@angular/core";
import { IWeighing, IWeigher, Weighing } from '../entities/Weigher';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class WeighService {

    private rootUrl = "http://localhost:55446/api";

    constructor(private http: Http) { }

    public getUser(): Observable<IWeigher>{
        //return { id: "ghffghfhgfh", name: "Chris"};
        return this.http.get(this.rootUrl + "/user", this.getGetOptions())
            .map(this.extractUser)
            .catch(this.handleError);
 
    }

    /*
    public getUser(userId: string): Observable<IWeigher> {
        //return { id: "ghffghfhgfh", name: "Chris"};
        return this.http.get(this.rootUrl + "/user/" + userId)
            .map(this.extractUser)
            .catch(this.handleError);

    }
    */

    public getToken() : string {
        return localStorage.getItem('access_token');
    }


    public getGetOptions() : RequestOptions {
        let headers = new Headers({'authorization': 'bearer ' + this.getToken() });
        let options = new RequestOptions({ headers: headers });

        return options;
    }

    public getPostOptions() : RequestOptions {
                let headers = new Headers({ 
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + this.getToken()
            });

        let options = new RequestOptions({ headers: headers });

        return options;
    }

    public getWeighings(userId: string): Observable<IWeighing[]> {
        //return [ { id: 1, weighDate: new Date("2016-03-01"), weigherId: '', weightPounds: 110 }, { id: 2, weighDate: new Date("2016-03-01"), weigherId: '', weightPounds: 110 }];
        return this.http.get(this.rootUrl + "/weighing/" + userId, this.getGetOptions())
            .map(this.extractWeighings)
            .catch(this.handleError);


    }


    public saveWeighing(weighing: IWeighing): Observable<IWeighing>{
        let body = JSON.stringify(weighing);


        return this.http.post(this.rootUrl + "/weighing", body, this.getPostOptions())
            .map(this.extractWeighing)
            .catch(this.handleError);

    }




    public deleteWeighing(weighing: IWeighing): Observable<Response> {
        let body = JSON.stringify(weighing);


        return this.http.delete(this.rootUrl + "/weighing/" + weighing.id, this.getGetOptions())
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }



    private extractUser(res: Response) {
        let body = res.json();
        if (body && body.weighings) {
            body.weighings.forEach(function (weighing)  {
                weighing.weighDate = new Date(weighing.weighDate);  
            });
           
        }
        return body || {};
    }


    private extractWeighings(res: Response) {
        let body = res.json();
        if (body) {
            body.forEach(function (weighing) {
                weighing.weighDate = new Date(weighing.weighDate);
            });

        }
        return body || {};
    }

    private extractWeighing(res: Response) {
        let body = res.json();
        if (body) {
           
            body.weighDate = new Date(body.weighDate);
        

        }

        var ret: Weighing = body;

        if (body) {
            ret = <Weighing>body;
        }

        return ret || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}