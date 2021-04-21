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
        },

        addListItem: function(item, type){
            // Orlogo zarlagiin elementiig aguulsan HTML iig beltgene.
            var html, list;
            
            if(type === 'inc'){
                list = ".income__list";
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else
            {
                list = ".expenses__list";
                html = ' <div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Ter HTML dotroo orlogo zarlagiin utguudiig REPLACE ashiglaj uurchulj ugnu

            html = html.replace("%id%", item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", item.value);

            // Beltgesen HTML ee DOM ruu hiij ugnu.
            document.querySelector(list).insertAdjacentHTML("beforeend", html);

        }
    };
})();








// Sanhuutei ajillah controller *****************************************
var financeController = (function(){

    // Orlogiin baiguulagch funkts object(private buyu dald funkts)
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    // Zarlagiin baiguulagch funkts object(private buyu dald funkts)
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };


    // Private buyu dald data
    var data = {
        // Orlogo, zarlaga hadgalah
        items : {
            inc : [],
            exp : []
        },

        // Orlogiin niilber, zarlahiin niilber hadgalah
        totals: {     
            inc: 0,
            exp: 0
        }
    };


    return{
        addItem: function(type, desc, val){

            var item, id;

            if(data.items[type].length === 0 ) id = 1;
            else{
                id = data.items[type][data.items[type].length - 1].id + 1;   // Umnuh elementih ni id g avad 1iig nemsneer id g n olj bna.
            }
            


            if(type === "inc"){
                item = new Income(id, desc, val)
            }

            else{
                //type === exp
                item = new Expense(id, desc, val)
            }

            data.items[type].push(item);

            return item;
        }
    };
       
})();






// Programmin holbogch controller *****************************************
var appController = (function(uiController, financeController)
{

    var ctrlAddItem = function()
    {
        // 1. Oruulah ugugdliig delgetsees olj avna.
        var input = uiController.getInput();

        // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna. 
        var item = financeController.addItem(input.type, input.description, input.value);

        // 3. Olj avsan ugugdluudiig web deeree tohiroh hesegt n gargana.
        uiController.addListItem(item, input.type);

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







