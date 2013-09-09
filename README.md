jquery.doodal.js
================

> jQuery.doodal.js is a very simplistic modal plugin for jQuery. It has custom events, allows stacking, and is powered by CSS transitions

[See the demo](http://james2doyle.github.io/jquery.doodal.js/)

### Usage

Instatiate a new doodal.

```javascript
$('.doodal').doodal({
  type: 'modal',
  closeclass: '.doodal-close',
  trueclass: '.doodal-true',
  falseclass: '.doodal-false',
  showclass: 'showing'
});
```

Those are all the default options so in this specific example I am not actually overwriting anything.

Now trigger an `open` to see it:

```javascript
$('#doodal1').trigger('open');
```


### Custom Events
* *open*: - when the modal starts to open
* *afteropen*: - after the animation is over and it is open
* *ontrue*: - for confirms yes button
* *onfalse*: - for confirms no button
* *close*: - when the close is clicked
* *afterclose*: - after the animation is over and it is hidden