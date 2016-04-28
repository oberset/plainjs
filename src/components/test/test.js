import Plain from '../../lib/Plain';

export default class Test extends Plain {

    constructor() {
        super();

        this.setData({
            'test-true': false,
            'test-false': true,
            'test-exists': null,
            'test-lt': 1,
            'test-lte': 1,
            'test-gt': 0,
            'test-gte': 0
        });

        setInterval(() => {

            let data = this.getData();

            this.setData({
                'test-true': !data['test-true'],
                'test-false': !data['test-false'],
                'test-exists': data['test-exists'] === null ? '' : null,
                'test-lt': data['test-lt'] ? 0 : 1,
                'test-lte': data['test-lte'] ? 0 : 1,
                'test-gt': data['test-gt'] ? 0 : 1,
                'test-gte': data['test-gte'] ? 0 : 1
            });
        }, 1000);
    }

}