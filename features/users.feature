Feature: Creation of User and Subscription
  
 Background:
    When I go to url: "https://viktor-silakov.github.io/course-sut/index.html?quick"  
    When I login as: "walker@jw.com", "password" 
  Scenario: Create Users and Subscriptions
    When I go to "Create User" menu item
    When I fill form with Page Object    
     """
      email: 'test@test.com'
      password: 'U&cmpYsxK9'
      Address: 'Rustaveli 20-21'
      Address2: 'flor 4'
      City: 'Tbilisi'
      Zip: 222567
      Annual payment $: 400
      Description: 'test user'
     """ 
        When I go to "List of users" menu item
        Then I check table with email: "test@test.com"
        When I go to "Create User" menu item  
        When I fill form with Page Object    
     """
      email: 'test1@test.com'
      password: '00001'
      Address: 'Rustaveli 20-21'
      Address2: 'flor 1'
      City: 'Tbilisi1'
      Zip: 222567
      Annual payment $: 500
      Description: 'test user1'
     """ 
     When I go to "List of users" menu item
     Then I check table with email: "test1@test.com"
     When I go to "Create User" menu item  
     When I fill form and check table:    
     """
      email: 'test2@test.com'
      password: '00002'
      Address: 'Street 2'
      Address2: 'flor 2'
      City: 'Tbilisi2'
      Zip: 222567
      Annual payment $: 600
      Description: 'test user2'
     """   
     When I go to "List of users" menu item
     Then I check table with email: "test2@test.com"
     When I go to "Create Subscription" menu item
     When I fill Subscription form:    
     """
      Plan: 'Education'
      Years: '1'
      User: 'test@test.com'         
      Description: 'Subscription test user'
     """ 
     When I go to "List of Subscriptions" menu item
     Then I check subscription with email: "test@test.com"
     When I go to "Create Subscription" menu item
     When I fill Subscription form:    
     """
      Plan: 'Premium'
      Years: '2'
      User: 'test1@test.com'         
      Description: 'Subscription test1 user'
     """ 
     When I go to "List of Subscriptions" menu item
     Then I check subscription with email: "test1@test.com"
     When I go to "Create Subscription" menu item
     When I fill Subscription form:    
     """
      Plan: 'Enterprise'
      Years: '3'
      User: 'test2@test.com'          
      Description: 'Subscription test2 user'
     """ 
     When I go to "List of Subscriptions" menu item
     Then I check subscription with email: "test2@test.com"
     