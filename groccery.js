const NAME_COL=0;
const UNIT_COL=1;
const AMOUNT_COL=2;
const TOTAL_AMOUNT_COL=3;
const DELETE_BTN=4;
const EDIT_BTN=5;


function add_element(){
    let name=document.getElementById("name");
    let unit=document.getElementById("unit");
    let amount=document.getElementById("amount");
    let tableid=document.getElementById("containers");
    
    if(name.value.length<1 || unit.value.length<1 || amount.value.length<1){
        document.getElementById("error-message").innerHTML="Enter All Input";
        return false;

    }
    if(unit.value<1 || amount.value<1){
        document.getElementById("error-message").innerHTML="Enter positive input";
        return false;
    }

    document.getElementById("error-message").innerHTML=null;
    let rowcount=tableid.rows.length;
    var row= tableid.insertRow(rowcount); 
    
    var total_unit=parseFloat( document.getElementById("unit").value);
    var amount_of_one_unit=parseFloat(document.getElementById("amount").value);
    var total_amount=(total_unit*amount_of_one_unit).toFixed(2);
    var total_amount=total_amount.toString();
    
    
    row.insertCell(NAME_COL).innerHTML=name.value;
    row.insertCell(UNIT_COL).innerHTML=unit.value;
    row.insertCell(AMOUNT_COL).innerHTML=amount.value;
    row.insertCell(TOTAL_AMOUNT_COL).innerHTML+=total_amount;
    row.insertCell(DELETE_BTN).innerHTML='<input type="button" value = "Delete" onclick="deleteRow(this)">';
    row.insertCell(EDIT_BTN).innerHTML='<input type="button" value = "Edit" onclick="editRow(this)">';
    document.getElementById("name").value="";
    document.getElementById("unit").value="";
    document.getElementById("amount").value="";
    grandTotal();
    row.style.backgroundColor="white";
    
}
function editRow(obj){
    var index = obj.parentNode.parentNode.rowIndex;
   
    var table = document.getElementById("containers");
    table.rows[index].cells[EDIT_BTN].innerHTML='<input type="button" value = "Save" onclick="changeRow(this)">';
    table.rows[index].cells[NAME_COL].contentEditable = true;
    table.rows[index].cells[UNIT_COL].contentEditable=true;
    table.rows[index].cells[AMOUNT_COL].contentEditable=true;
    table.rows[index].style.backgroundColor="red";
    
}
function changeRow(obj){
    
    var index = obj.parentNode.parentNode.rowIndex;
    
    var table = document.getElementById("containers");
    
    if(table.rows[index].cells[ NAME_COL].innerText.length<1 || table.rows[index].cells[UNIT_COL].innerText.length<1 || table.rows[index].cells[AMOUNT_COL].innerText.length<1){
        document.getElementById("error-message").innerHTML="Enter All Input";
       return false;
        
    }
    if( table.rows[index].cells[UNIT_COL].innerText<1 || table.rows[index].cells[AMOUNT_COL].innerText<1){
        document.getElementById("error-message").innerHTML="Enter positive input";
        return false;
    }
    if(isNaN(table.rows[index].cells[UNIT_COL].innerText)|| isNaN(table.rows[index].cells[AMOUNT_COL].innerText)){
        document.getElementById("error-message").innerHTML="Enter number only";
        return false;
    }
    document.getElementById("error-message").innerHTML=null;
    table.rows[index].cells[ NAME_COL].contentEditable = false;
    table.rows[index].cells[UNIT_COL].contentEditable=false;
    table.rows[index].cells[AMOUNT_COL].contentEditable=false;
    table.rows[index].style.backgroundColor="white";
    let total_unit=parseFloat( table.rows[index].cells[1].innerText);
    var amount_of_one_unit=parseFloat ( table.rows[index].cells[AMOUNT_COL].innerText);
     var total_amount=(total_unit*amount_of_one_unit).toFixed(2);
    var total_amount=total_amount.toString();

    table.rows[index].cells[TOTAL_AMOUNT_COL].innerHTML=total_amount;
    
    table.rows[index].cells[EDIT_BTN].innerHTML='<input type="button" value = "Edit" onclick="editRow(this)">';
    
    grandTotal();
 
    
    
}

function deleteRow(obj) {
      
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("containers");
   
   let temp=parseInt(table.rows[index].cells[TOTAL_AMOUNT_COL].innerText);

    table.deleteRow(index);
    let tableid1=document.getElementById("grand_total");
   

    tableid1.rows[0].cells[1].innerText= tableid1.rows[0].cells[1].innerText-temp;
    
}

function grandTotal(){
    var sum=0;
   
    let tableid=document.getElementById("containers");
    let tableid1=document.getElementById("grand_total");
    if(tableid.rows.length==2){
        sum= parseFloat(tableid.rows[1].cells[TOTAL_AMOUNT_COL].innerHTML);
    }
    else{
    for(let i=1;i<tableid.rows.length;i++){
        sum = sum + parseFloat(tableid.rows[i].cells[TOTAL_AMOUNT_COL].innerHTML);
    }
}
    sum.toFixed(2);
    tableid1.rows[0].cells[1].innerHTML=sum;
}


