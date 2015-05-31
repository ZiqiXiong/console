$(document).ready(function(){

    //thread

    var textarea = $('#ta');
    var box = $('#box');
    var address = ["ZQ's Website"];
    var console_ul = $('#console_ul');


    textarea.focus();
    textarea.bind("blur", function() {
       setTimeout(function() {
        textarea.focus();
      }, 0);
    });

    textarea.keyup(function(event) {
            if(event.keyCode==13){
                readline(textarea.val());
                newline();
            }
            box.text(textarea.val());
        }
    )

    setInterval(function(){
        var indicator = $('.indicator')
        if (indicator.is(":visible")){
            indicator.hide();
        }else{
            indicator.show();
        }
    },500)

    connect();





    //actions
    function connect(){
        $.ajax({
            url:'connect/',
            success: function(data){
                console_ul.prepend('<li><i>'+data.text+'</i></li>');
            },
            error: function(){
                console_ul.prepend('<li><i>Error occurred. Contact ZQ at ziqi.xiong@pomona.edu</i></li>');
            }
        })
    }

    function help(){
        var texts = ["ls - list files and directories"," cd - change directories",
                    'clear - clear the command prompt','cat - view text files']
        for (i in texts) {
            console_ul.append('<li><i>' + texts[i] + '</i></li>')
        }
    }

    //helper functions
    function readline(str){
        if (str.substring(0,4)=='help'){
            help();
        }
    }

    function address_str(){
        str = '';
        for (i in address){
            str += address[i];
        }
        return str;
    }

    function newline(){
        $('.indicator').remove();
        textarea.val('');
        box.removeAttr('id');
        console_ul.append('<li>'+address_str()+'/&#062 ' +
                        '<span id="box"></span>' +
                        '<span class="indicator">_</span></li>');

        box = $('#box');
        return;
    }
})
