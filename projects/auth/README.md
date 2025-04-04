<h1 align="center"> Auth Component </h1>

<h4 align="center">A very customizable component built for any Angular project</a>.</h4>

<p align="center">
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
  <a href="">
    <img src="https://img.shields.io/badge/demo-WIP-green.svg" alt="demo">
  </a>
</p>

This is a component powered by Angular fully customizable via inputs that provides a functional auth, such as a login and a singn in.

![Chat Preview](https://i.imgur.com/VBsrZ37.png)

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#authors">Authors</a>
</p>

## How To Use

### Basic Instalation

To use this component, you'll need to download the [npm](http://npmjs.com) package.

From your command line:

```bash
# Install this package
$ npm install @triwebdev/auth-component
```

Once you have download the package you can import it in the .ts of your component like this:

```ts
import { Component } from "@angular/core";
import { AuthComponent } from "auth";

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

Keep in mind that the form makes an HTTP requests, so after adding all of it, the file `app.config.ts` should look similar to this:

```ts
export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideAuth({ apiUrl: "http://localhost:3000/", loginRedirectionUrl: "/home" })],
};
```

#### Inputs

The component have some different inputs that you can use for customizate the theme.

The `theme` input allows you to choose between some established themes like 'classicB&W' and 'neoViolet' :

```html
<app-auth [theme]="'classicB&W'"></app-auth>
```

The `primary`, `secundary` and `input` input allows you to put customizable colors to the component:

```html
<app-auth [primary]="'#f62'" [secundary]="'#2f2'" [input]="'#0ff'"></app-auth>
```

## Download

You can download the latest installable version of the component [here](https://github.com/TriWebDev/librariesAppTWD) .

## Authors

The authors of the project:

> GitHub [@DavMunHer](https://github.com/DavMunHer) &nbsp;&middot;&nbsp;
> Linkedin [@David Muñoz Herrero](https://www.linkedin.com/in/davmunher/) &nbsp;&middot;&nbsp;

> GitHub [@OscBarCan](https://github.com/oscbarcan) &nbsp;&middot;&nbsp;
> Linkedin [@Oscar Barber Canet](https://www.linkedin.com/in/osbarca/) &nbsp;&middot;&nbsp;

---
