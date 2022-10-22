        //Sliide show automation codes in pure js
        let slideIndex = 0;
        //showSlides();

        function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        if (slideIndex-1) {
            slides[slideIndex-1].style.display = "block";//just modified to fix some bugs
        }
        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }

export default showSlides;