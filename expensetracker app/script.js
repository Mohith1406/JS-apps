document.addEventListener('DOMContentLoaded',()=>{
    const expenseform= document.getElementById('expense-form');
    const expensename= document.getElementById('expense-name');
    const expenseamount= document.getElementById('expense-amount');
    
    const el = document.getElementById('expense-list');
    const total= document.getElementById('total');
     let expense =JSON.parse(localStorage.getItem('expenses'))||[];
     renderexp();
     expenseform.addEventListener('submit',(e)=>{
         e.preventDefault();
         let name = expensename.value.trim();
         let amount = parseFloat(expenseamount.value.trim());
         if(name!=""&&!isNaN(amount)&&amount>0)
         {
            let data={id:Date.now(),name,amount};
            expense.push(data);
            renderexp();
            expensename.value='';
            expenseamount.value='';
            
         }
     })
     el.addEventListener('click',(e)=>{
        if(e.target.tagName=="BUTTON")
        {
              let gi=parseInt(e.target.getAttribute('data-id'));
              for(let i=0;i<expense.length;i++)
              {
                   if(expense[i].id==gi)
                   {
                     expense.splice(i,1);
                     break;
                   }
              }
              renderexp()

        }
     })
     function renderexp()
     {    
        to=0;
        el.innerHTML=" ";
        expense.forEach((exp)=>{
            const expdiv =document.createElement('li');
            expdiv.innerHTML=`<span>${exp.name} - ${exp.amount}</span>
                              <button data-id="${exp.id}">remove</button>`;
              to+=exp.amount;
            el.appendChild(expdiv);
        })
        total.innerHTML=`<h3>Total: $${to}</h3>`;
        saveexpense();
     }
     function saveexpense() {

      localStorage.setItem('expenses',JSON.stringify(expense));
     }
})