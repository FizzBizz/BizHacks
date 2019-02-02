var entries = JSON.parse(entrystr).entries;
var tags = JSON.parse(tagstr).tags;

// Returns html string for table entries from list of entries
function htmlFromEntries(entries){
    var htmlout = '';
    for (var i = 0; i<entries.length; i++){
        htmlout += '<tr>';
        htmlout += '<td>'+entries[i].name+'</td>';
        htmlout += '<td>'+entries[i].position+'</td>';
        htmlout += '<td>'+entries[i].department+'</td>';
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
            if (compareString(entries[i].position,tags[j])){
                tagcount++;
            }
            if (compareString(entries[i].department,tags[j])){
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