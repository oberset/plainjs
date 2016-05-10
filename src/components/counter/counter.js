import Plain from '../../lib/Plain';

export default class Counter extends Plain {

    constructor() {
        super();

        this.counter = 0;

        this.setData({
            cssClass: 'counter-elem'
        });

        //Don't work
        let data = this.getData();
        data.counter = 10000;

        setInterval(() => {
            this.setData({
                counter: this.counter++
            });
        }, 1000);
    }

}