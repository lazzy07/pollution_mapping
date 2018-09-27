import five from "johnny-five";

export default class GpsModule {
    constructor(board){
        this.board = board;
        this.gps = null;
        this.rx = 11;
        this.tx = 10;
        this.location = null;
        this.nav = null;
        this.sentence = "";
    }

    getLocation = () => {
        return this.location;
    }

    getNav = () => {
        return this.nav;
    }

    getSentence = () => {
        return this.sentence;
    }

    init = (rx = 11, tx = 10, baudRate= 9600) => {
        this.gps = new five.GPS({
            baudRate,
            pins: {
                rx,
                tx
            }
        })
        this.rx = rx;
        this.tx = tx;
    }

    start = () => {
        if(this.gps){
            this.gps.on("sentence", (data) => {
                this.sentence = data;
            });

            this.gps.on("navigation", (data) => {
                this.nav = data;
            });

            this.gps.on("change", (data) => {
               this.location =  data;
            });
        }
    }
}
