<div align="center">
  <h1> Auth Component </h1>

  <h4>A very customizable component built for any Angular project.</h4>

  <section>
    <a href="https://github.com/TriWebDev/authLib-workspace/pulls">
      <img src="https://img.shields.io/github/issues-pr/triwebdev/authLib-workspace" alt="pull requests">
    </a>
    <a href="https://github.com/TriWebDev/authLib-workspace/issues">
      <img src="https://img.shields.io/github/issues/triwebdev/authLib-workspace" alt="issues">
    </a>
  <a href="https://github.com/TriWebDev/authLib-workspace/commits/authLib/">
      <img src="https://img.shields.io/github/last-commit/TriWebDev/authLib-workspace" alt="last commit">
  </a>
    <a href="https://www.npmjs.com/package/@triwebdev/auth-component">
      <img src="https://img.shields.io/npm/v/@triwebdev/auth-component" alt="npm version">
    </a>
    <a href="https://github.com/TriWebDev/authLib-workspace/blob/master/projects/auth/LICENSE">
      <img src="https://img.shields.io/github/license/TriWebDev/authLib-workspace" alt="license">
  </a>
    <a href="https://twd-components-gallery.vercel.app/components/auth/playground">
      <img src="https://img.shields.io/badge/demo-View Deployement-green.svg" alt="demo">
    </a>
  </section>

  This is a component powered by Angular fully customizable via inputs that provides a functional auth, such as a login and a sign in.

  <div>
      <img src="https://i.imgur.com/VBsrZ37.png" alt="Component preview" />
    </div>
  </div>
</div>

## How To Use

### Basic Instalation

To use this component, you'll need to download the [npm](https://www.npmjs.com/package/@triwebdev/auth-component) package.

From your command line:

```bash
# Install this package
$ npm install @triwebdev/auth-component
```

Once you have download the package you can import it in the .ts of your component like this:

```ts
import { Component } from "@angular/core";
import { AuthComponent } from "@triwebdev/auth-component";

@Component({
    selector: "app-auth-implementation",
    imports: [AuthComponent],
    templateUrl: "./auth-implementation.component.html",
    styleUrl: "./auth-implementation.component.css",
})
export class AuthImplementationComponent {}
```

And in your .html like this:

```html
<app-auth></app-auth>
```

### Component Configuration

Once you have the component installed and working you can do several customizations:

#### Provider

In the app.config.ts you have to add a provider that should look like this:

```ts
provideAuth({ apiUrl: "http://localhost:3000/", loginRedirectionUrl: "/home" });
```

The apiUrl parameter is the backend main url that will be handling the requests from the form. In this example, the login endpoint of the backend would be "http://localhost:3000/login" and the sign up endpoint would be: "http://localhost:3000/create". Thus, if you put the value "http://localhost:3000/users" in the apiUrl parameter, the request will be handled in the "http://localhost:3000/users/login" for the login form and in the register "http://localhost:3000/users/create".

Example on how the request.body is received in the login:

```ts
{
  email: "mymail@mail.com",
  password: "myPassword",
}
```

Example on how the request.body is received in the signup endpoint:

```ts
{
  name: "myName",
  email: "myEmail@mail.com",
  password: "myPassword",
}
```

Keep in mind that the form makes an HTTP requests, so after adding all the previous configs, the file `app.config.ts` should look similar to this:

```ts
export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideAuth({ apiUrl: "http://localhost:3000/", loginRedirectionUrl: "/home" })],
};
```

#### How is the login managed internally?

For storing the user data, in the current version, we are using the localStorage for saving the response sent from the login endpoint. The data is stored in the "token" item. This is the code that is currently handling this logic:

```ts
if (response.ok) {
    const token = response.toString();
    localStorage.setItem("token", token);
    this.router.navigate([this.config.loginRedirectionUrl]);
}
```

Please note that this will likely be changed in future versions of the component for allowing the user to customize how the information is stored.

For making the above to work, you should return a string in your endpoint response. This would a preview on how this could be done:

```js
app.post("/login", (req, res) => {
    /* Manage your login logic here */
    const loginSuccessful = true;
    if (loginSuccessful) {
        /* Store user information in a JWT */
        res.json("MyJWT");
    }
});
```

Note that we return directly the JWT string in the response for the component to store the data successfully.

#### How to change the error message shown in a modal?

When the login works without any issue, no message will be shown in the screen and the the Angular router will go to the specified route in the provider (The loginRedirectionUrl).

When there was an issue during the login / register process, a modal will be shown in the right below side of the current page.

For customizing this message, you have to set it from the backend. This is how the message is collected in this component:

```ts
const sentMessage = errorResponse.error.messageToShow;
this.feedbackChange.emit({
    ok: false,
    message: sentMessage ? sentMessage : "An error has occurred",
});
```

Here you can see that the error response must have an errorToShow property defined if you want to override the "An error has occurred" message.

An example on how this response could be sent from the backend could be this one:

```js
app.post("/login", (req, res) => {
    const { email, password } = { ...req.body };

    const user = findUser(email);
    if (!user) {
        res.status(401).json({ messageToShow: "Incorrect credentials, please try again" });
    }

    if (!passwordMatches(user.password, password)) {
        res.status(401).json({ messageToShow: "Incorrect credentials, please try again" });
    }
});
```

Another example for the register endpoint (`/create`):

```js
app.post("/create", (req, res) => {
    const { email, password } = { ...req.body };

    if (password.length < 8) {
        return res.status(400).json({
            messageToShow: "The password must be at least 8 characters long",
        });
    }
});
```

#### Inputs

The component have some different inputs that you can use for customizing the theme.

The `theme` input allows you to choose between some established themes like 'classicB&W' and 'neoViolet' :

```html
<app-auth [theme]="'classicB&W'"></app-auth>
```

The `primary`, `secundary` and `input` input allows you to put customized colors to the component:

```html
<app-auth [primary]="'#f62'" [secundary]="'#2f2'" [input]="'#0ff'"></app-auth>
```

## Download

You can download the latest installable version of the component [here](https://www.npmjs.com/package/@triwebdev/auth-component).

## Authors

The authors of the project:

> GitHub [@DavMunHer](https://github.com/DavMunHer) &nbsp;&middot;&nbsp;
> LinkedIn [@David Muñoz Herrero](https://www.linkedin.com/in/davmunher/) &nbsp;&middot;&nbsp;

> GitHub [@OscBarCan](https://github.com/oscbarcan) &nbsp;&middot;&nbsp;
> LinkedIn [@Oscar Barber Canet](https://www.linkedin.com/in/osbarca/) &nbsp;&middot;&nbsp;

---
