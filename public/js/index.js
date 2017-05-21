/**
 * Created by samhv on 5/21/17.
 */
$(document).ready(function () {
    $('.video-card').on('click', function () {
        let link = $(this).data('link');
        location.href = link;
    });


    (function(){
        let speed = 900,
            containers = document.getElementsByClassName("u-fancy-load");
        for(let c = 0; c < containers.length; c++){
            let container = containers[c],
                children = container.children;

            if(!container.classList.contains("delay-set")){
                container.classList.add("delay-set");

                for(let i = 0; i < children.length; i++){
                    let child = children[i],
                        childOffset = child.getBoundingClientRect(),
                        offset = childOffset.left*0.8 + childOffset.top,
                        delay = parseFloat(offset/speed).toFixed(2);

                    child.style.webkitTransitionDelay = delay + "s";
                    child.style.transitionDelay = delay + "s";
                }
            }
            container.classList.add("u-fancy-load--in");
        }
    })();
});



