const humburger = document.getElementById('humburger');
const sidebar = document.getElementById('sidebar');
let flag = true;
humburger.addEventListener('click', () => {
    if (flag) {

        sidebar.classList.remove('d-none');
        humburger.classList.remove('fa-list');
        humburger.classList.add('fa-times');
        document.body.classList.add('no-scroll');
        document.getElementById('main').classList.add('main')
        document.body.classList.add('no-scroll');
        document.getElementById('main').addEventListener('click', () => {
            humburger.classList.add('fa-list');
            humburger.classList.remove('fa-times');
            sidebar.classList.add('d-none');
            document.getElementById('main').classList.remove('main')
            document.body.classList.remove('no-scroll');
            flag=true;

        })
        flag = false;
    } else {
        document.body.classList.remove('no-scroll');
        humburger.classList.add('fa-list');
        humburger.classList.remove('fa-times');
        sidebar.classList.add('d-none');
        document.getElementById('main').classList.remove('main')



        flag = true;
    }

})
const sidebarLinks = sidebar.querySelectorAll('a');
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    humburger.classList.add('fa-list');
    humburger.classList.remove('fa-times');
    sidebar.classList.add('d-none');
    document.getElementById('main').classList.remove('main');
    document.body.classList.remove('no-scroll');
    flag = true;
  });
});

window.addEventListener("load", function(){
    document.getElementById("loader-body").classList.add("d-none");
})


const canvas = document.getElementById('galaxyCanvas');
        const ctx = canvas.getContext('2d');

        // Variables for animation
        let width, height;
        let stars = [];
        const STAR_COUNT = 150; // The total number of stars

        /**
         * Sets canvas dimensions to match the window size.
         */
        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        /**
         * Star object constructor.
         */
        function Star() {
            // Random initial position within the viewport
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // Random size (radius) and opacity for a twinkling effect
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random();
            
            // Very slow drift speed (galaxy effect)
            this.speedX = Math.random() * 0.1 - 0.05;
            this.speedY = Math.random() * 0.1 - 0.05;
        }

        /**
         * Draws the star on the canvas.
         */
        Star.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
            ctx.fill();
        };

        /**
         * Updates the star's position and wraps it around the screen.
         */
        Star.prototype.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap stars around the screen (teleport to the opposite edge)
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
            
            // Subtle random opacity change for a twinkle/shimmer effect
            this.opacity += (Math.random() - 0.5) * 0.01;
            if (this.opacity < 0.1) this.opacity = 0.1;
            if (this.opacity > 1) this.opacity = 1;
        };

        /**
         * Main animation loop.
         */
        function animate() {
            // Clear the canvas on each frame (draw a black box over everything)
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            // Update and draw all stars
            for (let i = 0; i < stars.length; i++) {
                stars[i].update();
                stars[i].draw();
            }

            // Request the next frame for smooth animation (around 60 times per second)
            requestAnimationFrame(animate);
        }

        /**
         * Initialization function.
         */
        function init() {
            resizeCanvas(); // Set the initial size
            window.addEventListener('resize', resizeCanvas); // Handle resizing
            
            // Create the initial array of stars
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }

            animate(); // Start the animation loop
        }

        // Start the application when the document is fully loaded
        document.addEventListener('DOMContentLoaded', init);