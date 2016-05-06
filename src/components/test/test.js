import Plain from '../../lib/Plain';

export default class Test extends Plain {

    constructor() {
        super();

        this.setData({
            test: false
        });

        setInterval(() => {
            let data = this.getData();

            this.setData({
                test: !data.test
            });
        }, 1000);
    }

    onBeforeMount() {
        console.log('onBeforeMount !!!');
    }

    onMount() {
        console.log('onMount !!!');
    }

    onBeforeUnmount() {
        console.log('onBeforeUnmount !!!');
    }

    onUnmount() {
        console.log('onUnmount !!!');
    }

    onDestroy() {
        console.log('onDestroy !!!');
    }

}