var game_data;
var current_state;

var stim = 0;
var points = 0;

setTimeout(function(){
        $('#load').fadeOut(500, function() {
        $('#main').fadeIn(500);
        $('#buttons').fadeIn(500);
    });
}, 5000);


$.getJSON( "game.json", function( data ) {
        game_data = data;
        current_state = data['start_state'];
        $('#game_text').html( game_data['states'][ data['start_state'] ]['text'] ); 

});



function next_state( state) {
    console.log("Current State = " + current_state + " --> New State= " + state) 
    current_state = state
    if (game_data['states'][ current_state ]['text'] != null){

        if (game_data['states'][ current_state ]['play_sound'] != null){
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', game_data['states'][ current_state ]['play_sound']);
        audioElement.play();
        }


        $('#game_text').show();

        $('#game_text').html( game_data['states'][ current_state ]['text'] );

        if(game_data['states'][ current_state ]['show_none'] != null){ 
            $('#but_p').hide();
            $('#but_a').hide();
            $('#but_b').hide();
            $('#main').show();
            $('#but_cont').hide();

        } else if(game_data['states'][ current_state ]['show_cont'] != null) { 
            $('#but_p').hide();
            $('#but_b').hide();
            $('#but_a').hide();
            $('#title').hide();
            $('#main').show();
            $('#but_cont').show();
        
        } else {
            $('#but_a').show();
            $('#but_b').show();
            $('#but_cont').hide();
            $('#title').hide();
        } 
        
        if (game_data['states'][ current_state ]['next_state'] && game_data['states'][ current_state ]['next_state'].length >= 2) {
            $('#but_a').text(game_data['states'][ current_state ]['next_state'][0]['button_text']);
            $('#but_b').text(game_data['states'][ current_state ]['next_state'][1]['button_text']);
        }

        var video = document.getElementById('show_video');
        if(game_data['states'][ current_state ]['show_video'] != null){ 
            $('#but_p').hide();
            $('#but_a').hide();
            $('#but_b').hide();
            $('#main').hide();
            $('#but_cont').hide();
            video.src = game_data['states'][ current_state ]['show_video'];
            $('#show_video').show();
            video.play();
            document.getElementById("bg_music").muted = true;
        }
        

    } else {
        
        console.log("no text");
        if (game_data['states'][ current_state ]['stim_change'] != null){
            console.log("+ stim " + game_data['states'][ current_state ]['stim_change'] )
            stim = stim + game_data['states'][ current_state ]['stim_change']
        }
        if (game_data['states'][ current_state ]['point_change'] != null){
            console.log("+ point " + game_data['states'][ current_state ]['stim_change'] )
            points = points + game_data['states'][ current_state ]['point_change']
        }
        if (game_data['states'][current_state]['image_change'] != null){
            // $("#game_img").html( game_data['states'][current_state]['image_change']);
            $('#game_img').hide();
            document.body.style.backgroundImage = "url('" + game_data['states'][ current_state ]['image_change'] + "')";
        }
        next_state( game_data['states'][ current_state ]['next_state']) 
    }
}


document.addEventListener("DOMContentLoaded", function() {
var audio = document.getElementById("bg_music");
    var musicButton = document.getElementById("musicButton");    

    function toggleMusic() {
        if (audio.paused) {
            audio.play();
            musicButton.textContent = "Pause Music";
        } else {
            audio.pause();
            musicButton.textContent = "Play Music";
        }
    }
    musicButton.addEventListener("click", toggleMusic);
});

function key_input(what_key){
    for(i=0; i< game_data['states'][current_state]['next_state'].length; i++){
        if( what_key == game_data['states'][current_state]['next_state'][i]['key_input']) {
            next_state(game_data['states'][current_state]['next_state'][i]['state_name']) 
        } 
    }
    console.log(what_key);
}