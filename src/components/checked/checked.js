import Plain from '../../lib/Plain';

export default class Checked extends Plain {

    constructor() {
        super();

        setInterval(() => {
            let data = this.getData();

            this.setData({
                checked: !data.checked,
                disabled: !data.disabled,
                className: data.className ? '' : 'input-elem'
            });
        }, 1000);
    }

}