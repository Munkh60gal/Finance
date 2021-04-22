// Delgetstei ajillah controller *****************************************
var uiController = (function(){

    var DOMstrings = {   // Ashiglaj bui classuud
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel:  ".budget__expenses--percentage"
    };

    return {
        getInput : function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value) // Parseint gsner uniin dun string bainsiig too bolgoj bna
            };
        },
        
        getDOMstrings: function(){
            return DOMstrings;
        },

        // Utga oruulad ur dung avsnii daraa oroltiin talbariig tseverleh
        clearFields: function(){
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            // Convert List to Array
            var fieldsArr = Array.prototype.slice.call(fields);  //fields ni list uchir call funkts bhgu uchir ingj ajlulj bn

            fieldsArr.forEach(function(el, index, array){  // talbariig hooson bolgoj bna (foreachiin funkts n 3 argument avdag 1.element, 2index, 3.array g uurig n butsaana)
                el.value = "";
            });

            fieldsArr[0].focus();   // hamgiin ehnii talbar deer cursoriig avaachij bna 


            // for(var i = 0; i < fieldsArr.length; i++)
            // {
            //     fieldsArr[i].value= '';
            // }
        },


        tusuviigUzuuleh: function(tusuv){
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;

            if(tusuv.huvi !== 0)
            {
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + "%";
            }
            else{
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
            }
            

        },

        addListItem: function(item, type){
            // Orlogo zarlagiin elementiig aguulsan HTML iig beltgene.
            var html, list;
            
            if(type === 'inc'){
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else
            {
                list = DOMstrings.expenseList;
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

    var calculateTotal = function(type){    // orlogo ymu zarlagiin niilber
        var sum = 0;
        data.items[type].forEach(function(el){
            sum = sum + el.value;
        });
        data.totals[type] = sum;
    }

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
        },

        // Tusuv buyu orlogo zarlagiin ylgavar bolomjit tusuv
        tusuv: 0,

        // Huviig bodoh
        huvi: 0
    };


    return{
        tusuvTootsooloh: function(){

              // Niit orlogiin niilberiig toostoolno.
              calculateTotal("inc");

              // Niit zarlagii niilberiig toostoolno.
              calculateTotal("exp");

              // Tusuviig shineer tootsoolno
              data.tusuv = data.totals.inc - data.totals.exp;

              // Orlogo zarlagiin huviig tootsoolno.
              data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);


        },

        tusuviigAvah: function(){
            return{
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },

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
        },



        seeData: function(){
            return data;
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

        if(input.description !== "" && input.value !== "")   // Orlogo zarlagin mdelel hooson rouulj bologui bolgoj bna
        {
            // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna. 
            var item = financeController.addItem(input.type, input.description, input.value);

            // 3. Olj avsan ugugdluudiig web deeree tohiroh hesegt n gargana.
            uiController.addListItem(item, input.type);
            uiController.clearFields();  // Talbariig tseverleh

            // 4. Tusuviig tootsoolno.
            financeController.tusuvTootsooloh();

            // 5. Etssiin uldegdel
            var tusuv = financeController.tusuviigAvah();

            // 6. Tusuviin tootsoog delgetsend gargana.
            uiController.tusuviigUzuuleh(tusuv);
            


        }
        
        
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
            uiController.tusuviigUzuuleh({          // Program ehleh dung 00lej bna
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            }); 
            setupEventListeners();

        }
    }

})(uiController, financeController);

appController.init(); // Buh uil ajillagaag shineer ehluulj baina.







