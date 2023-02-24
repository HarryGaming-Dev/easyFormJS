var easyFormActive = false;
var easyFormCustomDialogAnswerGiven = false;
var easyFormTextBoxSelected = false;

class easyFormJS{
    static create(title, description, fields, submitButtonText = "Absenden"){
        if (!easyFormActive){
            easyFormActive = true;
            let newForm = document.createElement('div');
            easyFormCustomDialogAnswerGiven = false;
            newForm.classList.add("dialog");
            newForm.id = "customDialog";
            document.getElementById("easyFormJSContent").style.transition = '.5s cubic-bezier(.65,0,.35,1)';
            document.getElementById("easyFormJSContent").style.opacity = '0.1';
            document.getElementById("easyFormJSContent").style.pointerEvents = 'none';
            newForm.style.position = "fixed";
            newForm.style.zIndex = "10";
            newForm.style.backdropFilter = "blur(10px)";
            newForm.style.marginLeft = "auto";
            newForm.style.marginRight = "auto";
            newForm.style.marginTop = "auto";
            newForm.style.width = "80%";
            newForm.style.textAlign = "center";
            newForm.style.boxShadow = "0px 0px 31px 5px rgba(0,0,0,0.3)";
            newForm.style.padding = "15px";
            newForm.style.borderRadius = "15px";
            newForm.style.transition = ".5s cubic-bezier(.65,0,.35,1)";
            newForm.style.scale = "0";
            newForm.style.opacity = "0";
            newForm.style.top = "35%";
            newForm.style.left = "8%";
            newForm.style.color = "white";
            newForm.style.background = "rgba(92, 92, 92, 0.83)";
            newForm.style.display = "grid";
            newForm.style.alignContent = "center";
            
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
                margin-top: 5vh;
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
                background: rgba(250,250,250,0.1);
                border: none; 
                padding: 15px; 
                height: 50px; 
                width: 50px; 
                scale: 0.7;
                color: white;
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
                color: white;
            }
            
            </style><h1 style="font-family: sans-serif; color: white;" id="easyFormJSTitle">${title}</h1><h3 style="font-family: sans-serif; color: white;" id="easyFormJSDescription">${description}</h3><div id="fields"></div><br><div id="easyFormJSSubmitBTN" class="easyFormJSSubmitBTN"><button onclick="easyFormCustomDialogAnswerGiven = true;">${submitButtonText}</button></div><button onclick="document.getElementById('easyFormJSContent').style.filter = ''; this.parentElement.style.opacity = 0; easyFormCustomDialogAnswerGiven = 'no'; setTimeout(() => {this.parentElement.remove();}, 2500);" class="easyFormJSCancelBTN" id="easyFormJSCancelBTN">X</button>`;
            
            document.body.appendChild(newForm);

            for (let field of fields){
                if (field["required"]){
                    if (field["autocomplete"]){
                        document.getElementById("fields").innerHTML += `<input type="${field["type"]}" placeholder="${field["placeholder"]}" name="${field["fieldName"]}" class="easyFormJSFields" required onchange="this.style.background = '#9898986b'; this.style.boxShadow = ''; this.style.border = 'none';" onclick="this.style.borderLeft='3px solid rgba(17, 84, 144, 0.9)'; easyFormTextBoxSelected = true;" onblur="this.style.borderLeft=''; easyFormTextBoxSelected = false;"><br>`;
                    } else {
                        document.getElementById("fields").innerHTML += `<input type="${field["type"]}" placeholder="${field["placeholder"]}" name="${field["fieldName"]}" class="easyFormJSFields" required onchange="this.style.background = '#9898986b'; this.style.boxShadow = ''; this.style.border = 'none';" onclick="this.style.borderLeft='3px solid rgba(17, 84, 144, 0.9)'; easyFormTextBoxSelected = true;" onblur="this.style.borderLeft=''; easyFormTextBoxSelected = false;" autocomplete="off"><br>`;
                    }
                } else {
                    if (field["autocomplete"]){
                        document.getElementById("fields").innerHTML += `<input type="${field["type"]}" placeholder="${field["placeholder"]}" name="${field["fieldName"]}" class="easyFormJSFields" onchange="this.style.background = '#9898986b'; this.style.boxShadow = ''; this.style.border = 'none';" onclick="this.style.borderLeft='3px solid rgba(17, 84, 144, 0.9)'; easyFormTextBoxSelected = true;" onblur="this.style.borderLeft=''; easyFormTextBoxSelected = false;"><br>`;
                    } else {
                        document.getElementById("fields").innerHTML += `<input type="${field["type"]}" placeholder="${field["placeholder"]}" name="${field["fieldName"]}" class="easyFormJSFields" onchange="this.style.background = '#9898986b'; this.style.boxShadow = ''; this.style.border = 'none';" onclick="this.style.borderLeft='3px solid rgba(17, 84, 144, 0.9)'; easyFormTextBoxSelected = true;" onblur="this.style.borderLeft=''; easyFormTextBoxSelected = false;" autocomplete="off"><br>`;
                    }
                }
            }
            setTimeout(() => {
                newForm.style.scale = "1";
                newForm.style.opacity = "1";
            }, 500);

            document.onkeydown = function(event) {
                if ((event.key == "Escape" || event.keyCode == 27) && easyFormTextBoxSelected === false){
                    easyFormCustomDialogAnswerGiven = 'no';
                    easyFormJS.finish();
                }
            };

            return new Promise(data => {
                let interval = setInterval(() => {
                    setTimeout(() => {
                        if (easyFormCustomDialogAnswerGiven === true){
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
                                easyFormCustomDialogAnswerGiven = false;
                            }
                            
                            if (!cancel){
                                newForm.style.width = "200px";
                                newForm.style.left = "50%";
                                newForm.style.marginLeft = "-115px";
                                newForm.style.height = "400px";
                                newForm.style.top = "50%";
                                newForm.style.marginTop = "-215px";
                                data({"data":exportAnswer});
                                this.wait();
                                clearInterval(interval);
                            }
                        } if (easyFormCustomDialogAnswerGiven === 'no'){
                            data({"data":null,"description":"process canceled by user"});
                            this.finish();
                            clearInterval(interval);
                        }
                    }, 1);
                }, 100);
            });
        }
    }

    static wait(){
        let submitBTN = document.getElementById("easyFormJSSubmitBTN");
        submitBTN.innerHTML = "<div id='easyFormJSLoader'></div><br><h2 id='easyFormJSLoaderInfo'></h2>"
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
    
    static success(text,duration){
        let FormJSLoader = document.getElementById("easyFormJSLoader");
        let easyFormJSLoaderInfo = document.getElementById("easyFormJSLoaderInfo");
        if (easyFormJSLoaderInfo != null){
            easyFormJSLoaderInfo.innerHTML = text;
        }
        if (FormJSLoader != null){
            FormJSLoader.style.background = "rgba(37, 130, 25, 1)";
        }
        setTimeout(() => {
            this.finish();
        }, duration*1000);
    }

    static fail(text,duration){
        let FormJSLoader = document.getElementById("easyFormJSLoader");
        let easyFormJSLoaderInfo = document.getElementById("easyFormJSLoaderInfo");
        if (easyFormJSLoaderInfo != null){
            easyFormJSLoaderInfo.innerHTML = text;
        }
        if (FormJSLoader != null){
            FormJSLoader.style.background = "rgba(130, 14, 14, 1)";
        }
        setTimeout(() => {
            this.finish();
        }, duration*1000);
    }
    
    static finish(){
        easyFormActive = false;
        document.getElementById("easyFormJSContent").style.opacity = '1';
        document.getElementById("easyFormJSContent").style.pointerEvents = '';
        setTimeout(() => {
            document.getElementById("easyFormJSContent").style.transition = '';
        }, 100);
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
