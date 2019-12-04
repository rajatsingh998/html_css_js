function add_element(){
    let name=document.getElementById("name");
    let unit=document.getElementById("unit");
    let amount=document.getElementById("amount");
    let tableid=document.getElementById("containers");
    
    if(name.value.length<1 || unit.value.length<1 || amount.value.length<1){
        alert("Enter All Input");
        return false;

    }
    if(unit.value<1 || amount.value<1){
        alert("Enter positive input");
        return false;
    }
    let rowcount=tableid.rows.length;
    var row= tableid.insertRow(rowcount); 
    
    var total_unit=parseFloat( document.getElementById("unit").value);
    var amount_of_one_unit=parseFloat(document.getElementById("amount").value);
    var total_amount=total_unit*amount_of_one_unit;
    var total_amount=total_amount.toString();
    
    
    row.insertCell(0).innerHTML=name.value;
    row.insertCell(1).innerHTML=unit.value;
    row.insertCell(2).innerHTML=amount.value;
    row.insertCell(3).innerHTML+=total_amount;
    row.insertCell(4).innerHTML='<input type="button" value = "Delete" onclick="deleteRow(this)">';
    row.insertCell(5).innerHTML='<input type="button" value = "Edit" onclick="editRow(this)">';
    document.getElementById("name").value="";
    document.getElementById("unit").value="";
    document.getElementById("amount").value="";
    grandTotal();
    row.style.backgroundColor="white";
    
}
function editRow(obj){
    var index = obj.parentNode.parentNode.rowIndex;
   
    var table = document.getElementById("containers");
    table.rows[index].cells[5].innerHTML='<input type="button" value = "Save" onclick="changeRow(this)">';
    table.rows[index].cells[0].contentEditable = true;
    table.rows[index].cells[1].contentEditable=true;
    table.rows[index].cells[2].contentEditable=true;
    table.rows[index].style.backgroundColor="red";
    
}
function changeRow(obj){
    
    var index = obj.parentNode.parentNode.rowIndex;
    
    var table = document.getElementById("containers");
    table.rows[index].cells[0].contentEditable = false;
    table.rows[index].cells[1].contentEditable=false;
    table.rows[index].cells[2].contentEditable=false;
    table.rows[index].style.backgroundColor="white";
    let total_unit=parseFloat( table.rows[index].cells[1].innerText);
    var amount_of_one_unit=parseFloat ( table.rows[index].cells[2].innerText);
     var total_amount=total_unit*amount_of_one_unit;
    var total_amount=total_amount.toString();

    table.rows[index].cells[3].innerHTML=total_amount;
    
    table.rows[index].cells[5].innerHTML='<input type="button" value = "Edit" onclick="editRow(this)">';
    
    grandTotal();
 
    
    
}

function deleteRow(obj) {
      
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("containers");
   let ok=parseInt(table.rows[index].cells[3].innerText);

    table.deleteRow(index);
    let tableid1=document.getElementById("grand_total");
    

    tableid1.rows[0].cells[1].innerText= tableid1.rows[0].cells[1].innerText-ok;
    
}

function grandTotal(){
    var sum=0;
   
    let tableid=document.getElementById("containers");
    let tableid1=document.getElementById("grand_total");
    if(tableid.rows.length==2){
        sum= parseFloat(tableid.rows[1].cells[3].innerHTML);
    }
    else{
    for(let i=1;i<tableid.rows.length;i++){
        sum = sum + parseFloat(tableid.rows[i].cells[3].innerHTML);
    }
}
    
    tableid1.rows[0].cells[1].innerHTML=sum;
}


