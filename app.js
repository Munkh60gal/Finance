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
        percentageLabel:  ".budget__expenses--percentage",
        containerDiv: ".container",
        expensePercentageLabel: ".item__percentage",
        dateLabel : ".budget__title--month"
    };

    var nodeListForeach = function(list, callback){
        for (var i=0; i < list.length; i++)
        {
            callback(list[i], i);
        }
    };

    var formatMoney = function(too, type){

        too = "" + too;  //temdegt mur bolgoj bna

         /*/splitiig ashiglan tsipriig 1 1eer n salgan massive bolgood reverse ashiglan araas n bairluulaad join ashiglan salgasnigaa butsaan niiluulj baina.*/
        var x = too.split("").reverse().join("");  
        var y = '';
        var count = 1;

        for(var i=0; i < x.length; i++)
        {
            y = y + x[i];
            if( count%3 === 0 ) y = y + ',';   // 3 ornoor n salgan , tavij bn
            count ++;
        }

        var z = y.split("").reverse().join("");

        if(z[0] === ',') z = z.substr(1, z.length - 1);  // ehnii index , bval tuuniig boliulj bna


        if(type === 'inc') z = "+ " + z;
        else z = "- " + z;

        return z;
    }

    return {
        displayDate: function(){
            var unuudur = new Date();
            document.querySelector(DOMstrings.dateLabel).textContent = unuudur.getFullYear() +" оны " + (unuudur.getMonth() +1)+" сарын"
        },

        // + bval nogoon, - bval ulaan ungutei bolgono
        changeType: function(){
            var fields = document.querySelectorAll(DOMstrings.inputType + "," + DOMstrings.inputDescription + "," + DOMstrings.inputValue);

            nodeListForeach(fields, function(el){
                el.classList.toggle("red-focus");
            });

            document.querySelector(DOMstrings.addBtn).classList.toggle("red");
        },

        getInput : function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value) // Parseint gsner uniin dun string bainsiig too bolgoj bna
            };
        },

        displayPercentages : function(allPercentages){
            // Zarlagiin NodeListiig oloh (DOM iin 1 elementiig node gj nerlene)
            var elements = document.querySelectorAll(DOMstrings.expensePercentageLabel);

            // Element bolgonii huvid zarlagiin huviig massive aas avj shivj oruulah
            nodeListForeach(elements, function(el, index){
                el.textContent = allPercentages[index]+"%";
            });
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
            var type;
            if(tusuv.tusuv > 0) type = "inc";
            else type = "exp";
            document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(tusuv.tusuv, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(tusuv.totalInc, "inc");
            document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(tusuv.totalExp, "exp");

            if(tusuv.huvi !== 0)
            {
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + "%";
            }
            else{
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
            }
            

        },

        deleteListItem : function(id){
            var el = document.getElementById(id);  // orulsan orlogo zarlagig ustgah
            el.parentNode.removeChild(el);
        },

        addListItem: function(item, type){
            // Orlogo zarlagiin elementiig aguulsan HTML iig beltgene.
            var html, list;
            
            if(type === 'inc'){
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else
            {
                list = DOMstrings.expenseList;
                html = ' <div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Ter HTML dotroo orlogo zarlagiin utguudiig REPLACE ashiglaj uurchulj ugnu

            html = html.replace("%id%", item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", formatMoney(item.value, type));

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
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }
        else{
            this.percentage = 0;
        }  
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

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
              if(data.totals.inc > 0){                  // Herev orlogo 0ees bval huviig bodno
                data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
              }
              else{              // Herev 0 baival huvi n 0
                  data.huvi = 0; 
              }
        },

        calculatePercentages: function(){          // Niit orlogiin heden huvi gdgig tootsoolno
            data.items.exp.forEach(function(el){
                el.calcPercentage(data.totals.inc);      //data.totals.inc buyu totalIncome
            });
        },

        getPercentages: function(){
            var allPercentages = data.items.exp.map(function(el){
                return el.getPercentage();
            });

            return allPercentages;
        },

        tusuviigAvah: function(){
            return{
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },

        deleteItem: function(type, id){
            var ids = data.items[type].map(function(el){     // map ni neg massive iin ugugdludig davtalt hiin uur massive ru shiljulj ugdug
                return el.id;
            });

            var index = ids.indexOf(id);

            if(index !== -1){                     // baihgui zuilig ustgah gvl index ni -1 bolj automatar hmgin suulin element ustdag uchir uunees zailshiij bna.
                data.items[type].splice(index, 1);  
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

        if(input.description !== "" && input.value > 0)   // Orlogo zarlagin mdelel hooson oruulj bologui bolgoj bna
        {
            // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna. 
            var item = financeController.addItem(input.type, input.description, input.value);

            // 3. Olj avsan ugugdluudiig web deeree tohiroh hesegt n gargana.
            uiController.addListItem(item, input.type);
            uiController.clearFields();  // Talbariig tseverleh

            // Tusuviig shineer tootsoolood delgtestend uzuulne.
            updateTusuv();

        }
        
        
    };

    var updateTusuv = function(){
        // 1. Tusuviig tootsoolno.
        financeController.tusuvTootsooloh();

        // 2. Etssiin uldegdel
        var tusuv = financeController.tusuviigAvah();

        // 3. Tusuviin tootsoog delgetsend gargana.
        uiController.tusuviigUzuuleh(tusuv);

        // 4. Elementuudiin huviig tootsoolno.
        financeController.calculatePercentages();
        
        // 5. Elementuudiin tootsoolson huviig huleej avna.
        var allPercentages = financeController.getPercentages();

        // 6. Edgeer huviig delgetsend gargana. 
        uiController.displayPercentages(allPercentages);
    }


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

        document.querySelector(DOM.inputType).addEventListener("change", uiController.changeType);

        document.querySelector(DOM.containerDiv).addEventListener("click", function(event){
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id; // target ni event bolohod daragdaj bui element

            if(id){     // id tai bval doorh code ajillana
                var arr = id.split("-");     // inc-2 geh met bgag - aar n salgaj bna       
                var type = arr[0];           // inc or exp buyu orlogo zarlagin type jishelbel inc-2iin inc gsn ug
                var itemId = parseInt(arr[1]);         // id jishelbel inc-2 iin 2 gsn ug

                // console.log(type + ": " + itemId );

                // 1. Sanhuugiin module aas type, id ashiglaad ustgana.
                financeController.deleteItem(type, itemId);

                // 2. Delgets deerees ene elementiig ustgana.
                uiController.deleteListItem(id);

                // 3. Uldegdel tootsoog shinechilj haruulna. Tusuviig shineer tootsoolood delgtestend uzuulne. 
                updateTusuv();
                
            }

            
            
        });
    }

    return{
        init: function(){
            console.log("Application started ... ");
            uiController.displayDate();
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







