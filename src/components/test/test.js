import Plain from '../../lib/Plain';

export default class Test extends Plain {

    constructor() {
        super();

        this.setData({
            'test-true': false,
            'test-false': true,
            'test-exists': null
        });

        setInterval(() => {

            let data = this.getData();

            this.setData({
                'test-true': !data['test-true'],
                'test-false': !data['test-false'],
                'test-exists': data['test-exists'] === null ? '' : null
            });
        }, 1000);
    }

}