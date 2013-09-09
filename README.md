jquery.doodal.js
================

### Usage

Instatiate a new doodal.

```javascript
$('.doodal').doodal();
```

trigger an open to see it

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