// Delgetstei ajillah controller *****************************************
var uiController = (function(){

    var DOMstrings = {   // Ashiglaj bui classuud
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    };

    return {
        getInput : function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();








// Sanhuutei ajillah controller *****************************************
var financeController = (function(){

    // Orlogiin baiguulagch funkts object
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    // Zarlagiin baiguulagch funkts object
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        // Orlogo, zarlaga hadgalah
        allItems : {
            inc : [],
            exp : []
        },

        // Orlogiin niilber, zarlahiin niilber hadgalah
        totals: {     
            inc: 0,
            exp: 0
        }
    }
       
})();






// Programmin holbogch controller *****************************************
var appController = (function(uiController, financeController)
{

    var ctrlAddItem = function()
    {
        // 1. Oruulah ugugdliig delgetsees olj avna.
        console.log(uiController.getInput());

        // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna. 
        // 3. Olj avsan ugugdluudiig web deeree tohiroh hesegt n gargana.
        // 4. Tusuviig tootsoolno.
        // 5. Etssiin uldegdel, tootsoog delgetsend gargana.
    };
   
    var setupEventListeners = function(){

        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener("click", function(){
            ctrlAddItem();
           });
        
           document.addEventListener("keypress", function(event){ //Enter darj bui listener enteriin keycode ni 13
               if(event.keyCode === 13  || event.which === 13){
                ctrlAddItem();
               }
           });
    }

    return{
        init: function(){
            console.log("Application started ... ");
            setupEventListeners();

        }
    }

})(uiController, financeController);

appController.init(); // Buh uil ajillagaag shineer ehluulj baina.







