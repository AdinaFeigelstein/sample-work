/*global $*/

(function () {
    'use strict';
    const mph = $('#mph');
    const sidebar = $('#sidebar');
    const dragAudio = $('#dragAudio');
    const dropAudio = $('#dropAudio');
    const soundButton = $('#sound');
    const saveButton = $('#save');
    const loadButton = $('#load');
    const numParts = 27;
    let dragging = false;
    let partsArray = [];
    let offset;
    let z = 1;

    // load the potato parts
    function placeParts() {
        for (let i = 2; i < numParts; i++) {
            partsArray.push($(`<img class = "mphPart" src="media/MPHparts/Picture${i}.png"/>`)
                .appendTo(sidebar));
        }
    }
    placeParts();

    //enable the dragging
    $(document).on('mousedown', '.mphPart', e => {
        e.preventDefault();
        dragging = $(e.target);
        offset = { y: e.offsetY, x: e.offsetX, };
        dragging.css('position', 'absolute');
        if (!dragging.is(mph)) {
            dragging.css('z-index', z++);
        }
        dragAudio[0].play();

    }).mousemove(e => {
        if (dragging) {
            dragging.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
        }
    }).mouseup(() => {
        if (dragging) { dropAudio[0].play(); }
        dragging.css('position', 'fixed');
        dragging = false;

    });

    //save the design
    function save() {
        let partInfo = [];
        partsArray.forEach(part => {
            partInfo.push({
                top: part.css('top'),
                left: part.css('left'),
                position: part.css('position'),
                zIndex: part.css('z-index')
            });
        });
        localStorage.setItem('parts', JSON.stringify(partInfo));
    }
    saveButton.click(function () {
        save();
        $(this).text('Saved!');
    });

    //load previous design
    function load() {
        const partInfo = JSON.parse(localStorage.getItem('parts'));
        if (partInfo) {
            partInfo.forEach((part, index) => {
                partsArray[index].css(part);
            });
        }
    }
    loadButton.click(load);

    //enable the mute button
    let muted = false;
    soundButton.click(function () {
        if (!muted) {
            $(this).html('Unmute');
            $('audio').prop('muted', true);
            muted = true;
        } else {
            $(this).html('Mute');
            $('audio').prop('muted', false);
            muted = false;
        }
    });

    //Reset button
    // resetButton.click(()=>{
    //     movedParts.forEach(part => {
    //         part.appendTo(sidebar);
    //     });
    // });

}());