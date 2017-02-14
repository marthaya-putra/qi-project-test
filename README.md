#qi-project-test

<p>
Decided to go with Angular 2 + Typescript + Webpack for the test. To expedite things up, I use <a href="https://angularclass.github.io/angular2-webpack-starter/">angular2-webpack-starter </a>
from Angular Class.
</p>

<p>
Instagram developer's default mode is Sandbox mode, therefore only can play around with the data from users in the box.

I reqistered a user with following credential :
    <code >username: qiproject
    password: arvato
    </code>
</p>

## How to get a client id
<p>
I put the default client id I registered with qiproject, but can be configured in the "Settings" page. To get a client id, you will have to register as an Instagram developer (if you don't have one) and then go to <a href="https://www.instagram.com/developer/clients/manage/">Manage Client</a> menu to register your application. After the application's registration, you will be given client id. You can see this tutorial for more detail : https://fbombmedia.com/register-an-app-with-instagram/
  </p>

## How to invite users to the Sandbox
<p>
 You can ivite up to 10 users to the sandbox, to invite simply go to the "Manage Clients" page.
 Click manage button, it should take you to your client page.
 Go to "Sandbox" tab and you can invite user by typing their user name.
</p>

<p>
    I did add some unit tests, but not for all components/ services because of time constraint (to get use to Angular 2 took more time than expected)
</p>

# Here the instruction taken from angular2-webpack-starter to start/test the app

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v4.x.x`+ (or `v5.x.x`) and NPM `3.x.x`+

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typescript` (`npm install --global typescript`)

* `npm install webpack-dev-server rimraf webpack -g` to install required global dependencies
* `npm install` to install all dependencies or `yarn`
* `npm run server` to start the dev server in another tab
# `npm run test' to run the unit tests

That's it! Please let me know if you have any questions :)
