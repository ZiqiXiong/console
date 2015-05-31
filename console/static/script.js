$(document).ready(function(){

    //thread

    var textarea = $('#ta');
    var box = $('#box');
    var address = ["ZQ's Website"];
    var console_ul = $('#console_ul');
    var folders = ['Articles','Portfolio','Pictures','About_Me']


    textarea.focus();
    textarea.bind("blur", function() {
       setTimeout(function() {
        textarea.focus();
      }, 0);
    });

    textarea.keyup(function(event) {
            if(event.keyCode==13){
                readline(textarea.val());
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

    function show_files(){
        console_ul.append('<li>');
            for (i in folders) {
                console_ul.append('<i>' + folders[i] + '</i>&nbsp&nbsp');
            }
        console_ul.append('</li>');
        newline();
    }


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
         newline();
    }

    //helper functions
    function readline(str){
        if (str.substring(0,4)=='help'){
            help();
        }else if(str.substring(0,2)=='ls'){
            show_files();
        }
    }

    function address_str(){
        str = '';
        for (i in address){
            if(i==0)
                str += '<span class="green">' + address[i] + '</span>' + '/';
            else if(i==1)
                str += '<span class="red">' + address[i] + '</span>' + '/';
            else if(i==2)
                str += '<span class="blue">' + address[i] + '</span>' + '/';
            else
                str += '<span class="yellow">' + address[i] + '</span>' + '/';
        }
        return str;
    }

    function newline(){
        $('.indicator').remove();
        textarea.val('');
        box.removeAttr('id');
        console_ul.append('<li>'+address_str()+'&#062 ' +
                        '<span id="box"></span>' +
                        '<span class="indicator">_</span></li>');

        box = $('#box');
        return;
    }
})
