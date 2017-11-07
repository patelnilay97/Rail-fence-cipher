function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function encrypt(){
    document.getElementById("encryptBtn").disabled = true;
    document.getElementById("decryptBtn").disabled = true;
    var plaintext = document.getElementById("plaintext").value;
    document.getElementById("ciphertext").value = '';
    var key = document.getElementById("key").value;
    plaintext = plaintext.replace(/ /g,'');
    var n = plaintext.length;
    var i,j,k,c,nr,f,nc;
    nr = 2*key - 1;
    nc = 2*n - 1;
    deleteTable();
    createTable(2*n-1);
    document.getElementById("info").innerHTML = "Plaintext is: "+plaintext;
    for(i = 1,j = 0;j<n;i++,j++){
        if(i>1){
            document.getElementById(1 + '$' + i).style.color = '#ccc';
            document.getElementById(1 + '$' + i).innerHTML = '&#10137';
            i++;
        }
        document.getElementById(1 + '$' + i).style.color = '#000';
        document.getElementById(1 + '$' + i).innerHTML = plaintext[j];
        await sleep(100);
    }
    await sleep(500);
    document.getElementById("info").innerHTML = "Plaintext is written downwards and diagonally on successive rails of an imaginary fence of size: "+key;
    for(i = 1,c = 1,f = 1;i<=2*n-1;i+=2){
        j = 1;
        if(i>1)
            document.getElementById(1 + '$' + (i-1)).innerHTML = '';
        while(j<=c){
            if(i>1 && j<c){
                document.getElementById((j+1) + '$' + i).innerHTML = document.getElementById(j + '$' + i).innerHTML;
                document.getElementById(j + '$' + i).innerHTML = '';
            }
            if(i>1 && j==c){
                if(f == 0){
                    document.getElementById((j-1) + '$' + (i-1)).style.color = '#ccc';
                    document.getElementById((j-1) + '$' + (i-1)).innerHTML = '&#10136';
                }
                else{
                    document.getElementById((j+1) + '$' + (i-1)).style.color = '#ccc';
                    document.getElementById((j+1) + '$' + (i-1)).innerHTML = '&#10138';
                }
            }
            await sleep(100);
            j++;
        }
        if(c <= nr - 2 && f == 0)
            c += 2;
        else if(c==nr && f == 0){
            c -= 2;
            f = 1;
        }
        else if(c>=3 && f == 1)
            c -= 2;
        else if(c==1 && f == 1){
            c += 2;
            f = 0;
        }
    }
    await sleep(2000);
    document.getElementById("info").innerHTML = "Ciphertext is created reading the pattern row by row";
    for(i = 1;i <= 2*n-1;i++){
        for(j = 2;j <= nr;j+=2)
            document.getElementById(j + '$' + i).innerHTML = '';
    }
    await sleep(1000);
    for(i = 3,j = 1,k = 3;i <= 2*n-1;i+=2){
        while(document.getElementById(j + '$' + k).innerHTML == ''){
            if(k <= nc-2)
                k += 2;
            else if(k == nc){
                j += 2;
                k = j;
            }
        }
        document.getElementById(1 + '$' + (i-1)).innerHTML = '&#10137';
        await sleep(200);
        document.getElementById(1 + '$' + i).innerHTML = document.getElementById(j + '$' + k).innerHTML;
        document.getElementById(j + '$' + k).innerHTML = '';
        await sleep(200);
    }
    var str = '';
    for(i = 1;i<=nc;i+=2){
        str += document.getElementById(1 + '$' + i).innerHTML;
    }
    document.getElementById("ciphertext").value = str;
    document.getElementById("encryptBtn").disabled = false;
    document.getElementById("decryptBtn").disabled = false;
}

