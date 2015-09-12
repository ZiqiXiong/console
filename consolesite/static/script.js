$(document).ready(function(){

    //thread

    var textarea = $('#ta');
    var box = $('#box');
    var address = ["ZQ's Website"];
    var console_ul = $('#console_ul');
    var current_line = -1;
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
                event.preventDefault();
                readline(textarea.val());
            } box.text(textarea.val());
        }
    )

    textarea.keydown(function(e) {
        if(e.keyCode==37 || e.keyCode==39){
            e.preventDefault();
        } else if(e.keyCode==38){
            e.preventDefault();
            line_move(-1);
        } else if(e.keyCode==40){
            e.preventDefault();
            line_move(1);
        }else if(e.keyCode === 9) {
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
    newline();

    //actions

    function line_move(step){
        if( (step<0 && current_line<1)||
            (step>1 && current_line > $('.input_line').length-1)){
            return
        }else{
            current_line = current_line + step;
            var content = $($('.input_line')[current_line]).children().filter('.input_content');
            textarea.val($(content).text())
            box.text($(content).text());
        }
    }

    function show_files(){
        console_ul.append('<li>');
        for (i in folders) {
            console_ul.append('<span class="blue"><i>' + folders[i].name + '</i></span>&nbsp&nbsp');
        }
        for (i in files){
            console_ul.append('<a href="javascript:void(0)" class="file_link"' +
                                'title="'+files[i].title+'"><span class="gold"><i>' +
                                files[i].title + "</i>"+files[i].icon+"</span></a>&nbsp&nbsp");
        }
        $('.file_link').click(function(){
            box.text('view '+$(this).attr('title'))
             view($(this).attr('title'));
        })
        console_ul.append('</li>');
        newline();
    }

    function change_dir(destination){
        if (findFolder(destination) || destination=='..' || destination=='/'){
            if (destination == '..') {
                if (address.length == 1) {
                    newline();
                    return;
                }
                address.pop();
            } else if(destination =='/'){
              address = [address[0]];
            } else {address.push(destination);}
            $.ajax({
                url:'change_dir/',
                data:{destination:address[address.length-1]},
                success:function(data){
                    folders = data.new_folders;
                    files = data.new_files;
                    console.log(files);
                    newline();
                }, error:function(){
                    system_remind('Error occurred. Contact ZQ at ziqi.xiong@pomona.edu');
                    address.pop();
                    newline();
                }
            })
        }else{
            system_remind('"'+destination+'" is not a directory or not in this directory.');
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
            }, error: function(){
                system_remind('Error occurred. Contact ZQ at ziqi.xiong@pomona.edu');
            }
        })
    }

    function help(){
        var texts = ["ls - list files and directories under this folder",
                    "cd &#060directory name&#062- change folder",
                    'clear - clear everything on the screen',
                    'view &#060file name&#062 - view articles and images',
                    '&#060tab&#062 - auto-complete commands',
                    '&#060up/down&#062 - scroll through the previous commands executed']
        for (i in texts) {
            system_remind(texts[i])
        }
         newline();
    }

    function view(name){
        var file = findFile(name);
        if (file){
            $.ajax({
                url: file.url,
                success: function(html){
                    console_ul.append('<li>'+html+'</li>');
                    newline();
                }, error: function(){
                    system_remind('Error occurred. Contact ZQ at ziqi.xiong@pomona.edu');
                }
            })
        } else{
            system_remind('"'+name+'" cannot be found in this directory.');
            newline();
        }
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
        }for (i in files){
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
        str = str.trim();
        if (str.substring(0, 4).toLowerCase() == 'help') {
            help();
        } else if (str.substring(0,5).toLowerCase()=='view ') {
            view(str.substring(5,str.length).trim());
        } else if (str.substring(0,5).toLowerCase()=='clear') {
            clear();
        }else if (str.substring(0, 2).toLowerCase() == 'ls') {
            show_files();
        } else if(str.substring(0,3).toLowerCase()=='cd '){
            change_dir(str.substring(3,str.length).trim());
        } else{
            system_remind('"'+str+'" is not recognized as a legal command.');
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

    function findFolder(str){
        for(i in folders){
            if (folders[i].name == str){
                return folders[i];
            }
        } return null;
    }

    function newline(){
        $('.indicator').remove();
        textarea.val('');
        box.removeAttr('id');
        console_ul.append('<li class="input_line">'+address_str()+'&#062 ' + '<span class="input_content" id="box">' +
                        '</span><span class="indicator">_</span></li>');
        box = $('#box');
        current_line = $('.input_line').length - 1;
    }

    function findFile(str){
        for(i in files){
            if (files[i].title == str){
                return files[i];
            }
        } return null;
    }

    function system_remind(str){
        console_ul.append('<li><i>'+str+'</i></li>')
    }
})
