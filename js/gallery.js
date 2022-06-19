

let galleryImages = document.querySelectorAll(".gallery-img"); 
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image,index){
        image.onclick = function() {
            let getElementCss = window.getComputedStyle(image); //grabs all the styling from the CSS file
            let getFullImgUrl = getElementCss.getPropertyValue("background-image"); //retrieves the url of the image that was clicked on from the css file
            let getImgUrlPos = getFullImgUrl.split("/img/thumbs/"); //splits the url to two parts, second part of which will just be the file name 
            let setNewImgUrl = getImgUrlPos[1].replace('")',''); //removes the " and ) from the end of the string
            
            getLatestOpenedImg = index + 1;

            let container = document.body; //set where we are going to place the open image - in this case its going in the page body
            let newImgWindow = document.createElement("div"); //create a new div to put the iamge in
            container.appendChild(newImgWindow); //adds the div into the page body
            newImgWindow.setAttribute("class","img-window");
            newImgWindow.setAttribute("onclick","closeImg()");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src","img/"+setNewImgUrl);
            newImg.setAttribute("id","current-img");

            newImg.onload = function(){  //check that the image has loaded before creating the next/back buttons

                let imgWidth = this.width; //get the width of the image
                let calcImgToEdge = (windowWidth - imgWidth)/2 -80; //finds the distance one either side from the image to the window edge -80px for a margin

                //previous button
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("Back");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class","img-btn-prev");
                newPrevBtn.setAttribute("onclick","changeImg(0)");
                newPrevBtn.style.cssText = "left:"+calcImgToEdge+"px;"

                //next button
                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("Next");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class","img-btn-next");
                newNextBtn.setAttribute("onclick","changeImg(1)");
                newNextBtn.style.cssText = "right:"+calcImgToEdge+"px;"

            }

        


        }
    });  

}

//Function to close the image window
function closeImg() {
    document.querySelector(".img-window").remove(); //closes the currently open picture
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}


//Function to move to next or previous image
function changeImg(changeDir) {
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg; 
    //Depending on which button is pressed (next/back) select the next image to load
    if(changeDir === 1) {
        //if next move forward 1 image and if end of list move back to start
        calcNewImg = getLatestOpenedImg + 1;
        if (calcNewImg > galleryImages.length){
            calcNewImg = 1;
        }
    }
    else if(changeDir === 0) {
        //if back move backwards 1 image and if start of list go to the end
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "img/img" + calcNewImg + ".jpg");
    newImg.setAttribute("id", "current-img");
    getLatestOpenedImg = calcNewImg;

    newImg.onload = function() {
        let imgWidth = this.width; //get the width of the image
        let calcImgToEdge = (windowWidth - imgWidth)/2 -80; //finds the distance one either side from the image to the window edge -80px for a margin

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right:"+calcImgToEdge+"px;"

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left:"+calcImgToEdge+"px;"

    }

}