const { When, Then } = require("@wdio/cucumber-framework");
const {Login} = require('../../page/login.po');
const {Navigation} = require('../../page/navigation.po');
const {User} = require('../../page/user.po');
const {
    addStep,
    addFeature,
    addAttachment,
    addIssue,
    addArgument,
    addDescription,
    addEnvironment,
} = require('@wdio/allure-reporter').default;
//const {Subscription} = require('../../page/subscription.po');
const YAML = require('yaml'); 

When('I go to url: {string}', async function (url) {
    await browser.url(url);
});

When('I login as: {string}, {string}', async function (login, password) {
     await Login.login({ username: login, password: password });
});

When('I go to {string} menu item',async function (item) {  
    
    await Navigation.nav({item: item}) 
    
    //await $(`=${item}`).click();
    await browser.pause(1000);
});
When(/^I fill form with Page Object$/,async function (formYaml) {
    const formData = YAML.parse(formYaml);
    console.log( {formData} );
    
    this.email = formData.email;    
    this.Address = formData.Address;
    this.Address2 = formData.Address2;
    this.City = formData.City;
    this.Zip = formData.Zip;
    this.Anual = formData["Annual payment $"];
    this.Description = formData.Description;

    await User.createUser({email: formData.email,
                           password: formData.password,
                           address1: formData.Address, 
                           address2: formData.Address2,
                           city: formData.City,
                           zip: formData.Zip,                        
                           anual: formData["Annual payment $"],
                           description: formData.Description
                        });    
   // await $('#dashboard > div > div > div > form > button').click();
});
When(/^I fill form and check table:$/,async function (formYaml) {
    const formData = YAML.parse(formYaml);
    console.log( {formData} );
     
    this.email = formData.email;    
    this.Address = formData.Address;     
    this.Address2 = formData.Address2;
    this.City = formData.City;
    this.Zip = formData.Zip;
    this.Anual = formData["Annual payment $"];
    this.Description = formData.Description;
                  
    await $('#email').setValue(formData.email);
    await $('#password').setValue(formData.password);
    await $('#address1').setValue(formData.Address);
    await $('#address2').setValue(formData.Address2);
    await $('#city').setValue(formData.City);
    await $('#zip').setValue(formData.Zip);
    await $('#anual').setValue(formData["Annual payment $"]);
    await $('#description').setValue(formData.Description);    
    await $('#dashboard > div > div > div > form > button').click();
});

Then("I check table with email: {string}", async function (email) {
    const emailFromTable = await $(`//*[text()="${email}"]`).getText();   
    const adr1FromTable = await $(`//*[text()="${email}"]/../././div[3]`).getText();
    const adr2FromTable = await $(`//*[text()="${email}"]/../././div[4]`).getText();
    const cityFromTable = await $(`//*[text()="${email}"]/../././div[5]`).getText();
    const zipFromTable = await $(`//*[text()="${email}"]/../././div[7]`).getText();
    const descFromTable = await $(`//*[text()="${email}"]/../././div[8]`).getText();
    const anualFromTable = await $(`//*[text()="${email}"]/../././div[10]`).getText();
    
    expect(this.email).toEqual(emailFromTable);
    expect(this.Address).toEqual(adr1FromTable);
    expect(this.Address2).toEqual(adr2FromTable);
    expect(this.City).toEqual(cityFromTable);
    expect(this.Zip).toEqual(Number(zipFromTable));
    expect(this.Description).toEqual(descFromTable);
    expect(this.Anual).toEqual(Number(anualFromTable));
});

When(/^I fill Subscription form:$/,async function (formYaml) {
    const formData = YAML.parse(formYaml);
    console.log( {formData} );
    //await Subscription.createSubscription({years: formData.Years,  total: formData.Total, description: formData.Description });
    await $('#plan').click();
    if(formData.Plan === "Education"){
    await $('#plan').$('option:nth-child(2)').click();
    }
    else if(formData.Plan === "Premium"){
    await $('#plan').$('option:nth-child(3)').click();
    }
    else if(formData.Plan === "Enterprise"){
    await $('#plan').$('option:nth-child(4)').click();
    }   
    await $('#years').setValue(formData.Years);

    await $('#plan').click();
    if(formData.User === "test@test.com"){
        await $('#user').$('option:nth-child(3)').click();
    }
    else if(formData.User === "test1@test.com"){
    await $('#user').$('option:nth-child(4)').click();
    }
    else if(formData.User === "test2@test.com"){
    await $('#user').$('option:nth-child(5)').click();
    } 
    await $('#total').click();    
    await $('#description').setValue(formData.Description); 
    
    this.user = formData.User;    
    this.plan = formData.Plan;
    this.years = formData.Years;    
    this.description = formData.Description;      
     
    addAttachment(`plan - ${formData.User}`, formData.Plan, 'text/plain');
    addAttachment(`user - ${formData.User}`, formData.User, 'text/plain');
    addAttachment(`years - ${formData.User}`, formData.Years, 'text/plain');
    addAttachment(`description - ${formData.User}`, formData.Description, 'text/plain');
    await $('#dashboard > div > div > div > form > button').click();
    
});

Then("I check subscription with email: {string}", async function (email) {
     const userFromTable = await $(`//*[text()="${email}"]`).getText();   
     const planFromTable = await $(`//*[text()="${email}"]/../div[1]`).getText();
     const yearsFromTable = await $(`//*[text()="${email}"]/../div[3]`).getText();      
     const descFromTable = await $(`//*[text()="${email}"]/../div[6]`).getText();
     console.log('user from table : '+ planFromTable);
     console.log('this user : '+ this.plan);
     expect(this.user).toEqual(userFromTable);
     if(this.plan === "Education"){
        expect('EDU').toEqual(planFromTable);
     } else if (this.plan === "Education"){
        expect('PREM').toEqual(planFromTable);
     } else if (this.plan === "Enterprise"){
        expect('ENT').toEqual(planFromTable);  
     }
     
    expect(this.years).toEqual(yearsFromTable);
    expect(this.description).toEqual(descFromTable);
});

Then("I logOut", async function () {
    await $('//*[@id="dashboard"]/header/div/div/a[1]').click();
    await browser.pause(2000);
});
