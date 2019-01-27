# WordPress Boilerplate Theme
A boilerplate WordPress theme that uses Webpack to do the heavy lifting.

[By Robots](https://by-robots.com)

## Introduction
For an introduction and explanation of this boilerplate please check out the
related [blog post](https://by-robots.com/2019/01/webpack-and-wordpress).

## Usage
You'll need to do a smidge of configuration first. Copy `.env.sample` to `.env`
and adjust the values in it accordingly. They're all commented.

### Local
This assumes your WordPress development environment runs on localhost, for
example, by running `php -S localhost:8000`. You may need to change some of the
dev server configuration if this is not the case.

Simply run `npm start`. The initial build may take a few moments but then
updates will happen much quicker. Check out the `fucntions/enqueue.php` file to
see how things get included.

### Production
The command you're after is `npm run build`. This will run all the various tasks
ready for a production environment.
