function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function encrypt(){
    document.getElementById("encryptBtn").disabled = true;
    document.getElementById("decryptBtn").disabled = true;
    var plaintext = document.getElementById("plaintext").value;
    document.getElementById("ciphertext").value = '';
    plaintext = plaintext.replace(/ /g,'');
    var n = plaintext.length;
    var i,j,k;
    deleteTable();
    createTable(2*n + 1);
    document.getElementById("info").innerHTML = "Plaintext is: "+plaintext;
    for(i = 1,j = 0;j<n;i++,j++){
        if(i>1){
            document.getElementById("p" + i).style.color = '#ccc';
            document.getElementById("p" + i).innerHTML = '&#10137';
            i++;
        }
        document.getElementById("p" + i).style.color = '#000';
        document.getElementById("p" + i).innerHTML = plaintext[j];
        await sleep(100);
    } 
    await sleep(500);
    document.getElementById("info").innerHTML = "Plaintext is written downwards and diagonally on successive rails of an imaginary fence.";
    for(i = 3,j = 1;j<=n/2;i+=4,j++){
        document.getElementById("q" + i).innerHTML = document.getElementById("p" + i).innerHTML;
        document.getElementById("p" + i).innerHTML = '';
        await sleep(100);
        document.getElementById("r" + i).innerHTML = document.getElementById("q" + i).innerHTML;
        document.getElementById("q" + i).innerHTML = '';
        k = i - 1;
        document.getElementById("q" + k).style.color = '#ccc';
        document.getElementById("q" + k).innerHTML = '&#10136';
        document.getElementById("p" + k).innerHTML = '';
        k = i + 1;
        document.getElementById("q" + k).style.color = '#ccc';
        document.getElementById("q" + k).innerHTML = '&#10138';
        document.getElementById("p" + k).innerHTML = '';
        await sleep(100);
    }
    await sleep(2000);
    document.getElementById("info").innerHTML = "Ciphertext is created reading the pattern row by row";
    for(i = 1;i <= 2*n;i++){
        document.getElementById("q" + i).innerHTML = '';
    } 
    for(i = 3,j = 1;j<n/2;i+=4,j++){
        document.getElementById("p" + i).style.color = '#ccc';
        document.getElementById("p" + i).innerHTML = '&#10137';
        await sleep(100);
    } 
    for(i = 1,j = 1;j<=n/2;i+=4,j++){
        document.getElementById("r" + i).style.color = '#ccc';
        document.getElementById("r" + i).innerHTML = '&#10137';
        await sleep(100);
    }
    await sleep(1000);
    for(i = 2,j = 1;j<=n/2;i++,j++){
        k = i + (2*j) - 1;
        document.getElementById("p" + i).style.color = '#ccc';
        document.getElementById("p" + i).innerHTML = document.getElementById("p" + k).innerHTML;
        document.getElementById("p" + k).innerHTML = '';
        await sleep(200);
        i++;
        k+=2;
        document.getElementById("p" + i).style.color = '#000';
        document.getElementById("p" + i).innerHTML = document.getElementById("p" + k).innerHTML;
        document.getElementById("p" + k).innerHTML = '';
        await sleep(200);
    }
    if(n%2==0)
        i-=2;
    for(j = 1;j<=n/2;i++,j++){
        k = i + (2*j) - 1 - n - n%2;
        document.getElementById("p" + i).style.color = '#ccc';
        document.getElementById("p" + i).innerHTML = document.getElementById("r" + k).innerHTML;
        document.getElementById("r" + k).innerHTML = '';
        await sleep(200);
        i++;
        k+=2;
        document.getElementById("p" + i).style.color = '#000';
        document.getElementById("p" + i).innerHTML = document.getElementById("r" + k).innerHTML;
        document.getElementById("r" + k).innerHTML = '';
        await sleep(200);
    }

    var str = '';
    for(i = 1,j = 1;j<=n;j++,i+=2){
        str += document.getElementById("p" + i).innerHTML;
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
    ciphertext = ciphertext.replace(/ /g,'');
    var n = ciphertext.length;
    var i,j,k;
    deleteTable();
    createTable(2*n + 1);
    document.getElementById("info").innerHTML = "Ciphertext is: "+ciphertext;
    for(i = 1,j = 0;j<n;i++,j++){
        if(i>1){
            document.getElementById("p" + i).style.color = '#ccc';
            document.getElementById("p" + i).innerHTML = '&#10137';
            i++;
        }
        document.getElementById("p" + i).style.color = '#000';
        document.getElementById("p" + i).innerHTML = ciphertext[j];
        await sleep(100);
    }
    await sleep(2000);
    document.getElementById("info").innerHTML ="Fill it row wise leaving one place down.";
    clearTable(2*n + 1);
    for(i = 1,j = 0;j<n/2;i+=2,j++){
        if(i>1){
            document.getElementById("p" + i).style.color = '#ccc';
            document.getElementById("p" + i).innerHTML = '&#10137';
            i += 2;
        }
        document.getElementById("p" + i).style.color = '#000';
        document.getElementById("p" + i).innerHTML = ciphertext[j];
        await sleep(100);
    }
    for(i = 1,j = Math.ceil(n/2);j<n;i+=2,j++){
        document.getElementById("r" + i).style.color = '#ccc';
        document.getElementById("r" + i).innerHTML = '&#10137';
        i += 2;
        document.getElementById("r" + i).style.color = '#000';
        document.getElementById("r" + i).innerHTML = ciphertext[j];
        await sleep(100);
    }
    await sleep(2000);
    document.getElementById("info").innerHTML = "We traverse the matrix in zig-zag manner to obtain the original text.";
    for(i = 2,j = 1;j<n;i+=2,j++){
        if(j%2==1){
            document.getElementById("q" + i).style.color = '#ccc';
            document.getElementById("q" + i).innerHTML = '&#10136';
            k = i - 1;
            document.getElementById("r" + k).innerHTML = '';
            k = i + 1;
            document.getElementById("p" + k).innerHTML = '';
        }
        else{
            document.getElementById("q" + i).style.color = '#ccc';
            document.getElementById("q" + i).innerHTML = '&#10138';
        }
        await sleep(100);
    }
    await sleep(2000);
    for(i = 3,j = 1;j<=n/2;i+=4,j++){
        k = i - 1;
        document.getElementById("q" + k).innerHTML = '';
        k = i + 1;
        document.getElementById("q" + k).innerHTML = '';
        document.getElementById("q" + i).style.color = '#000';
        document.getElementById("q" + i).innerHTML = document.getElementById("r" + i).innerHTML;
        document.getElementById("r" + i).innerHTML = '';
        await sleep(100);
        k = i - 1;
        document.getElementById("p" + k).style.color = '#ccc';
        document.getElementById("p" + k).innerHTML = '&#10137';
        k = i + 1;
        document.getElementById("p" + k).style.color = '#ccc';
        document.getElementById("p" + k).innerHTML = '&#10137';
        document.getElementById("p" + i).style.color = '#000';
        document.getElementById("p" + i).innerHTML = document.getElementById("q" + i).innerHTML;
        document.getElementById("q" + i).innerHTML = '';
        await sleep(100);
    }

    var str = '';
    for(i = 1,j = 1;j<=n;j++,i+=2){
        str += document.getElementById("p" + i).innerHTML; 
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
    var row1 = table.insertRow();
    var row2 = table.insertRow();
    var row3 = table.insertRow();
    var cell;
    for (var i = 1; i <= n; i++) {
        cell = row1.insertCell();
        cell.setAttribute("id", "p"+ i);
        cell = row2.insertCell();
        cell.setAttribute("id", "q"+ i);
        cell = row3.insertCell();
        cell.setAttribute("id", "r"+ i);
    }
}

function deleteTable(){
    document.getElementById("myTable").deleteRow(-1);
    document.getElementById("myTable").deleteRow(-1);
    document.getElementById("myTable").deleteRow(-1);
}

function clearTable(n){
    for(var i = 1;i <= n;i++){
        document.getElementById("p" + i).innerHTML = '';
        document.getElementById("q" + i).innerHTML = '';
        document.getElementById("r" + i).innerHTML = '';
    }
}