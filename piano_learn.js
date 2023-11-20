document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.backBtn').addEventListener('click', function() {
        playClickSound();
        
        window.addEventListener('beforeunload', function () {
           
            return playClickSound();
        });
       
        window.location.href = 'main_menu.html';
    });
});

function playClickSound() {
    const clickSound = new Audio('notes/C.mp3');
    return clickSound.play();
}

   
const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']


const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
    console.log("key added")
    key.addEventListener('click',() => playNote(key))
})

document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key
    const whiteKeyIndex = WHITE_KEYS.indexOf(key)
    const blackKeyIndex = BLACK_KEYS.indexOf(key)

    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])



})
function playNote(key) {
    console.log("KEY PRESSED");
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0
    noteAudio.play()
    key.classList.add ('active')
    noteAudio.addEventListener('ended' , () => {
       
        key.classList.remove('active')
    })

}