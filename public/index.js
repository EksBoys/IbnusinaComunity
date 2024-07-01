// script.js
document.getElementById('loadButton').addEventListener('click', function() {
    var loader = document.getElementById('loader');
    loader.classList.remove('hidden');

    // Simulasi loading dengan timeout (misalnya 5 detik)
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 5000); // Ganti ini dengan logika yang sebenarnya jika ada
});
