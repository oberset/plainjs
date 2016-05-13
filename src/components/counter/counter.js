import Plain from '../../lib/Plain';

export default class Counter extends Plain {

    constructor() {
        super();

        this.counter = 0;

        this.setData({
            cssClass: 'counter-elem',
            counter: this.counter++
        });

        setInterval(() => {
            this.setData({
                counter: this.counter++
            });
        }, 1000);
    }

}