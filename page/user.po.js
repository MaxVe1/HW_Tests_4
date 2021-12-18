class User {
    // components
    get main() {
        return $('//*[@class="col-9"]');
    }

    get email() {
        return this.main.$('#email');
    }

    get password() {
        return this.main.$('#password');
    }
    get password() {
        return this.main.$('#password');
    }
    get address1() {
        return this.main.$('#address1');
    }
    get address2() {
        return this.main.$('#address2');
    }
    get city() {
        return this.main.$('#city');
    }
    get zip() {
        return this.main.$('#zip');
    }
    get anual() {
        return this.main.$('#anual');
    }
    get description() {
        return this.main.$('#description');
    }
    // get rememberCheckbox() {
    //     return this.main.$("[type='checkbox']");
    // }

    get submitButton() {
        return this.main.$('button');
    }

    // actions
    async createUser(credentials) {
        await this.email.setValue(credentials.email);
        await this.password.setValue(credentials.password);
        await this.address1.setValue(credentials.address1);
        await this.address2.setValue(credentials.address2);
        await this.city.setValue(credentials.city);
        await this.zip.setValue(credentials.zip);
        await this.anual.setValue(credentials.anual);
        await this.description.setValue(credentials.description);
        await this.submitButton.click();
        //await $('#user-label').waitForDisplayed({timeoutMsg: 'cannot login into system'});
    }
}

module.exports = { User: new User() }