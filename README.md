HOW TO ADD A NEW EXERCISE

OPPVARMING:
data/oppvarming.js

RANGE:
data/range.js

CHIPPING:
data/chipping.js

BUNKER:
data/bunker.js

PUTTING:
data/putting.js



Media gets input into:

GIFS:
images/gifs/

IMAGES:
images/exercises/

Videos:
images/videos/



IF creating a New category need to:

1. create New file under data: aka.js
2. inside that .js file copy from other .js files in data and change text
3. load it inside index.html - <script src="data/new file.js"> </script>
IMPORTANT need to be before category.js and app.js

4. open category.js and add New category into line, last line shall not have a comma (,)

And voila, it will now work




If adding a video instead of image to site use: videoFile: "location.mp4" example 
{
  navn: "Bekkentilt",
  timer: 120,
  videoFile: "images/videos/bekkentilt.mp4"
}

