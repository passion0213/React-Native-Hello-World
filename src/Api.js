class Api {

    url = 'https://api.yxt.5fenqi.net/authority/v1/';

    async sendSmsCodeApi(data) {
        var postUrl = this.url + 'sms/code/send';
        var phone = data.phone;
        var result = null;

        await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    phone: phone,
                }
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.errors != null) {
                    result = null;
                } else if (responseJson.user != null) {
                    if (responseJson.user.token != null) {
                        result = responseJson.user.token;
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
        return result;
    }

    async verificationSmsCodeApi(data) {
        var postUrl = this.url + 'sms/code/verification';
        var phone = data.phone;
        var sms_code = data.sms_code;
        var result = null;

        await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phone,
                sms_code: sms_code,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.errors != null) {
                    result = null;
                } else if (responseJson.user != null) {
                    if (responseJson.user.token != null) {
                        result = responseJson.user.token;
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
        return result;
    }

    async LoginApi(data) {
        var postUrl = this.url + 'user/login/account';
        var user_code = data.user_code;
        var pwd = data.pwd;
        var result = null;

        await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_code: user_code,
                pwd: pwd,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                result = responseJson;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
        return result;
    }

    async registerationApi(data) {
        var postUrl = this.url + 'user/set/registered';
        var name = data.name;
        var id_card = data.id_card;
        var phone = data.phone;
        var sms_code = data.sms_code;
        var pwd = data.pwd;
        var confirm_pwd = data.confirm_pwd;
        
        var result = null;

        await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                id_card: id_card,
                phone: phone,
                pwd: pwd,
                sms_code: sms_code,
                pwd: pwd,
                confirm_pwd: confirm_pwd,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.token != null) {
                    result = responseJson.token;
                }
                result = responseJson;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
        return result;
    }
    
}

const ApiObject = new Api();
export default ApiObject;