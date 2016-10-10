export interface IWeigher {
    id: string;
    name: string;
    units: number;

    unitsName(): string;
}

export class Weigher implements IWeigher{


   constructor(public id: string, public name: string, public units: number) {

    }

    public unitsName() : string {
        switch (this.units) {
            case 0:
                return "lbs"; 
            case 0:
                return "stlbs"; 
            case 0:
                return "kilos"; 
            default:
                return "stlbs";

        }
   }

    get unitsS(): string {
        return this.units.toString();
    }
    set unitsS(val: string) {
        this.units = +val;
    }
}

export interface IWeighing {
    id: string;
    weigherId: string;
    weighDate: Date;
    weighDateS: string;
    weightKilos: number;
    weightPounds: number;
    comment: string;
    inEdit?: boolean;
    weightSt?: number;
    weightStlbs?: number;

  }

export class Weighing implements IWeighing {
    id: string;
    weigherId: string;
    weighDate: Date;
    weighDateS: string = "";
    weightKilos: number = 0;
    weightPounds: number = 0;
    comment: string = "";
    inEdit: boolean = false;
    weightSt: number = 0;
    weightStlbs: number = 0;


    public static updateWeights(weigh: IWeighing,  units: number): void {
        switch (units) {
            case 0:
                Weighing.fromlbs(weigh);
                break;
            case 1:
                Weighing.fromst(weigh);
                break;
            case 2:
                Weighing.fromKilos(weigh);
                break;
        }

    }

    public static fromlbs(weigh: IWeighing): void {
        weigh.weightKilos = +(weigh.weightPounds *  0.453592).toFixed(2);

        weigh.weightSt = Math.floor(weigh.weightPounds / 14);
        weigh.weightStlbs = +(weigh.weightPounds % 14).toFixed(2);

    }

    public static fromKilos(weigh: IWeighing): void {
        weigh.weightPounds = +(weigh.weightKilos * 2.2046226218).toFixed(2);

        weigh.weightSt = Math.floor(weigh.weightPounds / 14);
        weigh.weightStlbs = +(weigh.weightPounds % 14).toFixed(2);

    }

    public static fromst(weigh: IWeighing): void {
        weigh.weightPounds = +(weigh.weightSt * 14 + weigh.weightStlbs).toFixed(2);
        weigh.weightKilos = +(weigh.weightPounds * 0.453592).toFixed(2);

    }


}
