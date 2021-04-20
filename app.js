// Delgetstei ajillah controller
var uiController = (function(){
   
})();

// Sanhuuteoi ajillah controller
var financeController = (function(){

})();

// Programmin holbogch controller
var appController = (function(uiController, financeController)
{
    var ctrlAddItem = function()
    {
        // 1. Oruulah ugugdliig delgetsees olj avna.
        console.log("Delgetsees ugugdluu avah heseg")
        // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna. 
        // 3. Olj avsan ugugdluudiig web deeree tohiroh hesegt n gargana.
        // 4. Tusuviig tootsoolno.
        // 5. Etssiin uldegdel, tootsoog delgetsend gargana.
    }
   document.querySelector(".add__btn").addEventListener("click", function(){
    ctrlAddItem();
   });

   document.addEventListener("keypress", function(event){ //Enter darj bui listener enteriin keycode ni 13
       if(event.keyCode === 13  || event.which === 13){
        ctrlAddItem();
       }
   });

})(uiController, financeController);

   