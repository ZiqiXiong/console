$(document).ready(function(){

    //thread

    var textarea = $('#ta');
    var box = $('#box');
    var address = ["ZQ's Website"];
    var console_ul = $('#console_ul');
    var folders=[];
    var files = [];

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

    textarea.keydown(function(e) {
        if(e.keyCode === 9) {
            e.preventDefault();
            var remnant = textarea.val().split(' ')[textarea.val().split(' ').length-1];
            var suggestion = search_in_folder(remnant);
            if(suggestion) {
                textarea.val(textarea.val().substring(0,textarea.val().length - remnant.length))
                textarea.val(textarea.val() + suggestion);
                var e = jQuery.Event("keyup");
                e.keyCode = 16;
                textarea.trigger(e);
            }
        }
    });

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
            console_ul.append('<span class="pink"><i>' + folders[i].name + '</i></span>&nbsp&nbsp');
        }
        for (i in files){
            console_ul.append('<span class="gold"><i>' + files[i].title + '</i></span>&nbsp&nbsp');
        }
        console_ul.append('</li>');
        newline();
    }

    function change_dir(destination){
        if (folder_content_str().indexOf(destination)!=-1 || destination=='..'){
            if (destination == '..')
                address.pop();
            else
                address.push(destination);
            $.ajax({
                url:'change_dir/',
                data:{destination:address[address.length-1]},
                success:function(data){
                    folders = data.new_folders;
                    files = data.new_files;
                    newline();
                },
                error:function(){
                    console_ul.append('<li><i>Error occurred. Contact ZQ at ziqi.xiong@pomona.edu</i></li>');
                    address.pop();
                    newline();
                }
            })
        }else{
            console_ul.append('<li><i>"'+destination+'" is not in this folder.</i></li>');
            newline();

        }
    }

    function clear(destination){
        console_ul.html('');
        newline();
    }

    function connect(){
        $.ajax({
            url:'connect/',
            success: function(data){
                console_ul.prepend('<li><i>'+data.text+'</i></li>');
                folders = data.new_folders;
                files = data.new_files;
            },
            error: function(){
                console_ul.prepend('<li><i>Error occurred. Contact ZQ at ziqi.xiong@pomona.edu</i></li>');
            }
        })
    }

    function help(){
        var texts = ["ls - list files and directories under this folder"," cd - change folder",
                    'clear - clear everything on the screen','&#060tab&#062 - auto-complete commands']
        for (i in texts) {
            console_ul.append('<li><i>' + texts[i] + '</i></li>')
        }
         newline();
    }

    //helper functions

    function search_in_folder(str){
        var have_found_one = false;
        var candidate = null;
        for (i in folders){
            if (folders[i].name.indexOf(str)==0){
                if (have_found_one){
                    return null;
                }else{
                    candidate = folders[i];
                    have_found_one = true;
                }
            }
        }
        for (i in files){
            if (files[i].title.indexOf(str)==0){
                if (have_found_one){
                    return null;
                }else{
                    candidate = files[i];
                    have_found_one = true;
                }
            }
        }
        if (candidate.name)
            return candidate.name;
        else
            return candidate.title;
    }

    function readline(str) {
        if (str.substring(0, 4) == 'help' || str.substring(0, 4) == 'HELP') {
            help();
        } else if (str.substring(0,5)=='clear') {
            clear();
        }else if (str.substring(0, 2) == 'ls' || str.substring(0, 2) == 'LS') {
            show_files();
        } else if(str.substring(0,3)=='cd ' || str.substring(0,2)=='CD '){
            var destination = str.substring(3,str.length).trim();
            change_dir(destination);
        }else{
            console_ul.append('<li><i>"'+str+'" is not recognized as a legal command.</i></li>');
            newline();
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
        } return str;
    }

    function folder_content_str(){
        str=[];
        for (i in folders){
            str.push(folders[i].name);
        } for(i in files){
            str.push(files[i],title);
        } return str;
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
