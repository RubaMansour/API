'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {

    // Copy over the implementation from last week
    return new Promise((resolve) => {
        let  catPosition =startPos;
        const interVal= setInterval(()=>{ 
          catPosition +=STEP_SIZE_PX;
          img.style.left=catPosition+'px';
           if(catPosition>=stopPos){
            clearInterval(interVal) ;
            resolve();
           }
        },STEP_INTERVAL_MS);
        
        // Resolve this promise when the cat (`img`) has walked from `startPos` to
        // `stopPos`.
        // Make good use of the `STEP_INTERVAL_PX` and `STEP_INTERVAL_MS`
        // constants.
      });
  
}

function dance(img) {
    return new Promise((resolve) => {
        img.src=DANCING_CAT_URL;
        setTimeout(() => {
          img.src ="http://www.anniemation.com/clip_art/images/cat-walk.gif";
          
          resolve();
        }, DANCE_TIME_MS);
        // Switch the `.src` of the `img` from the walking cat to the dancing cat
        // and, after a timeout, reset the `img` back to the walking cat. Then
        // resolve the promise.
        // Make good use of the `DANCING_CAT_URL` and `DANCE_TIME_MS` constants.
      });
}

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;
  while (true) {
    await walk(img, startPos, centerPos);
    await dance(img);
    await walk(img,centerPos,stopPos);
    await catWalk()

}
  // Use async/await syntax to loop the walk and dance functions
}

window.addEventListener('load', catWalk);