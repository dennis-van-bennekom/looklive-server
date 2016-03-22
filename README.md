# LookLive

## Taskmanagers

Taskmanagers zijn handige tools om je build proces te automatiseren. Er zijn een aardig wat verschillende build tools zoals:
- [gulp](http://gulpjs.com/)
- [grunt](http://gruntjs.com/)
- [webpack](https://webpack.github.io/)
- [npm](https://docs.npmjs.com/misc/scripts)

Zelf gebruik ik graag gulp voor front-end projecten of webpack als het een react of ander javascript gebaseerd project is. Soms is het ook handig om npm scripts te gebruiken als het maar hele kleine dingen zijn die je hoeft te automatiseren. Het voordeel hiervan is dat je niet speciale build tools hoeft te installeren, maar gewoon je package.json kan gebruiken.

De reden dat ik gulp zou kiezen in plaats van grunt is dat het veel minder configuratie is. Gulp is veel logischer voor mijn gevoel, omdat het een soort pipeline is waar je bestanden doorheen gestuurd worden en waar je ondertussen bewerkingen op doet. [bron](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4).

Voor dit project kies ik er voor om gulp te gebruiken, omdat ik denk dat de dingen die ik ermee wil doen te veel zijn voor npm scripts, die dan veel minder overzichtelijk worden. Ik kies niet voor webpack omdat ik dat voor een project als dit niet fijn vind werken en ik niet echt gebruik wil maken van `import` dingen.
