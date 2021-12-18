class Navigation {
    
    async nav(credentials) {   
         await $(`=${credentials.item}`).click();       
    }
}

module.exports = { Navigation: new Navigation() }