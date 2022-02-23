'USE STRICT';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Script to open and close sidebar
    function sidebar_open() {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }
    
    function sidebar_close() {
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myOverlay").style.display = "none";
    }

    document.querySelectorAll('.sidebar-close')
    .forEach(btn => {
        btn.addEventListener('click', sidebar_close);
    });

    document.querySelectorAll('.sidebar-open')
    .forEach(btn => {
        btn.addEventListener('click', sidebar_open);
    });
});