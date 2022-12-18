

import PocketBase from "pocketbase";

export async function createTransaction(data:any) {

      const client = new PocketBase("http://127.0.0.1:8090");
      const adminAuthData = await client.admins.authViaEmail(
        "holtonpk@gmail.com",
        "Dcsd142662"
      );
    
      const record = await client.records.create('transactions', data);

  client.authStore.clear();

return record     
    }

  
let statuss = ['hold', 'complete', 'rejected', 'pending']


const CreatePos = (item:number, date:Date)=>{
  let pos = [{ date:date,
    description:"Direct Deposit",
    amount:Math.floor(Math.random() * (2500 - 100 + 1) + 100),
    to_from:["@PayPal","@Bob_123","@User_5326","@mike_money12","@123steve","@ms_molly12","@silly_sally62","@store_123"][Math.floor((Math.random() * 8))],
    status:statuss[Math.floor((Math.random() * 4))],
    transactionType:"Income"
  },
  { date:date,
    description:"E-Transfer",
    amount:Math.floor(Math.random() * (2500 - 100 + 1) + 100),
    to_from:["@PayPal","@Bob_123","@User_5326","@mike_money12","@123steve","@ms_molly12","@silly_sally62","@store_123"][Math.floor((Math.random() * 8))],
    status:statuss[Math.floor((Math.random() * 4))],
    transactionType:["Income","Savings"]
  },
  { date:date,
    description:"Gift",
    amount:Math.floor(Math.random() * (2500 - 100 + 1) + 100),
    to_from:["@PayPal","@Bob_123","@User_5326","@mike_money12","@123steve","@ms_molly12","@silly_sally62","@store_123"][Math.floor((Math.random() * 8))],
    status:statuss[Math.floor((Math.random() * 4))],
    transactionType:["Income","Savings"]
  },
  { date:date,
    description:"Paycheck",
    amount:Math.floor(Math.random() * (2500 - 100 + 1) + 100),
    to_from:["@PayPal","@Denver_Broncos","Colorado_Rockies","US_Gov"][Math.floor((Math.random() * 4))],
    status:'complete',
    transactionType:"Income"
  },
  
]

return pos[item]

}


const CreateNeg = (item:number, date:Date)=>{
  let neg = [{
    date:date,
    description:"Online purchase",
    amount:-Math.floor(Math.random() * (1000 - 100 + 1) + 100),
    to_from:["@amazon", "@ebay","@wayfair","@walmart"][Math.floor((Math.random() * 4))],
    status:statuss[Math.floor((Math.random() * 4))],
    transactionType:"Outcome"
  },
  { date:date,
    description:"Rent",
    amount:-Math.floor(Math.random() * (2500 - 1600 + 1) + 1600),
    to_from:"@rent",
    status:"complete",
    transactionType:"Outcome"
  },
  { date:date,
    description:"Gas Bill",
    amount:-Math.floor(Math.random() * (200 - 100 + 1) + 100),
    to_from:["@shell", "@sinclair","@conoco"][Math.floor((Math.random() * 3))],
    status:'complete',
    transactionType:"Outcome"
  },
  { date:date,
    description:"Groceries",
    amount:-Math.floor(Math.random() * (1000 - 100 + 1) + 100),
    to_from:["@amazon", "@walmart","@safeway","@kingsoopers"][Math.floor((Math.random() * 4))],
    status:"complete",
    transactionType:"Outcome"
  },
]

return neg[item]

}

export async function createfakeData(){

  let yearsBack = 1
let transPerMonth = 40

let dateToday = new Date()

for(let i= 0; i<yearsBack; i++){
  console.log('-----------Year',2022-i,"-------------")

  dateToday.setFullYear(dateToday.getFullYear() - i);
 for(let j= 1; j<13; j++){
  dateToday.setMonth(j);
  console.log('Months',j)
  for(let l= 0; l<transPerMonth; l++){
    let randomNumber =Math.floor(Math.random() * (28 - 1 + 1)) + 1
    dateToday.setDate(randomNumber);
    let randomVal = Math.floor((Math.random() * 4))
    if(l%2 == 0){
      await createTransaction(CreateNeg(randomVal, dateToday))
    }else{
     await createTransaction(CreatePos(randomVal, dateToday))
    }
  }
  }
  dateToday = new Date()
}
console.log("Created Fake Data")
}


export async function backEndTest(){


 



}
