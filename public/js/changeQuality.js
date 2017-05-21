/**
 * Created by samhv on 5/21/17.
 */
$(document).ready(function () {
    $('#hd-btn').on('click', function () {
        let player = $('#video-player');
        let src = player.data("hd");

        let video = document.getElementById('video-player');
        let currentTime = video.currentTime;

        player.attr("src", src);

        video.pause();
        video.currentTime = currentTime;
        video.load();
        video.play()
    });
});