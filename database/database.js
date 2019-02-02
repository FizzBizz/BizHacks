var entries = JSON.parse(entrystr).entries;
var tags = JSON.parse(tagstr).tags;

// Returns html string for table entries from list of entries
function htmlFromEntries(entries){
    var htmlout = '';
    for (var i = 0; i<entries.length; i++){
        htmlout += '<tr>';
        htmlout += `<td><a href="`+ entries[i].id +`.html">`+entries[i].name+'</a></td>';
        htmlout += '<td>'+entries[i].position+'</td>';
        htmlout += '<td>'+entries[i].department+'</td>';
        htmlout += '<td>';
        var mento = '';
        if (entries[i].mentor.length != 0){
            for (var j = 0; j< entries[i].mentor.length; j++){
                mento += entries[i].mentor[j];
                mento += ', ';
            }
            htmlout += mento.substring(0,mento.length-2);
        } else {
            htmlout += "N/A";
        }
        htmlout += '</td>';
        htmlout += '</tr>';
    }
    return htmlout;
}

// Returns a single entry from id number
function entryFromId(entries,idval){
    for (var i = 0; i<entries.length; i++){
        if (entries[i].id == idval){
        return entries[i];
        }
    }
}
// Returns a list of entries from a list of tags
function filterSkill(entries,tags){
    var filtered = [];
    var tagcount = 0;
    for (var i = 0; i<entries.length; i++){
        tagcount = 0;
        for (var j = 0; j<tags.length; j++){
            for (var k = 0; k<entries[i].skills.length; k++){
                if (compareString(entries[i].skills[k],tags[j])){
                    tagcount++;
                }
            }
            for (var k = 0; k<entries[i].interests.length; k++){
                if (compareString(entries[i].interests[k],tags[j])){
                    tagcount++;
                }
            }
            for (var k = 0; k<entries[i].project.length; k++){
                if (compareString(entries[i].project[k],tags[j])){
                    tagcount++;
                }
            }
            if (compareString(entries[i].position,tags[j])){
                tagcount++;
            }
            if (compareString(entries[i].department,tags[j])){
                tagcount++;
            }
            if (compareString(entries[i].name,tags[j])){
                tagcount++;
            }
        }
        if (tagcount == tags.length){
        filtered.push(entries[i]);
        }
    }
    return filtered;
}

// Compares two strings (case insensitive)
function compareString(string1,string2){
    return (string1.toUpperCase() == string2.toUpperCase());
}

// Generate html buttons from list of tags
function htmlFromTags(tags){
    var htmlout = '';
    for (var i = 0; i<tags.length; i++){
        htmlout += `<a href="#" onclick= "currenttags=removeTag(currenttags,`;
        htmlout += i;
        htmlout += `); updateTags(currenttags);" class="btn btn-primary btn-icon-split">
         <span class="icon text-white-50">
         <i class="fas fa-flag"></i>
         </span>
         <span class="text">`;
         htmlout += tags[i];
         htmlout += "</span></a><hspace>&nbsp;&nbsp;";
    }
    return htmlout;
}

// Removes a tag from a list of tags
function removeTag(tags,ind){
    tags.splice(ind,1);
    return tags;
}

// Generate list of tags for autocomplete
function listTags(tags){
    var liststr = "";
    for (var i = 0; i< tags.skills.length;i++){
        liststr += tags.skills[i] + ",";
    }
    for (var i = 0; i< tags.departments.length;i++){
        liststr += tags.departments[i] + ",";
    }
    for (var i = 0; i< tags.positions.length;i++){
        liststr += tags.positions[i] + ",";
    }
    for (var i = 0; i< tags.names.length;i++){
        liststr += tags.names[i] + ",";
    }
    for (var i = 0; i< tags.projects.length;i++){
        liststr += tags.projects[i] + ",";
    }
    return liststr;
}

// Generate skills buttons
function htmlSkills(skills,mentor){
    var htmlout = '';
    for (var i = 0; i<skills.length; i++){
        htmlout+= `<a href="#" class="btn btn-skills"`;
        if (!mentor.includes(skills[i])){
            htmlout+=` style="background-color:#0092df"`;
        }
        htmlout+= `>
                    <!-- <i class="fab fa-java"></i> -->
                    <span class="btn-text">`+skills[i]+`</span> </a>&nbsp;`
    }
    return htmlout;
}