async function decrypt(){
    document.getElementById("encryptBtn").disabled = true;
    document.getElementById("decryptBtn").disabled = true;
    var ciphertext = document.getElementById("ciphertext").value;
    document.getElementById("plaintext").value = '';
    var key = document.getElementById("key").value;
    ciphertext = ciphertext.replace(/ /g,'');
    var n = ciphertext.length;
    var i,j,k,c1,c2,c,nr,f,nc;
    nr = 2*key - 1;
    nc = 2*n - 1;
    deleteTable();
    createTable(2*n-1);
    document.getElementById("info").innerHTML = "Ciphertext is: "+ciphertext;
    for(i = 1,j = 0;j<n;i++,j++){
        if(i>1){
            document.getElementById(1 + '$' + i).style.color = '#ccc';
            document.getElementById(1 + '$' + i).innerHTML = '&#10137';
            i++;
        }
        document.getElementById(1 + '$' + i).style.color = '#000';
        document.getElementById(1 + '$' + i).innerHTML = ciphertext[j];
        await sleep(100);
    }
    await sleep(2000);
    document.getElementById("info").innerHTML ="Fill it row wise leaving one place down.";
    clearTable(2*n-1);
    c1 = 4*(key-1);
    c2 = 0;
    for(i = 1,j = 1,k = 0,f = 0;k<n;k++){
        if(k>0){
            c = 0;
            if(f==0){
                if(c1==0){
                    while(i<nc && c<c2){
                        c++;
                        i++;
                    }
                    if(c==c2)
                        f = 1;
                    else if(c<c2){
                        j += 2;
                        i = j;
                        c1 -= 4;
                        c2 += 4;
                        f = 0;
                    }
                }
                else{
                    while(i<nc && c<c1){
                        c++;
                        i++;
                    }
                    if(c==c1)
                        f = 1;
                    else if(c<c1){
                        j += 2;
                        i = j;
                        c1 -= 4;
                        c2 += 4;
                        f = 0;
                    }
                }
            }
            else if(f==1){
                if(c2==0){
                    while(i<nc && c<c1){
                        c++;
                        i++;
                    }
                    if(c==c1)
                        f = 0;
                    else if(c<c1){
                        j += 2;
                        i = j;
                        c1 -= 4;
                        c2 += 4;
                        f = 0;
                    }
                }
                else{
                    while(i<nc && c<c2){
                        c++;
                        i++;
                    }
                    if(c==c2)
                        f = 0;
                    else if(c<c2){
                        j += 2;
                        i = j;
                        c1 -= 4;
                        c2 += 4;
                        f = 0;
                    }
                }
            }
        }
        document.getElementById(j + '$' + i).style.color = '#000';
        document.getElementById(j + '$' + i).innerHTML = ciphertext[k];
        await sleep(200);
    }
    await sleep(1000);
    document.getElementById("info").innerHTML = "We traverse the matrix in zig-zag manner to obtain the original text.";
    for(i = 1,c = 1,f = 1;i<=2*n-1;i+=2){
        j = 1;
        while(j<=c){
            if(i>1 && j==c){
                if(f == 0){
                    document.getElementById((j-1) + '$' + (i-1)).style.color = '#ccc';
                    document.getElementById((j-1) + '$' + (i-1)).innerHTML = '&#10136';
                }
                else{
                    document.getElementById((j+1) + '$' + (i-1)).style.color = '#ccc';
                    document.getElementById((j+1) + '$' + (i-1)).innerHTML = '&#10138';
                }
            }
            await sleep(50);
            j++;
        }
        if(c <= nr - 2 && f == 0)
            c += 2;
        else if(c==nr && f == 0){
            c -= 2;
            f = 1;
        }
        else if(c>=3 && f == 1)
            c -= 2;
        else if(c==1 && f == 1){
            c += 2;
            f = 0;
        }
    }
    await sleep(2000);
    for(i = 1,c = 1,f = 1;i<=2*n-1;i+=2){
        j = c;
        if(f == 0 && i>1){
            document.getElementById((j-1) + '$' + (i-1)).innerHTML = '';
        }
        else if(f == 1 && i>1){
            document.getElementById((j+1) + '$' + (i-1)).innerHTML = '';
        }
        while(j>0){
            if(i>1 && j>1){
                document.getElementById((j-1) + '$' + i).innerHTML = document.getElementById(j + '$' + i).innerHTML;
                document.getElementById(j + '$' + i).innerHTML = '';
            }
            if(i>1 && j==1){
                document.getElementById(1 + '$' + (i-1)).innerHTML = '&#10137';
                
            }
            await sleep(100);
            j--;
        }
        if(c <= nr - 2 && f == 0)
            c += 2;
        else if(c==nr && f == 0){
            c -= 2;
            f = 1;
        }
        else if(c>=3 && f == 1)
            c -= 2;
        else if(c==1 && f == 1){
            c += 2;
            f = 0;
        }
    }

    var str = '';
    for(i = 1;i<=nc;i+=2){
        str += document.getElementById(1 +'$'+ i).innerHTML; 
    }
    document.getElementById("plaintext").value = str;
    document.getElementById("encryptBtn").disabled = false;
    document.getElementById("decryptBtn").disabled = false;
}

/*
function encrypt(){
    var plaintext = document.getElementById("plaintext").value;
    plaintext = plaintext.replace(/ /g,'');
    var n = plaintext.length;
    var s1 = "";
    var s2 = "";
    for(var i=0;i<n;i++){
        if(i%2==0)
            s1 += plaintext[i];
        else
            s2 += plaintext[i];
    }
    var ciphertext = s1 + s2;
    //printPlainText();
    document.getElementById("ciphertext").value = ciphertext;
}

function decrypt(){
    var ciphertext = document.getElementById("ciphertext").value;
    ciphertext = ciphertext.replace(/ /g,'');
    var n = ciphertext.length;
    var plaintext = "";
    var i,j;
    for(i=0,j=Math.ceil(n/2);j<n;i++,j++){
        plaintext += ciphertext[i];
        plaintext += ciphertext[j];
    }
    if(n%2)
        plaintext += ciphertext[i];
    //printCipherText();
    document.getElementById("plaintext").value = plaintext;
}
*/

function createTable(n){
    var table = document.getElementById("myTable");
    var key = document.getElementById("key").value;
    var row = [table.insertRow()];
    for (var i = 1; i < 2*key-1; i++)
        row[i] = table.insertRow();
    var cell;
    for (var i = 1; i <= n; i++) {
        for(var j = 1; j <= 2*key-1; j++){
            cell = row[j-1].insertCell();
            cell.setAttribute("id", j + '$' + i);
        }
    }
}

function deleteTable(){
    document.getElementById("myTable").innerHTML = '';
}

function clearTable(n){
    var key = document.getElementById("key").value;
    for(var i = 1;i <= n;i++)
        for(var j = 1; j <= 2*key-1; j++)
            document.getElementById(j + '$' + i).innerHTML = '';
}
