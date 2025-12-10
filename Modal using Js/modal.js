document.querySelector('.check').addEventListener('click', function () {

    // show modal
    document.querySelector('.m1').style.display = "flex";  // or block

    const modal = document.querySelector(".modal");

    modal.style.position = "absolute";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "rgba(78, 27, 209, 0.77)";
    modal.style.padding = "10px 20px";
});

document.querySelector('.svg').addEventListener('click', function () {
    document.querySelector(".m1").style.display = "none";
});
