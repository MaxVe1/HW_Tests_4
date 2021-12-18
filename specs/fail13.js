// REMOVE THE BELOW CODE BEFORE START THE EXERCISE
function checkText(searchText, tableText){
    if (searchText !== tableText) {
        throw new Error(` "${searchText}" Not Equal To "${tableText}"`);
    }
    else{
        console.log(`${searchText} is OK`)
    }
}

describe('Check app', function () {

    it('should login and check color', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
                
        await browser.pause(1000);       
        
        await $("//a[contains(@href, './formManager.html')]").click();
        await $('#email').setValue('one@mail.com');
        await $('#password').setValue('12345');
        await $('#address1').setValue('Main Street');
        await $('#address2').setValue('1234');
        await $('#state').$('option:nth-child(2)').click();
        await $('#zip').setValue('10001');
        await $('#description').setValue('New user created');
        await $('#city').click();
        await $('#city').setValue('Miami');
        await $("#autoComplete_result_1").click();
        await $('#dashboard > div > div > div > form > button').click();        

        await browser.pause(500);

        await $("//a[contains(@href, './formManager.html')]").click();
        await $('#email').setValue('two@mail.com');
        await $('#password').setValue('54321');
        await $('#address1').setValue('Green Street');
        await $('#address2').setValue('1234');
        await $('#state').$('option:nth-child(2)').click();           
        await $('#zip').setValue('50005');
        await $('#description').setValue('Added new user');
        await $('#city').click();
        await $('#city').setValue('Boston');
        await $("#autoComplete_result_1").click();
        await $('#dashboard > div > div > div > form > button').click();
  
        const user1 = await $('//*[text()="one@mail.com"]/..');
        const user2 = await $('//*[text()="two@mail.com"]/..');  
          
        checkText(
            await user1.$('./././div[2]').getText(),
            "manager"
        );
        checkText(
            await user1.$('./././div[3]').getText(),
            "Main Street"
        ); 
        checkText(
            await user1.$('./././div[4]').getText(),
            "1234"
        ); 
        checkText(
             await user1.$('./././div[5]').getText(),
             "Miami"
        ); 
        checkText(
            await user1.$('./././div[6]').getText(),
            "USA"
        );
        checkText(
             await user1.$('./././div[7]').getText(),
             "10001"
        ); 
        checkText(
            await user1.$('./././div[8]').getText(),
            "New user created"
       );
        checkText(
            await user1.$('./././div[11]').getText(),
            "country"
        );        
        
        checkText(
            await user2.$('./././div[2]').getText(),
            "manager"
        );
        checkText(
            await user2.$('./././div[3]').getText(),
            "Green Street"
        ); 
        checkText(
            await user2.$('./././div[4]').getText(),
            "1234"
        );      
        checkText(
            await user2.$('./././div[5]').getText(),
            "Boston"
        );
        checkText(
            await user2.$('./././div[6]').getText(),
            "US"
        );
        checkText(
             await user2.$('./././div[7]').getText(),
             "50005"
        );
        checkText(
            await user2.$('./././div[8]').getText(),
            "Added new user"
       ); 
        checkText(
            await user2.$('./././div[11]').getText(),
            "country"
        );


        await browser.pause(10000);
    });
});   
                
        
         





