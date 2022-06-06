# Devlog

This file should show the whole history of the project.

## 04 June 2022

### Project structure

[Organize your next PHP project the right way](https://code.tutsplus.com/tutorials/organize-your-next-php-project-the-right-way--net-5873)

What the article proposes : 
```
├── public_html
│   ├── css
│   ├── img
│   └── js
└── resources
    ├── library
    └── templates
```

### Where to you use PHP or Javascript

[How To Use PHP, JavaScript (Or JQuery), And HTML Together](https://cullenwebservices.com/how-to-use-php-javascript-or-jquery-and-html-together/)

> The PHP code creates HTML, JavaScript and CSS to be used by the browser. If you need to use a scripting language, such
> as PHP, once the page has been loaded into the browser, then you must either refresh the page or use Ajax to request 
> more processing at the server side.

### Designing the app

- Top bar with the account name, login, logout...
- Sidebar where there will be all the available channels
  - Current channel needs to be highlighted
  - At the top, button to add new channel and search bar next to it
  - Number of messages that are not yet read is written next to the channel name
- Footer with some random stuff that needs to be in the footer
- The rest of the page will be the space where messages are displayed
  - Profile picture next to the message
  - Date and hour on which the message what posted

### Starting to work on the templates

I'm following the way they are doing templates in the link from [Project Structure](#project-structure).

I first tried to do it on my own but later learned that I can use any bootstrap for the project design.
I used the following [template](https://bootsnipp.com/snippets/1ea0N)