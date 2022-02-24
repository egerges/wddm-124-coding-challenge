'USE STRICT';

// FEEDS UI CONTROLLER
const FEEDS_UI_CONTROLLER = (function () {
    const DOMstrings = {
        wallHolder: '#wall-holder'
    };

    return {
        getUIDOMStrings: function() {
            return DOMstrings;
        },

        getFeedComponent: function(element) {
            let prefix =  `
            <div class="w3-container" id="services" style="margin-top:75px">
                <h1 class="w3-xxxlarge w3-text-red"><b>${element.category}.</b></h1>
                <hr style="width:50px;border:5px solid red" class="w3-round">
            `;
            let sufix = '</div></div>';
            element.items.forEach(item => {
                prefix += `
                <div class="w3-row-padding "> <!--w3-grayscale-->
                    <div class="w3-col m4 w3-margin-bottom">
                        <div class=""> <!--w3-light-grey-->
                            <img src="${item.thumbnail_url}" alt="${item.slug}" style="width:22.5vw; height:22.5vw; object-fit: fill;">
                            <div class="w3-container">
                                <h3>${item.name}</h3>
                                <p class="w3-opacity">${element.category}</p>
                            </div>
                        </div>
                    </div>
                    <div class="w3-col m8 w3-margin-bottom">
                `;
                let ol = `<ol class="instructions">`;
                item.instructions.forEach(instruction => {
                    ol += `<li>${instruction.display_text}</li>`;
                });
                ol += '</ol></div>';
                prefix += ol;
            });
            return prefix + sufix;
        }
    }
})();

// FEED CONTROLLER
var FEED_CONTROLLER = (function(UICtrl) {
 
    var DOM = UICtrl.getUIDOMStrings();
    var source = COMMON_UI_CONTROLLER;

    function getAPIData() {
        APIS.getFeeds()
        .then(data => {
            populateData(refactorData(data.results));
        })
        .catch(err => {
            console.log(err);
            alert(err.message);
        });
    }

    function refactorData(oldData) {
        let newData = [];
        oldData.forEach(element => {
            if(element.type && (element.type === 'carousel')) {
                newData.push(element);
            }
        });

        return newData;
    }

    function populateData(data) {
        console.log(data);
        data.forEach(element => {
            source.getQS(DOM.wallHolder).innerHTML += UICtrl.getFeedComponent(element);
        });
        // source.getQSA(DOM.imgs)
        // .forEach(img => {
        //     img.offsetHeight = img.offsetWidth;
        // });
        // setupEventListeners();
    }

    var setupEventListeners = function() {
        // source.getQSA(DOM.song)
        // .forEach(el => {
        //     el.addEventListener('click', (e) => {
        //         var song = e.target.getAttribute('data-url');
        //         var src = '/assets/music/' + song + '.mp3';
        //         if(!player) {
        //             player = source.getQS(DOM.player);
        //             player.style.visibility = 'visible';
        //         }

        //         source.getQS(DOM.artistName).innerHTML = song.split('/')[0];
        //         source.getQS(DOM.songName).innerHTML = song.split('/')[1];

        //         source.getQS(DOM.audioPlayer).setAttribute('src', src);
        //         source.getQS(DOM.audioPlayer).play();
        //     });
        // });

        // source.getQS(DOM.searchBar).addEventListener('input', (e) => {
        //     var searchValue = e.target.value;
        //     if(searchValue != " ") {
        //         API_CONTROLLER.getSongsFrom(searchValue)
        //         .then(response => response.json())
        //         .then(result => {
        //             source.getQS(DOM.holder).innerHTML = '';
        //             populateData(result.songs);
        //             setupEventListeners();
        //         })
        //         .catch(err => {
        //             alert(err.message);
        //         });
        //     }
        // });
    };
 
    return {
        init: function() {
            getAPIData();
        }
    };
 
})(FEEDS_UI_CONTROLLER);
 
window.addEventListener('load', function () {
    FEED_CONTROLLER.init(); 
});