function answerArea()
{
    
        
        let ans = calcArea();
        document.getElementById("ans").innerHTML = "YOUR RECTANGLE ARE IS : "+  ans;


   
}

function calcArea()
{ 
        let h = Number(document.getElementById("height").value);
        let w = Number(document.getElementById("width").value);
        
    if (!isNaN(h) && !isNaN(w))
    {
        return h * w;
    }
    else
    {
         
         return "PLEASE ENTER A VALID INPUT..."
    }
        
}