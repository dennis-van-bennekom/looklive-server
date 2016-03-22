# LookLive

https://performance.dennisvanbennekom.com

## Taskmanagers

Taskmanagers zijn handige tools om je build proces te automatiseren. Er zijn een aardig wat verschillende build tools zoals:
- [gulp](http://gulpjs.com/)
- [grunt](http://gruntjs.com/)
- [webpack](https://webpack.github.io/)
- [npm](https://docs.npmjs.com/misc/scripts)

Zelf gebruik ik graag gulp voor front-end projecten of webpack als het een react of ander javascript gebaseerd project is. Soms is het ook handig om npm scripts te gebruiken als het maar hele kleine dingen zijn die je hoeft te automatiseren. Het voordeel hiervan is dat je niet speciale build tools hoeft te installeren, maar gewoon je package.json kan gebruiken.

De reden dat ik gulp zou kiezen in plaats van grunt is dat het veel minder configuratie is. Gulp is veel logischer voor mijn gevoel, omdat het een soort pipeline is waar je bestanden doorheen gestuurd worden en waar je ondertussen bewerkingen op doet. [bron](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4).

Voor dit project kies ik er voor om gulp te gebruiken, omdat ik denk dat de dingen die ik ermee wil doen te veel zijn voor npm scripts, die dan veel minder overzichtelijk worden. Ik kies niet voor webpack omdat ik dat voor een project als dit niet fijn vind werken en ik niet echt gebruik wil maken van `import` dingen.

## Gulpfile

Ik heb tasks gemaakt voor de dingen die het belangrijksts zijn om te optimizen:

### Styles

De verbeteringen die ik hier doe is vooral de cssnano stap. Die minified het css bestand zodat het zo klein mogelijk is. Ook gebruik ik autoprefixer zodat alle prefixes die er misschien nodig zijn erin komen te staan.

```js
gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(autoprefixer('last 1 version'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.stream());
});
```

### Scripts

Deze lijkt heel erg op de styles taks, alleen maak ik hier gebruik van uglify om de code zo compact mogelijk te krijgen.

```js
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
});
```

### Images 

Ik gebruik hier imagemin om de images zo klein mogelijk te krijgen zonder al te veel kwaliteit te verliezen. Ook maak ik hier gebruik van de gulp-cache plugin die ervoor zorgt dat afbeeldingen die al een keer geoptimaliseerd zijn niet nog een keer erdoor heen gaan. 

```js
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/images'));
});
```

### Serve

Deze task start ik als ik een lokale server wil starten met live reload, dit maakt het developen een stuk fijner.

```js
gulp.task('scripts-watch', ['scripts'], browserSync.reload);
gulp.task('images-watch', ['images'], browserSync.reload);

gulp.task('serve', ['build'], function() {
  browserSync.init({
    proxy: 'localhost:3000'
  })

  gulp.watch('src/styles/**/*.css', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts-watch']);
  gulp.watch('src/images/**/*', ['images-watch']);
  gulp.watch('views/**/*.hbs').on('change', browserSync.reload);
});
```

### Build

De build task gebruik ik om een productie versie te maken

```js
gulp.task('build', function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('default', ['build']);
```
