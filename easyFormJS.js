class easyFormJS{
    static {
        this.active = false;
        this.customDialogAnswerGiven = false;
        this.textBoxSelected = false;
    }

    static create(title, description, fields, submitButtonText = "Absenden"){
        if (!this.active){
            this.active = true;
            let newForm = document.createElement('div');
            this.customDialogAnswerGiven = false;
            newForm.classList.add("dialog");
            newForm.id = "customDialog";
            document.getElementById("easyFormJSContent").style.filter = "blur(5px)";
            document.getElementById("easyFormJSContent").style.pointerEvents = "none";
            newForm.style.filter = "blur(0px)";
            newForm.style.marginLeft = "auto";
            newForm.style.marginRight = "auto";
            newForm.style.marginTop = "auto";
            newForm.style.width = "80%";
            newForm.style.textAlign = "center";
            newForm.style.boxShadow = "0px 0px 31px 5px rgba(0,0,0,0.3)";
            newForm.style.padding = "15px";
            newForm.style.borderRadius = "15px";
            newForm.style.transition = ".5s cubic-bezier(.65,0,.35,1)";
            newForm.style.transform = "translateX(69vh) translateY(15vh)";
            newForm.style.position = "sticky";
            newForm.style.top = "50%";
            newForm.style.transform = "translateY(15vh)";
            newForm.style.scale = "0";
            newForm.style.opacity = "0";

            
            newForm.innerHTML = `
            <style>
            @keyframes sendFeedback {
                0% {scale: 1; opacity: 1;}
                85% {scale: 10; opacity: 0;}
                100% {scale: 1; opacity: 0;}
            }
            
            #easyFormJSLoader{
                animation: sendFeedback;
                animation-duration: 1.5s;
                transition: .5s cubic-bezier(.65,0,.35,1);
                animation-iteration-count: infinite;
                scale: 1;
                opacity: 1;
                width: 10px;
                height: 10px;
                background: gray;
                border-radius: 10px;
                margin: auto;
                margin-left: auto;
                margin-right: auto;
                margin-top: 20px;
                margin-bottom: 35px;
            }

            .easyFormJSSubmitBTN button{
                margin: 10px; 
                cursor: pointer; 
                background: rgba(6, 53, 95, 0.9); 
                width: 60%; 
                height: 45px; 
                border: medium none; 
                border-radius: 15px; 
                color: white;
            }

            .easyFormJSSubmitBTN button:active{
                background: rgba(8, 72, 128, 0.9);
            }

            .easyFormJSCancelBTN{
                position: absolute; 
                right: 1vh; 
                top: 1vh; 
                border-radius: 160px; 
                border: none; 
                padding: 15px; 
                height: 50px; 
                width: 50px; 
                scale: 0.7;
                cursor: pointer;
            }

            .easyFormJSFields{
                width: 90%; 
                height: 50px; 
                border-radius: 8px; 
                background: #9898986b; 
                border: none; 
                color: #352f2f; 
                outline: none; 
                margin-bottom: 15px;
                padding-left: 15px;
                transition: 0.1s cubic-bezier(.65,0,.35,1);
            }
            
            </style><h1 style="font-family: sans-serif; color: black;" id="easyFormJSTitle">${title}</h1><h3 style="font-family: sans-serif; color: black;" id="easyFormJSDescription">${description}</h3><div id="fields"></div><br><div id="easyFormJSSubmitBTN" class="easyFormJSSubmitBTN"><button onclick="easyFormJS.customDialogAnswerGiven = true;">${submitButtonText}</button></div><button onclick="document.getElementById('easyFormJSContent').style.filter = ''; this.parentElement.style.opacity = 0; easyFormJS.customDialogAnswerGiven = 'no'; setTimeout(() => {this.parentElement.remove();}, 2500);" class="easyFormJSCancelBTN" id="easyFormJSCancelBTN">X</button>`;
            
            document.body.appendChild(newForm);

            for (let field of fields){
                if (field["required"]){
                    if (field["autocomplete"]){
                        document.getElementById("fields").innerHTML += `<input type="${field["type"]}" placeholder="${field["placeholder"]}" name="${field["fieldName"]}" class="easyFormJSFields" required onchange="this.style.background = '#9898986b'; this.style.boxShadow = ''; this.style.border = 'none';" onclick="this.style.borderLeft='3px solid rgba(17, 84, 144, 0.9)'; easyFormJS.textBoxSelected = true;" onblur="this.style.borderLeft=''; easyFormJS.textBoxSelected = false;"><br>`;
                    } else {
                        document.getElementById("fields").innerHTML += `<input type="${field["type"]}" placeholder="${field["placeholder"]}" name="${field["fieldName"]}" class="easyFormJSFields" required onchange="this.style.background = '#9898986b'; this.style.boxShadow = ''; this.style.border = 'none';" onclick="this.style.borderLeft='3px solid rgba(17, 84, 144, 0.9)'; easyFormJS.textBoxSelected = true;" onblur="this.style.borderLeft=''; easyFormJS.textBoxSelected = false;" autocomplete="off"><br>`;
                    }
                } else {
                    if (field["autocomplete"]){
                        document.getElementById("fields").innerHTML += `<input type="${field["type"]}" placeholder="${field["placeholder"]}" name="${field["fieldName"]}" class="easyFormJSFields" onchange="this.style.background = '#9898986b'; this.style.boxShadow = ''; this.style.border = 'none';" onclick="this.style.borderLeft='3px solid rgba(17, 84, 144, 0.9)'; easyFormJS.textBoxSelected = true;" onblur="this.style.borderLeft=''; easyFormJS.textBoxSelected = false;"><br>`;
                    } else {
                        document.getElementById("fields").innerHTML += `<input type="${field["type"]}" placeholder="${field["placeholder"]}" name="${field["fieldName"]}" class="easyFormJSFields" onchange="this.style.background = '#9898986b'; this.style.boxShadow = ''; this.style.border = 'none';" onclick="this.style.borderLeft='3px solid rgba(17, 84, 144, 0.9)'; easyFormJS.textBoxSelected = true;" onblur="this.style.borderLeft=''; easyFormJS.textBoxSelected = false;" autocomplete="off"><br>`;
                    }
                }
            }
            setTimeout(() => {
                newForm.style.scale = "1";
                newForm.style.opacity = "1";
            }, 500);

            document.onkeydown = function(event) {
                if ((event.key == "Escape" || event.keyCode == 27) && easyFormJS.textBoxSelected === false){
                    easyFormJS.customDialogAnswerGiven = 'no';
                    easyFormJS.finish();
                }
            };

            return new Promise(data => {
                let interval = setInterval(() => {
                    setTimeout(() => {
                        if (easyFormJS.customDialogAnswerGiven === true){
                            let exportAnswer = [];
                            let cancel = false;
                            for (let field of document.getElementsByClassName("easyFormJSFields")){
                                let answer = {};
                                answer[field.localName] = {"type":"", "value":"", "placeholder":"", "required":false, "autocomplete":false};
                                answer[field.localName]["type"] = field.type;
                                answer[field.localName]["value"] = field.value;
                                answer[field.localName]["placeholder"] = field.placeholder;
                                answer[field.localName]["required"] = field.required;
                                answer[field.localName]["autocomplete"] = field.autocomplete;
                                if (field.required && field.value == ""){
                                    field.style.boxShadow = "0px 0px 10px 1px rgba(213, 18, 18, 0.6)";
                                    cancel = true;
                                }
                                exportAnswer.push(answer);
                            }

                            if (cancel){
                                easyFormJS.customDialogAnswerGiven = false;
                            }
                            
                            if (!cancel){
                                newForm.style.width = "90px";
                                data({"data":exportAnswer});
                                this.wait();
                                clearInterval(interval);
                            }
                        } if (easyFormJS.customDialogAnswerGiven === 'no'){
                            data({"data":null,"description":"process canceled by user"});
                            this.finish();
                            clearInterval(interval);
                        }
                    }, 1);
                }, 100);
            });
        }
    }
    
    static success(){
        let FormJSLoader = document.getElementById("easyFormJSLoader");
        if (FormJSLoader != null){
            FormJSLoader.style.background = "rgba(37, 130, 25, 1)";
        }
        setTimeout(() => {
            this.finish();
        }, 5000);
    }

    static fail(){
        let FormJSLoader = document.getElementById("easyFormJSLoader");
        if (FormJSLoader != null){
            FormJSLoader.style.background = "rgba(130, 14, 14, 1)";
        }
        setTimeout(() => {
            this.finish();
        }, 5000);
    }

    static wait(){
        let submitBTN = document.getElementById("easyFormJSSubmitBTN");
        submitBTN.innerHTML = "<div id='easyFormJSLoader'></div>"
        submitBTN.style.background = "transparent";
        if (document.getElementById("fields") != null){
            document.getElementById("fields").remove();
        }
        if (document.getElementById("easyFormJSCancelBTN") != null){
            document.getElementById("easyFormJSCancelBTN").remove();
        }
        if (document.getElementById("easyFormJSTitle") != null){
            document.getElementById("easyFormJSTitle").remove();
        }
        if (document.getElementById("easyFormJSDescription") != null){
            document.getElementById("easyFormJSDescription").remove();
        }
    }
    
    static finish(){
        this.active = false;
        document.getElementById('easyFormJSContent').style.filter = '';
        document.getElementById("easyFormJSContent").style.pointerEvents = '';
        let newForm = document.getElementById("customDialog");
        if (newForm != null){
            newForm.style.opacity = '0';
            newForm.style.scale = "0";
            setTimeout(() => {
                newForm.remove();
            }, 500);
        }
    }
}