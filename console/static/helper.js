
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
        if (str.substring(0, 4) == 'help' || str.substring(0, 4) == 'HELP') {
            help();
        } else if (str.substring(0,5)=='view ') {
            view(str.substring(5,str.length).trim());
        } else if (str.substring(0,5)=='clear') {
            clear();
        }else if (str.substring(0, 2) == 'ls' || str.substring(0, 2) == 'LS') {
            show_files();
        } else if(str.substring(0,3)=='cd ' || str.substring(0,3)=='CD '){
            change_dir(str.substring(3,str.length).trim());
        }else{
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
        console_ul.append('<li>'+address_str()+'&#062 ' + '<span id="box"></span>' +
                        '<span class="indicator">_</span></li>');
        box = $('#box');
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
